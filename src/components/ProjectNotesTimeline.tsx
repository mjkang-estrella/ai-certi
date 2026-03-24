import { useMemo, useState } from "react";
import type { ProjectDetailNote } from "../data/dashboard";

type ProjectNotesTimelineProps = {
  notes: ProjectDetailNote[];
};

export function ProjectNotesTimeline({ notes }: ProjectNotesTimelineProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleNotes = useMemo(() => (expanded ? notes : notes.slice(0, 3)), [expanded, notes]);

  return (
    <>
      <div className="detail-inline-actions">
        {notes.length > 3 ? (
          <button type="button" className="button ghost detail-inline-button" onClick={() => setExpanded((current) => !current)}>
            {expanded ? "최근 3개만 보기" : `메모 ${notes.length}개 모두 보기`}
          </button>
        ) : null}
      </div>

      <div className="project-notes-list">
        {visibleNotes.map((note) => (
          <article className="project-note-card" key={note.id}>
            <div className="project-note-head">
              <span className="project-note-kind">{note.kind}</span>
              <strong>{note.title}</strong>
            </div>
            <p>{note.content}</p>
            <div className="project-note-footer">
              <span>{note.author}</span>
              <span>{note.createdAt}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
