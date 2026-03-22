export function Topbar() {
  return (
    <div className="topbar">
      <div>
        <div className="eyebrow">관리자 홈</div>
        <h1 className="page-title">운영 현황</h1>
        <p className="page-copy">
          이 달 전체 진행상황과 시험원별 단계 분포를 한 화면에서 확인하고 병목을 바로 처리하는 메인
          페이지.
        </p>
      </div>

      <div className="actions">
        <input className="search" placeholder="기업명, 담당자, 프로젝트 검색" />
        <button className="button ghost">전화 접수 등록</button>
        <button className="button primary">의뢰서 수기 등록</button>
      </div>
    </div>
  );
}

