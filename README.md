# CISC 1115 Learning Platform

Study site for Brooklyn College CISC 1115 students: past exam PDFs, extracted exam questions, worked solutions, and topic notes.

Live at https://cisc-1115.vercel.app/

## Develop

```bash
npm install
npm run dev      # local dev server
npm run check    # lint + tests + production build; run before committing
```

Other scripts: `npm run lint`, `npm run test`, `npm run typecheck`, `npm run build`, `npm run preview`.

## How it is built

React 19, React Router 7, TypeScript, and Vite, deployed as a static site on Vercel. There is no backend: all content is TypeScript data in `src/data`, and "finished question" progress is kept in the browser's `localStorage`.

[ARCHITECTURE.md](ARCHITECTURE.md) explains how the code is organized and how to add exams, questions, and notes.
