# CISC 1115 Learning Platform Architecture

## Purpose

This project is a static learning platform for Brooklyn College CISC 1115 students. It collects prior exams, extracted exam questions, worked solutions, and topic notes into a navigable study resource.

The app is intentionally frontend-first. There is no server, database, user account system, or API layer. Most content lives as typed TypeScript data, and user-specific progress is stored in the browser with `localStorage`.

The production site is intended for static hosting on Vercel.

## Product Surface

The app supports six main user workflows:

1. Open original exam PDFs.
2. Browse questions by semester.
3. Browse solutions by semester.
4. Search across semesters/questions/topics.
5. Read notes by topic.
6. Mark questions as finished locally in the browser.

The primary audience is students reviewing CISC 1115 material. The UI favors simple navigation, searchable content, readable code/math rendering, and a lightweight finished/unfinished progress model.

## Technology Stack

- **React 19** for UI components.
- **React Router 7** for client-side routing.
- **TypeScript** for typed content and app logic.
- **Vite** for local dev and production builds.
- **KaTeX** for LaTeX math rendering.
- **Tailwind CSS 4** is imported, but most UI styling is currently custom CSS.
- **Vercel** for static deployment.

Important package scripts:

```bash
npm run dev      # start Vite dev server
npm run build    # TypeScript build + Vite production build
npm run lint     # ESLint
npm run preview  # preview production build
```

## High-Level Architecture

The app is organized around a few clear layers:

```text
Browser
  |
  v
React Router
  |
  v
Page components
  |
  +-- Shared layout components
  +-- Exam/question components
  +-- Notes components
  +-- UI primitives
  |
  v
Typed local data modules
  |
  +-- Exam question data
  +-- Notes data
  +-- Exam PDF metadata
```

There is no network data fetching. The app bundles its content at build time.

User progress is the only persisted user state:

```text
Question finished toggle
  |
  v
useFinishedQuestions()
  |
  v
localStorage["cisc-1115-finished-questions"]
```

## Runtime Entry Points

### `index.html`

The Vite HTML entry point. It provides the root DOM element and includes site metadata.

### `src/main.tsx`

Mounts the React app:

- imports global CSS
- imports KaTeX CSS
- creates the React root
- renders the `RouterProvider`

### `src/app/App.tsx`

Defines the persistent app shell:

- `ScrollToTop`
- `Navbar`
- routed page content through `<Outlet />`
- `Footer`

### `src/app/router.tsx`

Defines all client-side routes.

Current route map:

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | `Home` | Landing/navigation hub |
| `/exams` | `Exams` | Original PDF exam list |
| `/questions` | `Questions` | Semester index for question browsing |
| `/questions/:examId` | `SemesterQuestions` | Question list for one semester |
| `/questions/:examId/:questionId` | `QuestionDetail` | Individual prompt page |
| `/solutions` | `Solutions` | Semester index for solution browsing |
| `/solutions/:examId` | `SemesterSolutions` | Solution list for one semester |
| `/solutions/:examId/:questionId` | `SolutionDetail` | Prompt + solution + explanation |
| `/notes` | `Notes` | Topic index for notes |
| `/notes/:topicId` | `NotesTopic` | Note list for one topic |
| `/notes/:topicId/:entryId` | `NotesDetail` | Individual note page |
| `/contact` | `Contact` | Contact/contribution info |
| `*` | `PageNotFound` | 404 fallback |

## Data Model

Shared types live in `src/types/index.ts`.

### Exams

```ts
export interface Question {
  id: string;
  title: string;
  topics: string[];
  prompt: string;
  mathLatex?: string;
  explanation: string;
  solution: string;
  solutionType?: "java" | "text";
}

export interface Exam {
  id: string;
  label: string;
  year: string;
  questions: Question[];
}
```

Exam data is content-as-code. Each semester has a module in:

```text
src/data/exams/
```

The aggregate exam list is exported from:

```text
src/data/exams/index.ts
```

To add a new exam semester:

1. Create `src/data/exams/<term-year>.ts`.
2. Export an `Exam`.
3. Import it in `src/data/exams/index.ts`.
4. Add it to the `exams` array in chronological/display order.

### Exam PDFs

Original PDFs are static assets in:

```text
public/exams/
```

The PDF list used by `/exams` lives in:

```text
src/data/examPdfs.ts
```

This is separate from the extracted question data because some PDFs may exist even if extracted questions have not yet been added.

### Notes

```ts
export type NoteSection = {
  type: "text" | "code";
  label: string;
  content: string;
};

export type NoteEntry = {
  id: string;
  title: string;
  tags: string[];
  sections: NoteSection[];
};

export type NoteTopic = {
  id: string;
  label: string;
  entries: NoteEntry[];
};
```

Note topic modules live in:

```text
src/data/notes/
```

The aggregate notes list is exported from:

```text
src/data/notes/index.ts
```

## Search Architecture

Search is entirely client-side and synchronous.

### Exam Search

`src/hooks/useExamSearch.ts` searches:

- semester label
- semester year
- semester id
- question title
- question topics
- prompt text

It returns discriminated results:

- `semester`
- `question`

Question prompt text is normalized using helpers from `src/utils/search.ts`.

### Notes Search

`src/hooks/useNotesSearch.ts` searches:

- topic label
- topic id
- note title
- note tags
- note section content

It returns:

- `topic`
- `entry`

### Search Utilities

`src/utils/search.ts` contains reusable search helpers:

- `normalizeQuery`
- `hasQuery`
- `pluralize`
- `resultCountLabel`
- `stripInlineMarkup`
- `searchablePrompt`
- `snippetAround`
- `defaultPreview`

This file is the shared place for text normalization and snippet behavior.

## Finished Question Progress

Question completion is local browser state. It is not synced across users/devices.

Core file:

```text
src/hooks/useFinishedQuestions.ts
```

Storage key:

```text
cisc-1115-finished-questions
```

The hook exposes:

- `finishedKeys`
- `toggleFinished(examId, questionId)`
- `isFinished(examId, questionId)`

It also reads the legacy key:

```text
cisc-1115-visited-questions
```

This preserves marks created while the feature was still called “visited.”

Important behavior:

- Opening a question does **not** mark it finished.
- The user must explicitly press `Mark as finished`.
- A finished question shows a checkmark next to the question title.
- A semester shows a checkmark only when every question in that semester is finished.
- `All / Unfinished / Finished` filters work with or without a search term.

The progress feature is safe for Vercel because it is browser-only.

Limitations:

- Progress is per browser profile.
- Progress does not sync across devices.
- Progress can be cleared by browser site-data cleanup.
- Private/incognito mode may not persist it.

## Prompt and Content Rendering

Exam prompts and note sections can contain simple embedded block delimiters.

Parser:

```text
src/utils/parsePrompt.ts
```

Supported prompt blocks:

```text
[[code]]
...
[[/code]]
```

```text
[[text]]
...
[[/text]]
```

Rendering component:

```text
src/components/ui/ContentBlock.tsx
```

`PromptBody` parses prompt text into:

- prose
- highlighted Java blocks
- plain text blocks

Inline prose markers supported:

- `**bold**`
- `*italic*`
- `__underline__`

## Code Highlighting

Java highlighting is local and lightweight.

File:

```text
src/utils/highlightJava.tsx
```

It tokenizes lines and wraps:

- keywords
- comments
- strings
- numbers
- punctuation

This is intentionally simple. It is not a full parser.

## Math Rendering

Math is rendered through KaTeX.

File:

```text
src/components/ui/MathDisplay.tsx
```

`Question.mathLatex` is rendered through:

```tsx
<QuestionMath latex={question.mathLatex} />
```

KaTeX CSS is imported once in:

```text
src/main.tsx
```

## Component Architecture

### Layout Components

```text
src/components/layout/
```

- `Navbar.tsx`
- `Footer.tsx`
- `ScrollToTop.tsx`

These define the persistent app frame and navigation behavior.

### Exam/Question Components

```text
src/components/exams/
```

- `ExamIndexPage.tsx`
- `QuestionListPage.tsx`
- `QuestionPageLayout.tsx`
- `QuestionCard.tsx`
- `SearchResults.tsx`

Responsibilities:

- render semester index pages for questions/solutions
- render semester-specific question lists
- render question detail layout
- render search/progress result rows
- apply finished progress state to question and semester UI

### Notes Components

```text
src/components/notes/
```

- `NoteListPage.tsx`
- `NotePageLayout.tsx`
- `NoteCard.tsx`
- `NoteSearchResults.tsx`

Responsibilities:

- render topic pages
- render note detail pages
- render note search results

### UI Components

```text
src/components/ui/
```

Reusable primitives:

- `Breadcrumb`
- `CodeBlock`
- `ContentBlock`
- `CopyButton`
- `EmptyState`
- `FinishToggle`
- `MathDisplay`
- `NotFoundState`
- `PageHeader`
- `ProgressFilterControls`
- `SemesterCard`
- `ThemeToggle`

These components are intentionally small. They are shared across pages and should remain presentation-focused.

## Styling Architecture

The original monolithic `components.css` has been split into partials.

Import hub:

```text
src/styles/components.css
```

It declares layer order and imports the partials:

```css
@layer tokens, base, components, dark;

@import "./tokens.css";
@import "./base.css";
@import "./navigation.css";
@import "./home.css";
@import "./layout.css";
@import "./cards.css";
@import "./details.css";
@import "./dark.css";
@import "./mobile.css";
```

### Style Partials

```text
src/styles/tokens.css
```

Design tokens:

- colors
- surfaces
- text colors
- borders
- RGB helper triples
- font families
- light/dark theme variables

```text
src/styles/base.css
```

Global base behavior:

- theme transition helper
- scrollbar colors

```text
src/styles/navigation.css
```

Navigation and shell pieces:

- animations
- navbar
- footer
- theme toggle

```text
src/styles/home.css
```

Home page:

- hero
- CTA buttons
- home section rows
- home divider

```text
src/styles/layout.css
```

General page structure:

- app shell
- page root/header/section
- breadcrumbs
- search input
- progress filters

```text
src/styles/cards.css
```

Card/list/result styling:

- search highlight
- semester cards
- result cards
- question cards
- note cards
- contact rows

```text
src/styles/details.css
```

Detail/content surfaces:

- empty states
- detail page layout
- content blocks
- code/math
- buttons
- 404

```text
src/styles/dark.css
```

Dark mode overrides.

```text
src/styles/mobile.css
```

Responsive styles for `max-width: 850px`.

Mobile is intentionally outside CSS layers to avoid specificity surprises.

## Theme System

Theme state is handled by:

```text
src/hooks/useTheme.ts
```

Theme behavior:

- reads from `localStorage`
- falls back to `prefers-color-scheme`
- writes `data-theme` on `document.documentElement`
- updates browser `theme-color`
- listens for OS theme changes if no explicit preference is stored

Theme toggle:

```text
src/components/ui/ThemeToggle.tsx
```

Theme storage key:

```text
maple-theme
```

## Page Responsibilities

### `Home`

Visual entry point for the platform.

Links to:

- exams
- questions
- solutions
- notes
- contact

### `Exams`

Displays original exam PDFs from `src/data/examPdfs.ts`.

Search filters by:

- label
- year

### `Questions`

Uses `ExamIndexPage` configured for question browsing.

Supports:

- semester list
- question search
- all/unfinished/finished filtering
- semester completion checkmarks

### `SemesterQuestions`

Thin wrapper over `QuestionListPage`.

Configured for:

```text
/questions
```

### `QuestionDetail`

Shows one question prompt.

Includes:

- breadcrumb
- topics
- `Mark as finished` toggle
- link to corresponding solution

### `Solutions`

Uses `ExamIndexPage` configured for solution browsing.

Supports the same search/progress logic as `Questions`.

### `SemesterSolutions`

Thin wrapper over `QuestionListPage`.

Configured for:

```text
/solutions
```

### `SolutionDetail`

Shows:

- question prompt
- solution code/text
- explanation

Includes:

- `Mark as finished` toggle
- skip-to-solution button
- copy code button

### `Notes`

Shows topic list and note search.

### `NotesTopic`

Shows entries for one note topic.

### `NotesDetail`

Renders note sections as text or code.

### `Contact`

Data-driven contact/contribution page.

## Project Tree

```text
my-app/
├── ARCHITECTURE.md
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
├── public/
│   ├── favicon.png
│   ├── exams/
│   │   ├── cisc_fall_2017.pdf
│   │   ├── cisc_fall_2018.pdf
│   │   ├── cisc_fall_2020.pdf
│   │   ├── cisc_spring_2021.pdf
│   │   └── cisc_spring_2023.pdf
│   └── thumbnail/
│       └── thumbnail.png
└── src/
    ├── app/
    │   ├── App.tsx
    │   └── router.tsx
    ├── components/
    │   ├── exams/
    │   │   ├── ExamIndexPage.tsx
    │   │   ├── QuestionCard.tsx
    │   │   ├── QuestionListPage.tsx
    │   │   ├── QuestionPageLayout.tsx
    │   │   └── SearchResults.tsx
    │   ├── layout/
    │   │   ├── Footer.tsx
    │   │   ├── Navbar.tsx
    │   │   └── ScrollToTop.tsx
    │   ├── notes/
    │   │   ├── NoteCard.tsx
    │   │   ├── NoteListPage.tsx
    │   │   ├── NotePageLayout.tsx
    │   │   └── NoteSearchResults.tsx
    │   └── ui/
    │       ├── Breadcrumb.tsx
    │       ├── CodeBlock.tsx
    │       ├── ContentBlock.tsx
    │       ├── CopyButton.tsx
    │       ├── EmptyState.tsx
    │       ├── FinishToggle.tsx
    │       ├── MathDisplay.tsx
    │       ├── NotFoundState.tsx
    │       ├── PageHeader.tsx
    │       ├── ProgressFilterControls.tsx
    │       ├── SemesterCard.tsx
    │       └── ThemeToggle.tsx
    ├── data/
    │   ├── examPdfs.ts
    │   ├── exams/
    │   │   ├── fall-2018.ts
    │   │   ├── fall-2020.ts
    │   │   ├── index.ts
    │   │   ├── spring-2021.ts
    │   │   └── spring-2023.ts
    │   └── notes/
    │       ├── index.ts
    │       ├── searching.ts
    │       └── sorting.ts
    ├── hooks/
    │   ├── useExamSearch.ts
    │   ├── useFinishedQuestions.ts
    │   ├── useNotesSearch.ts
    │   └── useTheme.ts
    ├── pages/
    │   ├── Contact.tsx
    │   ├── Home.tsx
    │   ├── PageNotFound.tsx
    │   ├── exams/
    │   │   └── Exams.tsx
    │   ├── notes/
    │   │   ├── Notes.tsx
    │   │   ├── NotesDetail.tsx
    │   │   └── NotesTopic.tsx
    │   ├── questions/
    │   │   ├── QuestionDetail.tsx
    │   │   ├── Questions.tsx
    │   │   └── SemesterQuestions.tsx
    │   └── solutions/
    │       ├── SemesterSolutions.tsx
    │       ├── SolutionDetail.tsx
    │       └── Solutions.tsx
    ├── styles/
    │   ├── base.css
    │   ├── cards.css
    │   ├── components.css
    │   ├── dark.css
    │   ├── details.css
    │   ├── home.css
    │   ├── layout.css
    │   ├── mobile.css
    │   ├── navigation.css
    │   └── tokens.css
    ├── types/
    │   └── index.ts
    ├── utils/
    │   ├── highlight.tsx
    │   ├── highlightJava.tsx
    │   ├── parsePrompt.ts
    │   └── search.ts
    ├── index.css
    └── main.tsx
```

## Adding New Content

### Add a New Exam PDF

1. Place the PDF in `public/exams/`.
2. Add metadata to `src/data/examPdfs.ts`.

### Add Extracted Questions for a Semester

1. Create a new file in `src/data/exams/`.
2. Export an `Exam`.
3. Add the semester to `src/data/exams/index.ts`.

### Add a New Note Topic

1. Create a new file in `src/data/notes/`.
2. Export a `NoteTopic`.
3. Add the topic to `src/data/notes/index.ts`.

## Deployment Model

The app is static and Vercel-friendly.

Vercel serves:

- the built React app
- bundled static assets
- files in `public/`

No serverless function is required.

Client progress works after deployment because it uses `localStorage` in the user’s browser.

## Known Tradeoffs

### No Backend

This keeps hosting simple, but user progress cannot sync across devices.

### Content-as-Code

Questions and notes are easy to type-check and ship, but adding content requires code changes.

### Simple Java Highlighter

The custom Java highlighter is lightweight and controllable, but it is not a complete syntax parser.

### Large Route Bundle

The build may warn that the main JS chunk is over 500 KB. This is not currently fatal. If needed, route-level lazy loading can split the bundle later.
