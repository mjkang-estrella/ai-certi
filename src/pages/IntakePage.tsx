import { Link, useNavigate } from "react-router-dom";
import { useDashboardData } from "../components/DashboardDataProvider";
import { type IntakeSource, type ProjectRow } from "../data/dashboard";

type IntakeSectionProps = {
  title: string;
  description: string;
  items: ProjectRow[];
};

function formatIntakeSource(source: IntakeSource) {
  return source === "web" ? "웹 접수" : "전화 접수";
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("a, button, input, label, select, textarea"));
}

function sortQueueProjects(items: ProjectRow[], prioritizePhoneOnTie = false) {
  return [...items].sort((left, right) => {
    const updatedAtDiff = Date.parse(right.updatedAtSortKey) - Date.parse(left.updatedAtSortKey);

    if (updatedAtDiff !== 0) {
      return updatedAtDiff;
    }

    if (!prioritizePhoneOnTie) {
      return 0;
    }

    if (left.intakeSource === right.intakeSource) {
      return 0;
    }

    return left.intakeSource === "phone" ? -1 : 1;
  });
}

function IntakeSection({ title, description, items }: IntakeSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="card queue-section-card">
      <div className="section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">
            {description} · {items.length}건
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="project-empty-state">현재 이 섹션에 표시할 프로젝트가 없습니다.</div>
      ) : (
        <>
          <div className="table-wrap desktop-only">
            <table>
              <thead>
                <tr>
                  <th scope="col">기업 / 프로젝트</th>
                  <th scope="col">현재 상태</th>
                  <th scope="col">유입경로</th>
                  <th scope="col">담당자</th>
                  <th scope="col">다음 액션</th>
                  <th scope="col">최근 업데이트</th>
                </tr>
              </thead>
              <tbody>
                {items.map((project) => (
                  <tr
                    key={`${title}-${project.id}`}
                    className="clickable-row"
                    role="link"
                    tabIndex={0}
                    onClick={(event) => {
                      if (!isInteractiveTarget(event.target)) {
                        navigate(`/projects/${project.id}`);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/projects/${project.id}`);
                      }
                    }}
                  >
                    <td>
                      <div className="company-name">{project.company}</div>
                      <Link className="table-link" to={`/projects/${project.id}`}>
                        {project.project}
                      </Link>
                    </td>
                    <td>
                      <span className={`state ${project.statusTone}`}>{project.status}</span>
                    </td>
                    <td className="company-sub">{formatIntakeSource(project.intakeSource)}</td>
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
            {items.map((project) => (
              <article
                className="mobile-card clickable-card"
                key={`${title}-mobile-${project.id}`}
                role="link"
                tabIndex={0}
                onClick={(event) => {
                  if (!isInteractiveTarget(event.target)) {
                    navigate(`/projects/${project.id}`);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/projects/${project.id}`);
                  }
                }}
              >
                <div className="mobile-card-head">
                  <div>
                    <div className="company-name">{project.company}</div>
                    <Link className="table-link" to={`/projects/${project.id}`}>
                      {project.project}
                    </Link>
                  </div>
                  <span className={`state ${project.statusTone}`}>{project.status}</span>
                </div>

                <div className="mobile-project-row subdued">
                  <span>유입경로</span>
                  <strong>{formatIntakeSource(project.intakeSource)}</strong>
                </div>
                <div className="mobile-project-row">
                  <span>담당자</span>
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
                  <span>최근 업데이트</span>
                  <strong>{project.updatedAt}</strong>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export function IntakePage() {
  const { followUpProjects, newIntakeProjects } = useDashboardData();
  const sortedNewIntakeProjects = sortQueueProjects(newIntakeProjects, true);
  const sortedFollowUpProjects = sortQueueProjects(followUpProjects);

  return (
    <section className="intake-page">
      <section className="summary-grid">
        <article className="summary-stat-card">
          <span className="summary-stat-label">신규 접수</span>
          <strong className="summary-stat-value">{newIntakeProjects.length}</strong>
          <p className="summary-stat-copy">현재 상태가 접수인 프로젝트를 바로 정리합니다.</p>
        </article>
        <article className="summary-stat-card danger">
          <span className="summary-stat-label">팔로업 필요</span>
          <strong className="summary-stat-value">{followUpProjects.length}</strong>
          <p className="summary-stat-copy">리마인더가 필요한 진행중 프로젝트를 함께 점검합니다.</p>
        </article>
      </section>

      <div className="intake-sections">
        <IntakeSection
          title="신규 접수 목록"
          description="새로 들어온 건을 먼저 확인합니다. 동일 시간대에서는 전화 접수를 우선 노출합니다."
          items={sortedNewIntakeProjects}
        />
        <IntakeSection
          title="팔로업 큐"
          description="회신 지연이나 완료 전 확인이 필요한 프로젝트를 따로 모아 봅니다."
          items={sortedFollowUpProjects}
        />
      </div>
    </section>
  );
}
