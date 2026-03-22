import { bannerMetrics } from "../data/dashboard";

export function DashboardBanner() {
  return (
    <section className="banner">
      <div className="banner-head">
        <div>
          <h2 className="banner-title">이 달 전체 진행상황</h2>
          <p className="banner-copy">
            조직 전체 상태를 7개 핵심 지표로 요약하고, 아래에서 시험원별 세부 분포와 실무 처리 큐를
            이어서 보는 구조다.
          </p>
        </div>
        <div className="banner-note">상단은 전체 현황, 아래는 담당자 비교와 우선 처리 업무</div>
      </div>

      <div className="banner-metrics">
        {bannerMetrics.map((metric) => (
          <div className="banner-item" key={metric.label}>
            <div className="banner-label">{metric.label}</div>
            <div className="banner-value">{metric.value}</div>
            <div className="banner-sub">{metric.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

