import { actionItems } from "../data/dashboard";

export function ActionQueueCard() {
  return (
    <div className="card">
      <div className="section-head">
        <div>
          <h2 className="section-title">지금 처리해야 할 일</h2>
          <p className="section-copy">홈에서 가장 중요한 실무 영역. 우선순위가 높은 건만 노출한다.</p>
        </div>
        <div className="section-link">전체 리마인더 보기</div>
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

