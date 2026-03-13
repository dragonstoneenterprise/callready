import { NextRequest, NextResponse } from "next/server";

// In-memory audit log (use database in production)
const auditLog: Array<{
  timestamp: string;
  action: string;
  ip?: string;
  userAgent?: string;
  status: string;
}> = [];

function logAudit(action: string, req: NextRequest, status: string) {
  const entry = {
    timestamp: new Date().toISOString(),
    action,
    ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
    status,
  };
  auditLog.push(entry);
  // Keep only last 1000 entries
  if (auditLog.length > 1000) auditLog.shift();
}

function anonymizeData(text: string): string {
  // Remove potential PII before sending to AI
  return text
    // Remove email addresses
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]")
    // Remove phone numbers
    .replace(/(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, "[PHONE_REDACTED]")
    // Remove names (simple pattern - not perfect but helps)
    .replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, "[NAME_REDACTED]")
    // Remove SSN-like patterns
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_REDACTED]");
}

export async function POST(request: NextRequest) {
  try {
    // Security: Rate limiting could be added here
    // Security: Input validation
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      logAudit("invalid_content_type", request, "blocked");
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    const { transcript, metrics } = await request.json();

    if (!transcript || typeof transcript !== "string" || transcript.length < 50) {
      logAudit("invalid_transcript", request, "blocked");
      return NextResponse.json({ error: "Transcript too short or invalid" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      logAudit("missing_api_key", request, "error");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Security: Anonymize data before sending to external API
    const anonymizedTranscript = anonymizeData(transcript);

    const prompt = `You are an expert earnings call script writer for public companies. Generate a professional earnings call script based on the following financial data and transcript.

FINANCIAL DATA:
${metrics ? JSON.stringify(metrics, null, 2) : "Use data from transcript"}

TRANSCRIPT/NOTES:
${anonymizedTranscript.substring(0, 10000)}

OUTPUT FORMAT (JSON only, valid JSON):
{
  "scripts": [
    {
      "speaker": "CEO",
      "title": "Opening Remarks",
      "content": "Professional opening statement (150-250 words) that frames the quarter's narrative, highlights key achievements, and sets up the financial overview. Should be authoritative, confident, and forward-looking."
    },
    {
      "speaker": "CFO", 
      "title": "Financial Overview",
      "content": "Detailed financial breakdown (200-350 words) covering revenue, margin, EPS, cash flow, and guidance. Use specific numbers from the data. Professional and precise."
    },
    {
      "speaker": "CEO",
      "title": "Closing Remarks",
      "content": "Brief closing statement (80-150 words) that reinforces confidence, thanks the team, and transitions to Q&A."
    }
  ],
  "metrics": {
    "revenue": "Extracted revenue figure",
    "margin": "Extracted margin figure", 
    "eps": "Extracted EPS",
    "guidance": "Extracted guidance if mentioned"
  }
}

Requirements:
- CEO voice: Confident, strategic, narrative-driven
- CFO voice: Precise, data-focused, professional
- Use actual numbers from the data provided
- Maintain consistent narrative throughout
- No markdown, just valid JSON`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://earnings-pipeline.app",
        "X-Title": "Earnings Pipeline",
      },
      body: JSON.stringify({
        model: "minimax/minimax-m2.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      logAudit("ai_generation_failed", request, "error");
      return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      logAudit("empty_ai_response", request, "error");
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    // Parse JSON from response
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = JSON.parse(content);
      }
    } catch (parseError) {
      console.error("JSON parse error:", content);
      logAudit("json_parse_failed", request, "error");
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    logAudit("script_generated", request, "success");
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate error:", error);
    logAudit("internal_error", request, "error");
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// GET endpoint for audit log (admin only in production)
export async function GET(request: NextRequest) {
  // Security: Add authentication in production
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  return NextResponse.json({
    auditLog: auditLog.slice(-100), // Return last 100 entries
    entryCount: auditLog.length
  });
}