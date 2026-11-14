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
    notes/              note search results, algorithm visualizer, number converter
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
| `/notes/:topicId/:entryId` | `NotesDetail` | `DetailPageLayout`, or `NoteEntryList` when the id is a note group |
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
| `JavaCodeBlock` | Labelled Java code with Copy code and a Remove comments toggle; used for Java solutions and note code |
| `CodeBlock`, `MathDisplay`, `CopyButton` | Java or plain code, KaTeX math, copy to clipboard |
| `EmptyState`, `NotFoundState` | No results, unknown id |

Helpers: `cx()` joins conditional class names (`utils/ui.ts`), `highlight()` marks the search match in a string (`utils/highlight.tsx`), and `utils/search.ts` holds query normalization, snippets, and count labels.

## Adding content

Run `npm test` afterwards. `src/data/content.test.ts` checks ids, required fields, block delimiters, and PDF paths.

**Exam PDF**: put the file in `public/exams/` and add an entry to `src/data/examPdfs.ts`.

**Semester**: create `src/data/exams/<term>-<year>.ts` exporting an `Exam`, then add it to the `exams` array in `src/data/exams/index.ts` in chronological order. Use the same `id` as the PDF entry (for example `spring2023`).

**Question**: add a `Question` to the semester's `questions` array.

**Note topic**: create `src/data/notes/<topic>.ts` exporting a `NoteTopic` and add it to the array in `src/data/notes/index.ts`.

**Algorithm visual**: set `visualizer` on a note entry (see below).

**Number converter**: set `converter: { from, to, value }` on a note entry (see below).

**Note group**: to show several notes as one card on the topic page, add `{ id, title }` to the topic's `groups` and set `group: "<id>"` on each note. The card opens `/notes/<topic>/<group id>`, which lists those notes, and a grouped note's breadcrumb and back link go to the group. Group ids share the URL slot with note ids, so they must not match any note id in the topic; `content.test.ts` checks this. The number systems conversion guides are a group.

Ids appear in URLs and in saved progress, so keep them lowercase letters, digits, and hyphens, unique within their parent, and do not rename them once published. Question ids are the exam's own numbering (`"3"`, `"5a"`).

### Content markup

`Question.prompt`, `Question.explanation`, text solutions, and note sections with `type: "text"` are rendered by `PromptBody`:

| Markup | Result |
| --- | --- |
| `[[code]]…[[/code]]` | Java block with syntax highlighting |
| `[[text]]…[[/text]]` | Monospace block without highlighting: program output, input files, binary addition |
| `[[table]]…[[/table]]` | Table. One row per line, cells separated by `\|`, first row is the header |
| `**bold**`, `*italic*`, `__underline__` | Inline styles within one line of prose or one table cell |
| 1 to 3 leading spaces | Line indented one level |
| 4 or more leading spaces | Line indented two levels |
| Blank line | Line break |

Use `[[table]]` for every chart: trace tables, binary search low/mid/high steps, conversion work, method tracing tables. Do not hand-align columns in `[[text]]`. Example:

```text
[[table]]
Low | Mid | High
0 | 5 | 10
1 | - | 0
[[/table]]
```

`Question.solution` depends on `solutionType`:

- `"java"` (the default): shown verbatim as highlighted, copyable code. Use it for programs, methods, statements, and code fixes. When the code has comments, a **Remove comments** toggle hides them (`JavaCodeBlock`, `utils/javaComments.ts`), and Copy code copies whichever version is shown.
- `"text"`: rendered with the markup above. Use it for traces, printed output, conversions, and short answers. It can still contain `[[code]]` blocks.

Note sections with `type: "code"` are shown verbatim as Java, with the same Remove comments toggle. `Question.mathLatex` is rendered as a KaTeX display equation under the prompt; remember to double the backslashes inside template strings.

`src/data/content.test.ts` enforces the markup: balanced block delimiters, every table row with the same number of cells as its header, and an even number of `*` and `__` on each prose line. An odd count means arithmetic like `a * b` leaked into prose; move it into a `[[code]]` block or write it as `×`.

### Writing questions

- Copy the prompt from the exam PDF faithfully, then format it: code in `[[code]]`, sample input and output in `[[text]]`, charts in `[[table]]`. Leave the answer out of the prompt even when the PDF shows it.
- Split a multi-part question into separate entries (`5a`, `5b`) when the parts are independent. Keep it as one entry when later parts depend on earlier ones.
- Explanations talk to the student ("we", "you"), walk through the reasoning in short paragraphs, and point out the trap the question is testing.
- Stay inside what CISC 1115 covers: Scanner, File and PrintWriter, printf, arrays and parallel arrays, String methods, Math methods, loops, methods, and bubble or selection sort. No ArrayList, Arrays.sort, or other library shortcuts.
- Every program needs a comment in main and in each method, since the exams require it.
- Compile and run every Java solution before publishing it, and run every trace through Java rather than tracing by hand.

The Java highlighter (`utils/highlightJava.tsx`) is a small line tokenizer, not a parser. It does not handle block comments or char literals. It tags tokens with `tok-*` classes whose colors are the `--syntax-*` variables in `tokens.css`.

## Algorithm visualizer

A note entry with `visualizer` set (`"binarysearch"`, `"linearsearch"`, `"bubblesort"`, `"selectionsort"`) gets a **Watch it run** block above its sections. `NotesDetail` passes it the entry's code section.

- `utils/algorithmSteps.ts` records a run as a list of steps: the array, a state per bar (comparing, swapped, sorted, and so on), pointers such as `start` and `mid`, variable values, a message, and the rows of the trace chart so far. Each recorder follows the note's Java implementation line for line.
- Each step names the code lines it is on by a piece of their text, such as `"if (nums[j] > nums[j+1])"`. The visualizer highlights the line that contains it. `algorithmSteps.test.ts` fails if an anchor matches zero lines or more than one, so **editing a visualized implementation means updating its anchors**.
- The default inputs are the examples traced in each note, and the tests check that the binary search and selection sort charts match the tables in the notes.
- `components/notes/AlgorithmVisualizer.tsx` holds the controls (custom array and target, Random, Play, Back, Next, speed, scrubber, arrow keys and space). `VisualizerBars.tsx` draws the bars in SVG, so bar sizes come from the data without inline styles. Styles are in `styles/visualizer.css`.

## Number converter

A note entry with `converter` set gets a **Number converter** block below its sections, or above them with `above: true`. It converts whole numbers from 0 to 65535 between binary, decimal, and hexadecimal and explains the work one step at a time. The number systems notes use it on every entry.

- `utils/baseConversion.ts` validates the input and records the steps. Each step body is content markup, rendered by `PromptBody`. The steps use a place value table for binary or hex to decimal, subtracting powers of 2 for decimal to binary, filling in the hex places (how many 256s, 16s, and 1s fit) for decimal to hex, and four-bit groups between binary and hex.
- A conversion note's `converter` opens on the note's own worked example. `baseConversion.test.ts` fails if a table the converter draws does not appear in the note, so **editing a worked example means updating its `converter` value, and changing a step's table means updating the notes**. The same test checks the converter against every published exam answer.
- `components/notes/BaseConverter.tsx` holds the controls. It reuses the visualizer's input and button classes; its own styles are in `styles/converter.css`.

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
| `tokens.css` | Colors, fonts, and light and dark variables. Use these instead of literal colors. Dark mode is the Tokyo Night palette: the `--color-orange` accent tokens hold Tokyo Night blue there, `--color-syrup` magenta, `--color-forest` green. |
| `base.css` | Theme transition, scrollbars |
| `navigation.css` | Navbar, footer, theme toggle, entry animations |
| `home.css` | Home page hero and cards |
| `layout.css` | Page frame, header, breadcrumb, search input, progress filter |
| `cards.css` | Semester, question, note, result, and contact cards; search highlight |
| `details.css` | Detail pages, content blocks, code, math, buttons, 404 |
| `visualizer.css` | Algorithm visualizer on note pages |
| `converter.css` | Number converter on note pages |
| `dark.css` | Dark mode overrides, scoped by `[data-theme="dark"]` |
| `mobile.css` | Everything under the single `850px` breakpoint; deliberately outside the layers |

Tailwind is imported in `src/index.css` only for its base reset. Components use the named classes above, not utility classes. Several class names are historical: `semester-card-*` styles every `IndexedCardList`, and `question-card-*` styles every `EntryCard`.

## Known tradeoffs

- No backend, so progress does not sync between devices or browsers.
- Content changes require a code change and a deploy.
- The app ships as one JavaScript chunk of about 630 kB, which triggers Vite's size warning. Route-level lazy loading would split it.
