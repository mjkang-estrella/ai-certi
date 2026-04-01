import { Link } from "react-router-dom";
import type { ProjectDetailRecord } from "../data/dashboard";

type ProjectDetailHeaderProps = {
  detail: ProjectDetailRecord;
  onJump: (sectionId: string) => void;
};

const actionLinks = [
  { id: "project-status", label: "상태 확인" },
  { id: "project-dispatch", label: "발송/회신" },
  { id: "project-tasks", label: "할 일 정리" },
] as const;

function formatIntakeSource(source: ProjectDetailRecord["intakeSource"]) {
  return source === "web" ? "웹 접수" : "전화 접수";
}

export function ProjectDetailHeader({ detail, onJump }: ProjectDetailHeaderProps) {
  const projectListHref = detail.isCompleted ? "/projects?scope=completed" : "/projects?scope=active";
  const companyListHref = detail.isCompleted ? "/companies?scope=completed" : "/companies?scope=active";

  return (
    <section className="card project-detail-hero">
      <div className="project-detail-hero-top">
        <div>
          <div className="project-breadcrumbs">
            <Link to={projectListHref}>프로젝트</Link>
            <span>/</span>
            <Link to={companyListHref}>기업</Link>
          </div>
          <div className="project-detail-title-row">
            <div>
              <p className="project-detail-kicker">{detail.company}</p>
              <h1 className="project-detail-title">{detail.project}</h1>
            </div>
            <span className={`state ${detail.statusTone}`}>{detail.status}</span>
          </div>
          <p className="project-detail-summary">{detail.requestSummary}</p>
        </div>

        <div className="project-detail-header-actions">
          {actionLinks.map((item) => (
            <button key={item.id} type="button" className="button ghost" onClick={() => onJump(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-detail-metrics">
        <div className="project-detail-metric-card">
          <span>담당자</span>
          <strong>{detail.owner}</strong>
          <small>{detail.ownerRole}</small>
        </div>
        <div className="project-detail-metric-card">
          <span>다음 액션</span>
          <strong>{detail.nextAction}</strong>
          <small>{detail.nextActionNote}</small>
        </div>
        <div className="project-detail-metric-card">
          <span>최근 업데이트</span>
          <strong>{detail.updatedAt}</strong>
          <small>{detail.reportDueLabel}</small>
        </div>
        <div className="project-detail-metric-card">
          <span>운영 리스크</span>
          <strong>{detail.needsReminder ? "리마인더 필요" : "정상 진행"}</strong>
          <small>{detail.dispatchSummary.latestReplyStatus}</small>
        </div>
        <div className="project-detail-metric-card">
          <span>유입경로</span>
          <strong>{formatIntakeSource(detail.intakeSource)}</strong>
          <small>{detail.requestedAt}</small>
        </div>
      </div>
    </section>
  );
}
