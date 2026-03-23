import type { ClientListItem, IntakeSource } from "../data/dashboard";

type CompanyDetailPanelProps = {
  item: ClientListItem | null;
};

function formatIntakeSource(source: IntakeSource) {
  return source === "web" ? "웹 접수" : "전화 접수";
}

export function CompanyDetailPanel({ item }: CompanyDetailPanelProps) {
  if (!item) {
    return (
      <section className="card company-detail">
        <div className="company-empty-state">선택 가능한 기업이 없습니다. 검색 조건을 조정해 주세요.</div>
      </section>
    );
  }

  return (
    <section className="card company-detail">
      <div className="section-head">
        <div>
          <h2 className="section-title">{item.client.companyName}</h2>
          <p className="section-copy">관련 프로젝트 {item.projectCount}건 · 진행중 {item.activeProjectCount}건</p>
        </div>
      </div>

      <div className="company-info-grid">
        <div className="company-info-item">
          <span>기업명</span>
          <strong>{item.client.companyName}</strong>
        </div>
        <div className="company-info-item">
          <span>담당자 성명</span>
          <strong>{item.client.contactName}</strong>
        </div>
        <div className="company-info-item">
          <span>이메일</span>
          <strong>{item.client.email}</strong>
        </div>
        <div className="company-info-item">
          <span>연락처</span>
          <strong>{item.client.phone}</strong>
        </div>
        <div className="company-info-item">
          <span>사업자등록번호</span>
          <strong>{item.client.businessNumber ?? "미등록"}</strong>
        </div>
      </div>

      <div className="detail-divider" />

      <div className="section-head section-head-compact">
        <div>
          <h3 className="section-title">관련 프로젝트</h3>
          <p className="section-copy">기업 단위에서 현재 상태와 다음 액션을 함께 확인합니다.</p>
        </div>
      </div>

      <div className="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th scope="col">프로젝트</th>
              <th scope="col">현재 상태</th>
              <th scope="col">담당자</th>
              <th scope="col">유입경로</th>
              <th scope="col">다음 액션</th>
              <th scope="col">최근 업데이트</th>
            </tr>
          </thead>
          <tbody>
            {item.projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="company-name">{project.projectName}</div>
                </td>
                <td>
                  <span className={`state ${project.statusTone}`}>{project.status}</span>
                </td>
                <td>
                  <div className="company-name">{project.owner}</div>
                </td>
                <td className="company-sub">{formatIntakeSource(project.intakeSource)}</td>
                <td>
                  <div className="company-name">{project.nextAction}</div>
                </td>
                <td className="company-sub">{project.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-stack mobile-only">
        {item.projects.map((project) => (
          <article className="mobile-card" key={project.id}>
            <div className="mobile-card-head">
              <div>
                <div className="company-name">{project.projectName}</div>
                <div className="company-sub">{formatIntakeSource(project.intakeSource)}</div>
              </div>
              <span className={`state ${project.statusTone}`}>{project.status}</span>
            </div>

            <div className="mobile-project-row">
              <span>담당자</span>
              <strong>{project.owner}</strong>
            </div>
            <div className="mobile-project-row">
              <span>다음 액션</span>
              <strong>{project.nextAction}</strong>
            </div>
            <div className="mobile-project-row subdued">
              <span>최근 업데이트</span>
              <strong>{project.updatedAt}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
