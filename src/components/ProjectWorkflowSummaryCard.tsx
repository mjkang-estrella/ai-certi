import type { ProjectWorkflowSummary } from "../data/dashboard";

type ProjectWorkflowSummaryCardProps = {
  item: ProjectWorkflowSummary;
};

export function ProjectWorkflowSummaryCard({ item }: ProjectWorkflowSummaryCardProps) {
  return (
    <article className="project-workflow-card">
      <div className="project-workflow-head">
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <span className={`state ${item.tone}`}>{item.statusLabel}</span>
      </div>

      <div className="project-workflow-steps">
        {item.steps.map((step) => (
          <div className={`project-workflow-step ${step.state}`} key={step.label}>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
