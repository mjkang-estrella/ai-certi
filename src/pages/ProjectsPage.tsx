import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import type { AppShellOutletContext } from "../components/AppShell";
import {
  CURRENT_USER_NAME,
  projectOwners,
  projects,
  projectStatuses,
  type IntakeSource,
  type ProjectRow,
  type ProjectStatus,
} from "../data/dashboard";

type ProjectScope = "all" | "active" | "completed";

type ProjectFilters = {
  selectedOwners: string[];
  scope: ProjectScope;
  selectedStatuses: ProjectStatus[];
  reminderOnly: boolean;
};

const initialFilters: ProjectFilters = {
  selectedOwners: [],
  scope: "all",
  selectedStatuses: [],
  reminderOnly: false,
};

function includesSearch(value: string, query: string) {
  return value.toLowerCase().includes(query);
}

function formatIntakeSource(source: IntakeSource) {
  return source === "web" ? "웹 접수" : "전화 접수";
}

function getProjectSortRank(project: ProjectRow) {
  if (project.owner === CURRENT_USER_NAME && !project.isCompleted) {
    return 0;
  }

  if (!project.isCompleted) {
    return 1;
  }

  return 2;
}

function sortProjects(items: ProjectRow[]) {
  return [...items].sort((left, right) => {
    const rankDiff = getProjectSortRank(left) - getProjectSortRank(right);

    if (rankDiff !== 0) {
      return rankDiff;
    }

    return Date.parse(right.updatedAtSortKey) - Date.parse(left.updatedAtSortKey);
  });
}

function matchesScope(project: ProjectRow, scope: ProjectScope) {
  if (scope === "active") {
    return !project.isCompleted;
  }

  if (scope === "completed") {
    return project.isCompleted;
  }

  return true;
}

function matchesSearch(project: ProjectRow, query: string) {
  if (!query) {
    return true;
  }

  return (
    includesSearch(project.company, query) ||
    includesSearch(project.project, query) ||
    includesSearch(project.owner, query)
  );
}

function buildActiveFilters(filters: ProjectFilters, search: string) {
  const items: string[] = [];

  if (filters.scope === "active") {
    items.push("진행중만");
  }

  if (filters.scope === "completed") {
    items.push("완료만");
  }

  if (filters.selectedOwners.length > 0) {
    items.push(...filters.selectedOwners.map((owner) => `담당자 ${owner}`));
  }

  if (filters.reminderOnly) {
    items.push("리마인더 필요");
  }

  if (filters.selectedStatuses.length > 0) {
    items.push(...filters.selectedStatuses);
  }

  if (search) {
    items.push(`검색: ${search}`);
  }

  return items;
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("a, button, input, label, select, textarea"));
}

export function ProjectsPage() {
  const navigate = useNavigate();
  const { projectSearch, setProjectSearch } = useOutletContext<AppShellOutletContext>();
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);
  const [openMenu, setOpenMenu] = useState<"status" | "owner" | null>(null);
  const filterMenuRef = useRef<HTMLElement | null>(null);

  const normalizedQuery = projectSearch.trim().toLowerCase();
  const activeFilters = buildActiveFilters(filters, projectSearch.trim());

  const filteredProjects = sortProjects(
    projects.filter((project) => {
      if (!matchesScope(project, filters.scope)) {
        return false;
      }

      if (filters.selectedOwners.length > 0 && !filters.selectedOwners.includes(project.owner)) {
        return false;
      }

      if (filters.reminderOnly && !project.needsReminder) {
        return false;
      }

      if (filters.selectedStatuses.length > 0 && !filters.selectedStatuses.includes(project.status)) {
        return false;
      }

      return matchesSearch(project, normalizedQuery);
    }),
  );

  const clearFilters = () => {
    setFilters(initialFilters);
    setProjectSearch("");
  };

  const toggleStatus = (status: ProjectStatus) => {
    setFilters((current) => ({
      ...current,
      selectedStatuses: current.selectedStatuses.includes(status)
        ? current.selectedStatuses.filter((item) => item !== status)
        : [...current.selectedStatuses, status],
    }));
  };

  const toggleOwner = (owner: string) => {
    setFilters((current) => ({
      ...current,
      selectedOwners: current.selectedOwners.includes(owner)
        ? current.selectedOwners.filter((item) => item !== owner)
        : [...current.selectedOwners, owner],
    }));
  };

  const navigateToProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!filterMenuRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openMenu]);

  return (
    <section className="project-management">
      <section className="card project-filter-card" ref={filterMenuRef}>
        <div className="section-head">
          <div>
            <h2 className="section-title">프로젝트 목록</h2>
            <p className="section-copy">
              결과 {filteredProjects.length}건 · 내 담당 진행중 프로젝트와 진행중 프로젝트가 먼저 보이도록 정렬합니다.
            </p>
          </div>
          <button className="button ghost" type="button" onClick={clearFilters}>
            필터 초기화
          </button>
        </div>

        <div className="project-list-toolbar">
          <div className="project-segmented">
            {[
              { value: "all", label: "전체" },
              { value: "active", label: "진행중" },
              { value: "completed", label: "완료" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                className={`filter-chip${filters.scope === item.value ? " active" : ""}`}
                onClick={() => setFilters((current) => ({ ...current, scope: item.value as ProjectScope }))}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="project-toolbar-side">
            <label className="project-toggle">
              <input
                checked={filters.reminderOnly}
                type="checkbox"
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    reminderOnly: event.target.checked,
                  }))
                }
              />
              <span>리마인더 필요만</span>
            </label>

            <div className="project-header-filter mobile-only-inline">
              <button
                type="button"
                className={`table-filter-trigger${openMenu === "status" ? " active" : ""}`}
                onClick={() => setOpenMenu((current) => (current === "status" ? null : "status"))}
              >
                현재 상태
              </button>
              {openMenu === "status" ? (
                <div className="table-filter-menu">
                  {projectStatuses.map((status) => (
                    <label className="table-filter-option" key={status}>
                      <input
                        type="checkbox"
                        checked={filters.selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="project-header-filter mobile-only-inline">
              <button
                type="button"
                className={`table-filter-trigger${openMenu === "owner" ? " active" : ""}`}
                onClick={() => setOpenMenu((current) => (current === "owner" ? null : "owner"))}
              >
                담당자
              </button>
              {openMenu === "owner" ? (
                <div className="table-filter-menu">
                  {projectOwners.map((owner) => (
                    <label className="table-filter-option" key={owner}>
                      <input
                        type="checkbox"
                        checked={filters.selectedOwners.includes(owner)}
                        onChange={() => toggleOwner(owner)}
                      />
                      <span>{owner}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="project-active-filters">
          <span className="project-filter-label">현재 조건</span>
          {activeFilters.length === 0 ? (
            <p className="project-empty-inline">적용된 추가 필터가 없습니다. 전체 프로젝트를 기본 정렬로 보여줍니다.</p>
          ) : (
            <div className="project-active-filter-list">
              {activeFilters.map((item) => (
                <span className="project-active-filter-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="project-empty-state">
            조건에 맞는 프로젝트가 없습니다. 상태나 담당자 필터를 줄이거나 검색어를 다시 확인해 주세요.
          </div>
        ) : (
          <>
            <div className="table-wrap desktop-only">
              <table>
                <thead>
                  <tr>
                    <th scope="col">기업 / 프로젝트</th>
                    <th scope="col">
                      <div className="project-header-filter">
                        <button
                          type="button"
                          className={`table-filter-trigger${openMenu === "status" ? " active" : ""}`}
                          onClick={() => setOpenMenu((current) => (current === "status" ? null : "status"))}
                        >
                          현재 상태
                        </button>
                        {openMenu === "status" ? (
                          <div className="table-filter-menu">
                            {projectStatuses.map((status) => (
                              <label className="table-filter-option" key={status}>
                                <input
                                  type="checkbox"
                                  checked={filters.selectedStatuses.includes(status)}
                                  onChange={() => toggleStatus(status)}
                                />
                                <span>{status}</span>
                              </label>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </th>
                    <th scope="col">
                      <div className="project-header-filter">
                        <button
                          type="button"
                          className={`table-filter-trigger${openMenu === "owner" ? " active" : ""}`}
                          onClick={() => setOpenMenu((current) => (current === "owner" ? null : "owner"))}
                        >
                          담당자
                        </button>
                        {openMenu === "owner" ? (
                          <div className="table-filter-menu">
                            {projectOwners.map((owner) => (
                              <label className="table-filter-option" key={owner}>
                                <input
                                  type="checkbox"
                                  checked={filters.selectedOwners.includes(owner)}
                                  onChange={() => toggleOwner(owner)}
                                />
                                <span>{owner}</span>
                              </label>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </th>
                    <th scope="col">유입경로</th>
                    <th scope="col">다음 액션</th>
                    <th scope="col">최근 업데이트</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="clickable-row"
                      role="link"
                      tabIndex={0}
                      onClick={(event) => {
                        if (!isInteractiveTarget(event.target)) {
                          navigateToProject(project.id);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigateToProject(project.id);
                        }
                      }}
                    >
                      <td>
                        <div className="company-name">{project.company}</div>
                        <Link className="table-link" to={`/projects/${project.id}`}>{project.project}</Link>
                        {project.needsReminder ? <span className="mini-flag danger">리마인더</span> : null}
                      </td>
                      <td>
                        <span className={`state ${project.statusTone}`}>{project.status}</span>
                      </td>
                      <td>
                        <div className="company-name">{project.owner}</div>
                        <div className="company-sub">{project.ownerRole}</div>
                      </td>
                      <td className="company-sub">{formatIntakeSource(project.intakeSource)}</td>
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
              {filteredProjects.map((project) => (
                <article
                  className="mobile-card clickable-card"
                  key={project.id}
                  role="link"
                  tabIndex={0}
                  onClick={(event) => {
                    if (!isInteractiveTarget(event.target)) {
                      navigateToProject(project.id);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigateToProject(project.id);
                    }
                  }}
                >
                  <div className="mobile-card-head">
                    <div>
                      <div className="company-name">{project.company}</div>
                      <Link className="table-link" to={`/projects/${project.id}`}>{project.project}</Link>
                    </div>
                    <span className={`state ${project.statusTone}`}>{project.status}</span>
                  </div>

                  {project.needsReminder ? <span className="mini-flag danger">리마인더 필요</span> : null}

                  <div className="mobile-project-row">
                    <span>담당자</span>
                    <strong>{project.owner}</strong>
                  </div>
                  <div className="mobile-project-row subdued">
                    <span>역할</span>
                    <strong>{project.ownerRole}</strong>
                  </div>
                  <div className="mobile-project-row subdued">
                    <span>유입경로</span>
                    <strong>{formatIntakeSource(project.intakeSource)}</strong>
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
          </>
        )}
      </section>
    </section>
  );
}
