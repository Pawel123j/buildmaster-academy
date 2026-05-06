# BuildMaster Academy

BuildMaster Academy is a polished educational web app that teaches beginners how to build a desktop PC step by step. It combines a practical build guide, compatibility warnings, budget PC presets in PLN, saved checklist progress, and a short quiz about PC parts.

The project is built as a GitHub-ready portfolio application: no paid APIs, no backend requirement, typed local mock data, reusable React components, and a responsive dark UI.

## Features

- Modern dark purple/black interface with a dashboard-like feel
- Landing page that explains the product and highlights the learning modules
- Step-by-step PC building guide covering:
  - Choosing parts
  - Preparing tools
  - Installing CPU
  - Installing RAM
  - Installing SSD
  - Mounting motherboard
  - Installing GPU
  - Connecting PSU cables
  - First boot
  - BIOS setup
  - Installing Windows/Linux
- Checklist system that saves completed build steps in `localStorage`
- Interactive compatibility checker for CPU socket, motherboard, and RAM type
- Budget PC builder with 2500 PLN, 4000 PLN, and 7000 PLN presets
- Multiple-choice quiz with scoring and explanations
- Project page with problem statement, technologies, learnings, and README-ready notes
- Local JSON mock data for guide content, budgets, compatibility, and quiz questions

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React icons
- Local JSON mock data
- Browser `localStorage`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL printed by Next.js, usually:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
  project/
    page.tsx
src/
  components/
    AppHeader.tsx
    BudgetBuilder.tsx
    BuildGuide.tsx
    CompatibilityChecker.tsx
    FeatureGrid.tsx
    Footer.tsx
    HeroWorkbench.tsx
    HomeExperience.tsx
    ProjectTeaser.tsx
    Quiz.tsx
    SectionHeader.tsx
  data/
    budgetBuilds.json
    compatibility.json
    guideSteps.json
    quizQuestions.json
  lib/
    utils.ts
  types/
    buildmaster.ts
```

## Mock Data

All content is stored locally:

- `src/data/guideSteps.json` stores the ordered PC build lessons
- `src/data/compatibility.json` stores CPU sockets, RAM types, and motherboard examples
- `src/data/budgetBuilds.json` stores suggested part lists for each PLN budget
- `src/data/quizQuestions.json` stores multiple-choice quiz questions

## What I Learned

- How to structure an educational flow around a real-world technical task
- How to model compatibility rules in simple local data
- How to persist checklist progress with browser storage
- How to build responsive interactive sections with reusable React components
- How to present a full-stack-style portfolio project without relying on paid APIs

## Future Improvements

- Add searchable part catalogs and deeper compatibility rules
- Add printable/exportable build checklists
- Add user-created build plans with editable part lists
- Add accessibility preference controls for motion and contrast
- Add more quizzes and spaced repetition
- Add deployment screenshots and a live demo link after hosting
