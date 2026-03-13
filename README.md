# Earnings Pipeline

Enterprise Earnings Call Script Generator.

## What It Does

Transform quarterly financials (10-Q, 10-K, earnings transcripts) into board-ready earnings call scripts in minutes.

## Features

- **Intake Engine** - Upload PDF documents (10-Q, 10-K, transcripts)
- **Strategy Brief** - AI-generated narrative + competitive intel
- **Script Generator** - Speaker-attributed scripts (CEO, CFO, COO)
- **Export** - PDF with audit trail

## Pricing

| Tier | Price | Target |
|------|-------|--------|
| Basic | $297/mo | Small public companies |
| Pro | $497/mo | Mid-cap companies |
| Enterprise | $997/mo | Large caps / IR firms |

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
- PDF processing

## Cost

- Hosting: Free (Vercel)
- AI: ~$0.02 per earnings call script
- Your $10 OpenRouter credit = ~500 earnings calls

## Target Market

- Public companies (IR teams)
- Financial advisors
- Investor relations firms
- C-suite executives