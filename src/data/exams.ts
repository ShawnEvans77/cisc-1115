// src/data/exams.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all exam data.
// To add a new exam:
//   1. Create src/data/semesters/<term-year>.ts
//   2. Import it here and add it to the array in chronological order.
// ─────────────────────────────────────────────────────────────────────────────

import type { Exam } from "../types";

import { fall2020 }   from "./semesters/fall-2020";
import { spring2021 } from "./semesters/spring-2021";

export const exams: Exam[] = [
  fall2020,
  spring2021,
];