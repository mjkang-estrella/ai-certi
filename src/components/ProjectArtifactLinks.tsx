import type { ProjectArtifactLink } from "../data/dashboard";

type ProjectArtifactLinksProps = {
  items: ProjectArtifactLink[];
};

export function ProjectArtifactLinks({ items }: ProjectArtifactLinksProps) {
  return (
    <div className="project-artifact-grid">
      {items.map((item) => (
        <article className="project-artifact-card" key={item.id}>
          <div className="project-artifact-head">
            <span>{item.category}</span>
            <strong>{item.label}</strong>
          </div>
          <p>{item.description}</p>
          <a href={item.href} target="_blank" rel="noreferrer">
            링크 열기
          </a>
          <div className="project-artifact-footer">
            <span>{item.owner}</span>
            <span>{item.updatedAt}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
