import { useParams } from "react-router-dom";
import { findTopicById } from "../../data/notes";
import { NoteEntryList } from "../../components/notes/NoteEntryList";
import { NotFoundState } from "../../components/ui/NotFoundState";

function NotesTopic() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = findTopicById(topicId);

  if (!topic) {
    return <NotFoundState title="Topic not found" backTo="/notes" backLabel="← Back to notes" />;
  }

  // keyed by topic so the search box clears when moving to another topic
  return <NoteEntryList key={topic.id} topic={topic} />;
}

export default NotesTopic;
