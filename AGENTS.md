# CISC 1115 Learning Platform

Static React 19 + TypeScript + Vite study site. No backend; content is TypeScript data in `src/data`. Read [ARCHITECTURE.md](ARCHITECTURE.md) for the code layout, the shared components, and the content markup.

## Commands

- `npm run check` runs lint, tests, and the production build. Run it before calling a change done.
- `npm test` is the fast check after editing anything in `src/data`.
- `npm run dev` starts the dev server.

## Where things go

- Content (exams, questions, notes, PDF list): `src/data`. Follow "Adding content" in ARCHITECTURE.md.
- A new route: a default-exported component in `src/pages`, registered in `src/app/router.tsx`.
- Markup used by more than one page: `src/components/ui`. Check the "Shared building blocks" table first; most list, card, and detail layouts already exist.
- Pure logic: `src/utils`, with a `*.test.ts` file beside it.

## Conventions

- Pages and `components/layout` use default exports. Everything else uses named exports.
- Props are declared as a `type XProps = { … }` above the component.
- Build class names with `cx()` from `src/utils/ui.ts`, not template strings.
- Style with named classes in `src/styles` and the variables in `tokens.css`. Do not add Tailwind utility classes or inline styles.
- Dark mode rules go in `dark.css`; anything for small screens goes in `mobile.css` (one breakpoint, 850px).
- Do not add file-path header comments or section-divider comments.

## Things that break silently

- Exam, question, topic, and note ids are URL segments and `localStorage` progress keys. Never rename a published id.
- The theme storage key and theme colors are duplicated in `index.html` and `src/hooks/useTheme.ts`. Change both.
- Content strings are template literals: escape backticks and `${`, and double the backslashes in `mathLatex`.
- Leading spaces in prompt and explanation lines are meaningful (they indent the line), so do not reformat content strings.
- `cta-btn--<variant>` classes in `home.css` are built dynamically in `Home.tsx`; a search for the full class name finds no usage.
