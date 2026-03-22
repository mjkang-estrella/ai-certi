import { projects } from "../data/dashboard";

export function ProjectsTable() {
  return (
    <section className="projects card">
      <div className="section-head">
        <div>
          <h2 className="section-title">진행중 프로젝트</h2>
          <p className="section-copy">최근 접수가 아니라 현재 움직이고 있는 건을 우선 노출한다.</p>
        </div>
        <div className="section-link">전체 프로젝트 보기</div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>기업 / 프로젝트</th>
              <th>현재 상태</th>
              <th>담당자</th>
              <th>다음 액션</th>
              <th>최근 업데이트</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={`${project.company}-${project.project}`}>
                <td>
                  <div className="company-name">{project.company}</div>
                  <div className="company-sub">{project.project}</div>
                </td>
                <td>
                  <span className={`state ${project.stateTone}`}>{project.state}</span>
                </td>
                <td>
                  <div className="company-name">{project.owner}</div>
                  <div className="company-sub">{project.ownerRole}</div>
                </td>
                <td>
                  <div className="company-name">{project.nextAction}</div>
                  <div className="company-sub">{project.nextActionNote}</div>
                </td>
                <td className="company-sub">{project.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

