// Single source of truth for all notes data.
// To add a new topic:
//   1. Create src/data/notes/<topic>.ts
//   2. Import it here and add it to the array.

import type { NoteTopic } from "../../types";

import { sorting }   from "./sorting";
import { searching } from "./searching";
import { numberSystems } from "./numberSystems";

export const notes: NoteTopic[] = [
  searching,
  sorting,
  numberSystems,
];

export function findTopicById(topicId?: string): NoteTopic | undefined {
  return notes.find(topic => topic.id === topicId);
}
