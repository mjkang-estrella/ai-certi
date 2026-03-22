export function Topbar() {
  return (
    <div className="topbar">
      <div>
        <h1 className="page-title">운영 현황</h1>
        <p className="page-copy">이 달 진행상황과 시험원별 단계 분포 확인</p>
      </div>

      <div className="actions">
        <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="dashboard-search">
            기업명, 담당자, 프로젝트 검색
          </label>
          <input
            className="search"
            id="dashboard-search"
            name="dashboard-search"
            placeholder="기업명, 담당자, 프로젝트 검색"
            aria-describedby="dashboard-search-help"
          />
          <span className="sr-only" id="dashboard-search-help">
            프로젝트명, 담당자명 또는 기업명으로 현재 진행 건을 검색합니다.
          </span>
        </form>
        <button type="button" className="button ghost">전화 접수 등록</button>
        <button type="button" className="button primary">의뢰서 수기 등록</button>
      </div>
    </div>
  );
}
