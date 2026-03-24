import { projectStatuses, type ProjectDetailRecord } from "../data/dashboard";

type ProjectStatusTimelineProps = {
  detail: ProjectDetailRecord;
};

export function ProjectStatusTimeline({ detail }: ProjectStatusTimelineProps) {
  const currentIndex = projectStatuses.indexOf(detail.status);

  return (
    <div className="project-status-layout">
      <div className="project-status-grid">
        {projectStatuses.map((status, index) => {
          const stateClass = index < currentIndex ? "done" : index === currentIndex ? "current" : "upcoming";

          return (
            <div className={`project-status-step ${stateClass}`} key={status}>
              <div className="project-status-step-index">{index + 1}</div>
              <div>
                <strong>{status}</strong>
                <p>{index < currentIndex ? "완료된 단계" : index === currentIndex ? "현재 진행중" : "예정 단계"}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="project-history-list">
        {detail.statusHistory.map((item) => (
          <article className="project-history-item" key={`${item.status}-${item.changedAt}`}>
            <div className="project-history-meta">
              <span className={`state ${item.status === detail.status ? detail.statusTone : "in-progress"}`}>{item.status}</span>
              <strong>{item.changedAt}</strong>
            </div>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
