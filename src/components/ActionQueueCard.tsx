import { useDashboardData } from "./DashboardDataProvider";

export function ActionQueueCard() {
  const { actionItems } = useDashboardData();

  return (
    <div className="card card-urgent">
      <div className="section-head">
        <div>
          <h2 className="section-title">지금 처리해야 할 일</h2>
          <p className="section-copy">{actionItems.length}건 미처리</p>
        </div>
      </div>

      <div className="queue-list">
        {actionItems.map((item) => (
          <div className="queue-item" key={item.title}>
            <div className={`queue-badge ${item.tone}`}>{item.priority}</div>
            <div>
              <div className="queue-title">{item.title}</div>
              <div className="queue-meta">{item.description}</div>
            </div>
            <div className="queue-right">
              <div className="count">{item.count}</div>
              <div className="hint">{item.hint}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
