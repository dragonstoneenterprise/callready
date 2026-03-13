import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { transcript, metrics } = await request.json();

    if (!transcript || transcript.length < 50) {
      return NextResponse.json({ error: "Transcript too short" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 500 });
    }

    const prompt = `You are an expert earnings call script writer for public companies. Generate a professional earnings call script based on the following financial data and transcript.

FINANCIAL DATA:
${metrics ? JSON.stringify(metrics, null, 2) : "Use data from transcript"}

TRANSCRIPT/NOTES:
${transcript.substring(0, 10000)}

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
      return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
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
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}