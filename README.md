# CallReady

Enterprise Earnings Call Script Generator with Multi-User Approval.

## What It Does

Transform quarterly financials (10-Q, 10-K, earnings transcripts) into board-ready earnings call scripts in minutes. Features multi-user approval workflow for CEO, CFO, and Legal review.

## Features

- **Intake Engine** - Upload PDF documents (10-Q, 10-K, transcripts)
- **Strategy Brief** - AI-generated narrative + competitive intel
- **Script Generator** - Speaker-attributed scripts (CEO, CFO, COO)
- **Multi-User Approval** - CEO, CFO, Legal review workflow
- **Audit Trail** - Full compliance tracking
- **Export** - Professional PDF with all approvals

## Pricing

| Tier | Price | Target |
|------|-------|--------|
| Pre-IPO | $49/mo | Companies preparing to go public |
| Small Public | $99-297/mo | Public companies with <$1B market cap |
| Pro | $297-497/mo | Mid-cap companies |
| Enterprise | $497-997/mo | Large caps / IR firms |

## Setup

```bash
npm install
echo "OPENROUTER_API_KEY=your_key" > .env.local
npm run dev
```

## Deploy to Vercel

```bash
npx vercel
```

## Tech Stack

- Next.js 14
- Tailwind CSS
- OpenRouter API (MiniMax)
- Security: Audit logging, data anonymization, SOC2 ready

## Cost

- Hosting: Free (Vercel)
- AI: ~$0.02 per earnings call script
- Your $10 OpenRouter credit = ~500 earnings calls

## Target Market

- Pre-IPO companies (learning to do earnings calls)
- Small public companies (no dedicated IR team)
- Investor relations firms
- C-suite executives

## Security & Compliance

- SOC2 Ready
- SEC/Reg FD Compliant
- Full Audit Trail
- Data Never Used for AI Training
- Enterprise Encryption
- No Data Retention