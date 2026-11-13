import { highlight } from "../../utils/highlight";

type TagListProps = {
  tags: string[];
  query?: string;
  wrapperClassName: string;
  tagClassName: string;
};

export function TagList({ tags, query = "", wrapperClassName, tagClassName }: TagListProps) {
  return (
    <div className={wrapperClassName}>
      {tags.map(tag => (
        <span key={tag} className={tagClassName}>
          {highlight(tag, query)}
        </span>
      ))}
    </div>
  );
}
