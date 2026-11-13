# Architecture

A static, frontend-only React app. Content is bundled at build time from typed TypeScript modules; nothing is fetched at runtime. The only persisted state is in `localStorage`.

## Layout

```text
src/
  main.tsx, app/        entry point, app shell (App.tsx), route table (router.tsx)
  constants.ts          course name strings
  types/index.ts        Exam, Question, NoteTopic, NoteEntry, NoteSection, ExamSection
  data/                 all site content (see "Adding content")
  pages/                one default-exported component per route
  components/
    ui/                 presentational building blocks, no data imports
    exams/              question and solution screens shared by /questions and /solutions
    notes/              note search results
    layout/             Navbar, Footer, ScrollToTop
  hooks/                search hooks, finished-question progress, theme
  utils/                pure functions: search, prompt parsing, highlighting
  styles/               plain CSS, split by area
public/exams/           original exam PDFs
```

## Routes

| Route | Page | Built from |
| --- | --- | --- |
| `/` | `Home` | |
| `/exams` | `Exams` | `IndexedCardList` of PDFs |
| `/questions`, `/solutions` | `Questions`, `Solutions` | `ExamIndexPage` |
| `/questions/:examId`, `/solutions/:examId` | `SemesterQuestions`, `SemesterSolutions` | `QuestionListPage` |
| `/questions/:examId/:questionId` | `QuestionDetail` | `QuestionPageLayout` |
| `/solutions/:examId/:questionId` | `SolutionDetail` | `QuestionPageLayout` |
| `/notes` | `Notes` | |
| `/notes/:topicId` | `NotesTopic` | |
| `/notes/:topicId/:entryId` | `NotesDetail` | `DetailPageLayout` |
| `/contact` | `Contact` | |
| `*` | `PageNotFound` | |

`/questions` and `/solutions` are the same screens over the same data. The shared components take a `section` prop (`"questions"` or `"solutions"`) and build every link from it. `vercel.json` rewrites all paths to `index.html` so deep links work.

## Shared building blocks

Reach for these before writing new markup:

| Component | Use |
| --- | --- |
| `PageHeader` | Title, subtitle, optional search box, filter controls, and result count |
| `IndexedCardList` | Numbered list of cards (semesters, topics, PDFs) |
| `EntryCard` | One row in a question list or note list |
| `SearchResultList` | Cross-section search results; `ExamSearchResults` and `NoteSearchResults` adapt their data to it |
| `DetailPageLayout` | Frame for one question, solution, or note: breadcrumb, title, tags, content, bottom nav |
| `ContentBlock` | Labelled content panel with an optional header action |
| `PromptBody` | Renders content markup (below) |
| `CodeBlock`, `MathDisplay`, `CopyButton` | Java or plain code, KaTeX math, copy to clipboard |
| `EmptyState`, `NotFoundState` | No results, unknown id |

Helpers: `cx()` joins conditional class names (`utils/ui.ts`), `highlight()` marks the search match in a string (`utils/highlight.tsx`), and `utils/search.ts` holds query normalization, snippets, and count labels.

## Adding content

Run `npm test` afterwards. `src/data/content.test.ts` checks ids, required fields, block delimiters, and PDF paths.

**Exam PDF**: put the file in `public/exams/` and add an entry to `src/data/examPdfs.ts`.

**Semester**: create `src/data/exams/<term>-<year>.ts` exporting an `Exam`, then add it to the `exams` array in `src/data/exams/index.ts` in chronological order. Use the same `id` as the PDF entry (for example `spring2023`).

**Question**: add a `Question` to the semester's `questions` array.

**Note topic**: create `src/data/notes/<topic>.ts` exporting a `NoteTopic` and add it to the array in `src/data/notes/index.ts`.

Ids appear in URLs and in saved progress, so keep them lowercase letters, digits, and hyphens, unique within their parent, and do not rename them once published. Question ids are the exam's own numbering (`"3"`, `"5a"`).

### Content markup

`Question.prompt`, `Question.explanation`, and note sections with `type: "text"` are rendered by `PromptBody`:

| Markup | Result |
| --- | --- |
| `[[code]]…[[/code]]` | Java block with syntax highlighting |
| `[[text]]…[[/text]]` | Monospace block without highlighting (tables, traces, output) |
| `**bold**`, `*italic*`, `__underline__` | Inline styles within one line of prose |
| 1 to 3 leading spaces | Line indented one level |
| 4 or more leading spaces | Line indented two levels |
| Blank line | Line break |

`Question.solution` and note sections with `type: "code"` are shown verbatim in a code block. A solution is highlighted as Java unless `solutionType: "text"` is set. `Question.mathLatex` is rendered as a KaTeX display equation under the prompt; remember to double the backslashes inside template strings.

The Java highlighter (`utils/highlightJava.tsx`) is a small line tokenizer, not a parser. It does not handle block comments or char literals.

## Search

Search is synchronous and in-memory. `collectNestedSearchResults` (`utils/search.ts`) walks parents and children: a parent that matches is returned once on its own, otherwise each matching child is returned. `useExamSearch` applies it to semesters and questions, `useNotesSearch` to topics and note entries. The match predicates live in `utils/examSearch.ts` and `utils/noteSearch.ts`.

## Finished-question progress

`useFinishedQuestions` stores a list of `"<examId>:<questionId>"` keys under `localStorage["cisc-1115-finished-questions"]` and listens for `storage` events so other tabs stay in sync. It also reads the old key `cisc-1115-visited-questions` when the current one is empty. Questions are only marked finished by the explicit toggle, and a semester shows a checkmark once all of its questions are finished.

## Theme

`useTheme` reads `localStorage["maple-theme"]`, falls back to the OS preference, and sets `data-theme` on `<html>`. An inline script in `index.html` does the same before React mounts to avoid a flash of the wrong theme, so the storage key and the two theme colors exist in both places and must be changed together.

## Styling

All styling is hand-written CSS in `src/styles`, imported through `styles/components.css`, which declares the layer order `tokens, base, components, dark`.

| File | Contents |
| --- | --- |
| `tokens.css` | Colors, fonts, and light and dark variables. Use these instead of literal colors. |
| `base.css` | Theme transition, scrollbars |
| `navigation.css` | Navbar, footer, theme toggle, entry animations |
| `home.css` | Home page hero and cards |
| `layout.css` | Page frame, header, breadcrumb, search input, progress filter |
| `cards.css` | Semester, question, note, result, and contact cards; search highlight |
| `details.css` | Detail pages, content blocks, code, math, buttons, 404 |
| `dark.css` | Dark mode overrides, scoped by `[data-theme="dark"]` |
| `mobile.css` | Everything under the single `850px` breakpoint; deliberately outside the layers |

Tailwind is imported in `src/index.css` only for its base reset. Components use the named classes above, not utility classes. Several class names are historical: `semester-card-*` styles every `IndexedCardList`, and `question-card-*` styles every `EntryCard`.

## Known tradeoffs

- No backend, so progress does not sync between devices or browsers.
- Content changes require a code change and a deploy.
- The app ships as one JavaScript chunk of about 630 kB, which triggers Vite's size warning. Route-level lazy loading would split it.
