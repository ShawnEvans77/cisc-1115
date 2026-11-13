import type { ReactNode } from "react";

type ContentBlockProps = {
  label: string;
  children: ReactNode;
  headerSlot?: ReactNode;
  id?: string;
};

export function ContentBlock({ label, children, headerSlot, id }: ContentBlockProps) {
  return (
    <div id={id} className="content-block">
      <div className="content-block-header">
        <p className="content-block-label">{label}</p>
        {headerSlot}
      </div>
      {children}
    </div>
  );
}
