import { pipelineStages } from "../data/dashboard";

export function DashboardBanner() {
  return (
    <section className="overview-card card">
      <div className="section-head">
        <div>
          <h2 className="section-title">이 달 현황</h2>
          <p className="section-copy">2026년 3월 기준</p>
        </div>
      </div>

      <div className="pipeline">
        {pipelineStages.map((stage, i) => (
          <div className="pipeline-stage" key={stage.title} role="group" aria-label={`${stage.title} 단계`}>
            <div className="pipeline-stage-head">
              <span className="pipeline-stage-title">{stage.title}</span>
              {i < pipelineStages.length - 1 && (
                <span className="pipeline-arrow" aria-hidden="true">›</span>
              )}
            </div>
            <div className="pipeline-metrics">
              {stage.metrics.map((m) => (
                <div className="pipeline-metric" key={m.label}>
                  <div className="pipeline-value">{m.value}</div>
                  <div className="pipeline-label">{m.label}</div>
                  <div className="pipeline-sub">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
