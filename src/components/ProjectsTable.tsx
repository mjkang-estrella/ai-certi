import { Link } from "react-router-dom";
import { dashboardProjects, projects } from "../data/dashboard";

export function ProjectsTable() {
  const activeProjects = projects.filter((project) => !project.isCompleted);

  return (
    <section className="projects card">
      <div className="section-head">
        <div>
          <h2 className="section-title">진행중 프로젝트</h2>
          <p className="section-copy">현재 진행 {activeProjects.length}건</p>
        </div>
        <Link className="button ghost section-link" to="/projects">
          전체 보기
        </Link>
      </div>

      <div className="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th scope="col">기업 / 프로젝트</th>
              <th scope="col">현재 상태</th>
              <th scope="col">시험원</th>
              <th scope="col">다음 액션</th>
              <th scope="col">최근 업데이트</th>
            </tr>
          </thead>
          <tbody>
            {dashboardProjects.map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="company-name">{project.company}</div>
                  <div className="company-sub">{project.project}</div>
                </td>
                <td>
                  <span className={`state ${project.statusTone}`}>{project.status}</span>
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

      <div className="mobile-stack mobile-only">
        {dashboardProjects.map((project) => (
          <article className="mobile-card" key={project.id}>
            <div className="mobile-card-head">
              <div>
                <div className="company-name">{project.company}</div>
                <div className="company-sub">{project.project}</div>
              </div>
              <span className={`state ${project.statusTone}`}>{project.status}</span>
            </div>

            <div className="mobile-project-row">
              <span>시험원</span>
              <strong>{project.owner}</strong>
            </div>
            <div className="mobile-project-row subdued">
              <span>역할</span>
              <strong>{project.ownerRole}</strong>
            </div>
            <div className="mobile-project-row">
              <span>다음 액션</span>
              <strong>{project.nextAction}</strong>
            </div>
            <div className="mobile-project-row subdued">
              <span>메모</span>
              <strong>{project.nextActionNote}</strong>
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
