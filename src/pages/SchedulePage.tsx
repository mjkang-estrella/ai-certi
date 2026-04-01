import { useDashboardData } from "../components/DashboardDataProvider";
import { weeklySchedule } from "../data/dashboard";

export function SchedulePage() {
  const { scheduleActionItems, unconfirmedScheduleCount } = useDashboardData();

  return (
    <section className="schedule-page">
      <section className="card schedule-alert-card">
        <div className="section-head">
          <div>
            <h2 className="section-title">일정 미확정 프로젝트</h2>
            <p className="section-copy">시험원 배정 또는 시험 협의 단계에서 일정 확정이 필요한 건수입니다.</p>
          </div>
        </div>
        <div className="schedule-alert-body">
          <strong className="schedule-alert-value">{unconfirmedScheduleCount}</strong>
          <p className="schedule-alert-copy">이번 주 안에 일정 확인이 필요한 프로젝트를 우선 점검합니다.</p>
        </div>
      </section>

      <section className="bottom-grid">
        <section className="card subtle-card">
          <div className="section-head">
            <div>
              <h2 className="section-title">이번 주 일정</h2>
              <p className="section-copy">3월 4주차</p>
            </div>
          </div>
          <div className="schedule">
            {weeklySchedule.map((item) => (
              <div className="schedule-item" key={item.title}>
                <strong>{item.title}</strong>
                <div>{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card subtle-card">
          <div className="section-head">
            <div>
              <h2 className="section-title">일정 관련 액션</h2>
              <p className="section-copy">일정 우선순위가 잡힌 운영 항목만 분리해 보여줍니다.</p>
            </div>
          </div>

          {scheduleActionItems.length === 0 ? (
            <div className="project-empty-state">현재 일정 관련 액션이 없습니다.</div>
          ) : (
            <div className="queue-list">
              {scheduleActionItems.map((item) => (
                <article className="queue-item" key={item.title}>
                  <div className={`queue-badge ${item.tone}`}>{item.priority}</div>
                  <div>
                    <div className="queue-title">{item.title}</div>
                    <div className="queue-meta">{item.description}</div>
                  </div>
                  <div className="queue-right">
                    <div className="count">{item.count}</div>
                    <div className="hint">{item.hint}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </section>
  );
}
