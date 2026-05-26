# AI Resume Analyzer

Paste your resume and a job description — Gemini scores your match, flags missing keywords, and rewrites weak bullets into measurable, action-driven language.

**Live demo:** https://ai-resume-analyzer-seven-umber.vercel.app

<p align="center">
  <img src="https://github.com/user-attachments/assets/243d01bc-e2fe-43e6-b97c-4cdaef059a69" width="48%" />
  <img src="https://github.com/user-attachments/assets/8f1481cb-f968-4704-ae0d-d5069b9bbb97" width="48%" />
  <img width="48%" src="https://github.com/user-attachments/assets/33299043-c4ed-49de-b789-c101dc358e4c" />
  
## Features

- **Match score (0–100)** — overall fit between resume and job description
- **Strong matches** — skills you already have that the job description asks for
- **Missing keywords** — gaps to address before applying
- **Improvement notes** — actionable, role-specific suggestions
- **Rewritten bullets** — before/after rewrites of weak resume lines, kept honest (no invented metrics)

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- CSS Modules
- [Google Gemini](https://ai.google.dev/) via `@google/genai` (model: `gemini-2.5-flash`)
- Deployed on [Vercel](https://vercel.com/)

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/RahulRex0/AI-resume-analyzer.git
cd AI-resume-analyzer
npm install
```

### 2. Set up your environment

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | yes | Google AI Studio API key |

## How it works

1. User pastes a resume + job description and clicks **Analyze Resume**.
2. The client POSTs both inputs to `/api/analyze`.
3. The server sends a structured prompt to Gemini, asking for strict JSON output.
4. The response is parsed and returned to the client, which renders themed result cards.

## Project structure

```
src/
  app/
    page.tsx              Main client UI (form + results)
    page.module.css       Styles
    api/
      analyze/
        route.ts          Gemini integration & JSON parsing
```

## Deployment

This project is deployed on Vercel. To deploy your own copy:

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add `GEMINI_API_KEY` under **Settings → Environment Variables** (for Production, Preview, and Development).
4. Redeploy from the **Deployments** tab.

## Roadmap

- [ ] Upload a PDF resume instead of pasting text
- [ ] Save past analyses to a database
- [ ] Compare a resume against multiple job descriptions at once
- [ ] One-click copy for rewritten bullets
- [ ] Export full analysis as PDF

## License

MIT
