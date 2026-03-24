import type { ProjectDispatchSummary } from "../data/dashboard";

type ProjectDispatchTrackerProps = {
  summary: ProjectDispatchSummary;
  needsReminder: boolean;
};

function formatDispatchDate(value: string | null) {
  return value ?? "미발송";
}

export function ProjectDispatchTracker({ summary, needsReminder }: ProjectDispatchTrackerProps) {
  return (
    <div className="project-dispatch-grid">
      <article className="project-dispatch-card">
        <span>견적서 발송</span>
        <strong>{formatDispatchDate(summary.quoteSentAt)}</strong>
        <p>{summary.quoteSentAt ? "견적서 발송 기록이 남아 있습니다." : "아직 견적서를 발송하지 않았습니다."}</p>
      </article>

      <article className="project-dispatch-card">
        <span>신청 의뢰서 발송</span>
        <strong>{formatDispatchDate(summary.applicationSentAt)}</strong>
        <p>{summary.applicationSentAt ? "정식 의뢰서 발송 이력이 있습니다." : "정식 의뢰서 발송 전 단계입니다."}</p>
      </article>

      <article className="project-dispatch-card">
        <span>최근 회신 상태</span>
        <strong>{summary.latestReplyStatus}</strong>
        <p>{summary.lastFollowUpNote}</p>
      </article>

      <article className={`project-dispatch-card${needsReminder ? " alert" : ""}`}>
        <span>리마인더 기준</span>
        <strong>{summary.reminderDueAt}</strong>
        <p>{needsReminder ? "후속 연락 또는 확인이 필요한 상태입니다." : "추가 리마인더 없이 진행 중입니다."}</p>
      </article>
    </div>
  );
}
