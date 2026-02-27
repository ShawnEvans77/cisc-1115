// src/data/notes.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all notes data.
// To add a new topic:
//   1. Create src/data/notes/<topic>.ts
//   2. Import it here and add it to the array.
// ─────────────────────────────────────────────────────────────────────────────

import type { NoteTopic } from "../types";

import { sorting }   from "./notes/sorting";
import { searching } from "./notes/searching";

export const notes: NoteTopic[] = [
    searching,
    sorting,
];