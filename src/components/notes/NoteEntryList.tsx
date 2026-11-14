import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { NoteEntry, NoteGroup, NoteTopic } from "../../types";
import { getNoteContentSnippet, noteEntryMatchesQuery } from "../../utils/noteSearch";
import { hasQuery, normalizeQuery, resultCountLabel } from "../../utils/search";
import { Breadcrumb } from "../ui/Breadcrumb";
import { EmptyState } from "../ui/EmptyState";
import { EntryCard } from "../ui/EntryCard";
import { PageHeader } from "../ui/PageHeader";

type NoteEntryListProps = {
  topic: NoteTopic;
  // when set, lists only this group's entries
  group?: NoteGroup;
};

type ListCard = {
  key: string;
  to: string;
  title: string;
  tags: string[];
  snippet: string | null;
};

// The note cards for a topic page, or for one group's page. On the topic page a
// group's entries are shown as a single card, placed where its first entry would
// be. Searching lists every matching entry on its own.
export function NoteEntryList({ topic, group }: NoteEntryListProps) {
  const [query, setQuery] = useState("");

  const entries = useMemo(
    () => (group ? topic.entries.filter(entry => entry.group === group.id) : topic.entries),
    [topic, group],
  );

  const cards = useMemo((): ListCard[] => {
    const entryCard = (entry: NoteEntry): ListCard => ({
      key: entry.id,
      to: `/notes/${topic.id}/${entry.id}`,
      title: entry.title,
      tags: entry.tags,
      snippet: getNoteContentSnippet(entry, query),
    });

    const q = normalizeQuery(query);
    if (q) return entries.filter(entry => noteEntryMatchesQuery(entry, q)).map(entryCard);
    if (group) return entries.map(entryCard);

    const shownGroups = new Set<string>();
    return entries.flatMap(entry => {
      const entryGroup = topic.groups?.find(g => g.id === entry.group);
      if (!entryGroup) return [entryCard(entry)];
      if (shownGroups.has(entryGroup.id)) return [];
      shownGroups.add(entryGroup.id);

      const members = entries.filter(e => e.group === entryGroup.id);
      return [{
        key: entryGroup.id,
        to: `/notes/${topic.id}/${entryGroup.id}`,
        title: entryGroup.title,
        tags: [...new Set(members.flatMap(e => e.tags))],
        snippet: null,
      }];
    });
  }, [entries, group, query, topic]);

  const crumbs = group
    ? [{ label: "notes", to: "/notes" }, { label: topic.label, to: `/notes/${topic.id}` }, { label: group.title }]
    : [{ label: "notes", to: "/notes" }, { label: topic.label }];

  return (
    <div className="page-root">
      <Breadcrumb crumbs={crumbs} />

      <PageHeader
        detail
        title={group ? group.title : topic.label}
        subtitle="select a note to read it"
        query={query}
        placeholder="search notes..."
        resultLabel={hasQuery(query) ? resultCountLabel(cards.length, entries.length, "note") : undefined}
        onQueryChange={setQuery}
      />

      <section className="page-section page-section--questions">
        {cards.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          cards.map(card => (
            <EntryCard
              key={card.key}
              to={card.to}
              title={card.title}
              tags={card.tags}
              snippet={card.snippet}
              query={query}
            />
          ))
        )}

        <div className="detail-bottom-nav">
          {group ? (
            <Link to={`/notes/${topic.id}`} className="back-link">← All {topic.label} notes</Link>
          ) : (
            <Link to="/notes" className="back-link">← All topics</Link>
          )}
        </div>
      </section>
    </div>
  );
}
