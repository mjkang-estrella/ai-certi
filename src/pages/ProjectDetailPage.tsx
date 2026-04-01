import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDashboardData } from "../components/DashboardDataProvider";
import { DetailSectionCard } from "../components/DetailSectionCard";
import { ProjectArtifactLinks } from "../components/ProjectArtifactLinks";
import { ProjectDispatchTracker } from "../components/ProjectDispatchTracker";
import { ProjectDetailHeader } from "../components/ProjectDetailHeader";
import { ProjectNotesTimeline } from "../components/ProjectNotesTimeline";
import { ProjectSectionNav } from "../components/ProjectSectionNav";
import { ProjectStatusTimeline } from "../components/ProjectStatusTimeline";
import { ProjectTaskBoard } from "../components/ProjectTaskBoard";
import { ProjectWorkflowSummaryCard } from "../components/ProjectWorkflowSummaryCard";
import {
  CURRENT_USER_NAME,
  projectStatuses,
  type ProjectDetailNote,
  type ProjectDetailNoteKind,
  type ProjectDispatchSummary,
  type ProjectStatus,
} from "../data/dashboard";

const sections = [
  { id: "project-overview", label: "개요" },
  { id: "project-status", label: "상태" },
  { id: "project-next-actions", label: "다음 액션" },
  { id: "project-dispatch", label: "발송 / 회신" },
  { id: "project-notes", label: "메모" },
  { id: "project-artifacts", label: "자료 링크" },
  { id: "project-workflows", label: "성적서 / g4v" },
  { id: "project-tasks", label: "할 일" },
] as const;

type DispatchFormState = ProjectDispatchSummary & {
  needsReminder: boolean;
};

type NoteFormState = {
  kind: ProjectDetailNoteKind;
  title: string;
  content: string;
};

const emptyNoteForm: NoteFormState = {
  kind: "내부",
  title: "",
  content: "",
};

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function createUpdatedAtSortKey() {
  return new Date().toISOString();
}

function createLocalUpdatePatch() {
  return {
    updatedAt: "방금 수정",
    updatedAtSortKey: createUpdatedAtSortKey(),
  };
}

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectDetail, updateProjectDetail } = useDashboardData();
  const detail = useMemo(() => (projectId ? getProjectDetail(projectId) : null), [getProjectDetail, projectId]);
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [isStatusEditing, setIsStatusEditing] = useState(false);
  const [statusDraft, setStatusDraft] = useState<ProjectStatus>(detail?.status ?? projectStatuses[0]);
  const [isNextActionEditing, setIsNextActionEditing] = useState(false);
  const [nextActionDraft, setNextActionDraft] = useState(detail?.nextAction ?? "");
  const [nextActionNoteDraft, setNextActionNoteDraft] = useState(detail?.nextActionNote ?? "");
  const [isDispatchEditing, setIsDispatchEditing] = useState(false);
  const [dispatchDraft, setDispatchDraft] = useState<DispatchFormState | null>(
    detail
      ? {
          ...detail.dispatchSummary,
          needsReminder: detail.needsReminder,
        }
      : null,
  );
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState<NoteFormState>(emptyNoteForm);

  useEffect(() => {
    setActiveSection(sections[0].id);
    setIsStatusEditing(false);
    setStatusDraft(detail?.status ?? projectStatuses[0]);
    setIsNextActionEditing(false);
    setNextActionDraft(detail?.nextAction ?? "");
    setNextActionNoteDraft(detail?.nextActionNote ?? "");
    setIsDispatchEditing(false);
    setDispatchDraft(
      detail
        ? {
            ...detail.dispatchSummary,
            needsReminder: detail.needsReminder,
          }
        : null,
    );
    setIsAddingNote(false);
    setNoteDraft(emptyNoteForm);
  }, [detail]);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-25% 0px -50% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [detail]);

  if (!detail) {
    return <Navigate to="/projects?scope=active" replace />;
  }

  const applyDetailUpdate = (updates: Parameters<typeof updateProjectDetail>[1]) => {
    updateProjectDetail(detail.id, { ...createLocalUpdatePatch(), ...updates });
  };

  const handleStatusSave = () => {
    applyDetailUpdate({ status: statusDraft });
    setIsStatusEditing(false);
  };

  const handleNextActionSave = () => {
    applyDetailUpdate({
      nextAction: nextActionDraft.trim(),
      nextActionNote: nextActionNoteDraft.trim(),
    });
    setIsNextActionEditing(false);
  };

  const handleDispatchSave = () => {
    if (!dispatchDraft) {
      return;
    }

    applyDetailUpdate({
      needsReminder: dispatchDraft.needsReminder,
      dispatchSummary: {
        quoteSentAt: dispatchDraft.quoteSentAt || null,
        applicationSentAt: dispatchDraft.applicationSentAt || null,
        latestReplyStatus: dispatchDraft.latestReplyStatus,
        reminderDueAt: dispatchDraft.reminderDueAt.trim() || "미설정",
        lastFollowUpNote: dispatchDraft.lastFollowUpNote.trim(),
      },
    });
    setIsDispatchEditing(false);
  };

  const handleNoteSave = () => {
    const title = noteDraft.title.trim();
    const content = noteDraft.content.trim();

    if (!title || !content) {
      return;
    }

    const nextNote: ProjectDetailNote = {
      id: `${detail.id}-note-${Date.now()}`,
      kind: noteDraft.kind,
      title,
      content,
      author: CURRENT_USER_NAME,
      createdAt: "방금 추가",
    };

    applyDetailUpdate({
      notes: [nextNote, ...detail.notes],
    });
    setIsAddingNote(false);
    setNoteDraft(emptyNoteForm);
  };

  const highlightedTasks = detail.tasks.filter((task) => task.status === "todo").slice(0, 3);

  return (
    <section className="project-detail-page">
      <ProjectDetailHeader detail={detail} onJump={scrollToSection} />

      <div className="project-detail-layout">
        <ProjectSectionNav sections={[...sections]} activeSection={activeSection} onJump={scrollToSection} />

        <div className="project-detail-content">
          <DetailSectionCard
            id="project-overview"
            title="개요"
            description="기본 정보, 담당 맥락, 이번 화면에서 먼저 볼 포인트를 정리합니다."
          >
            <div className="project-overview-grid">
              <div className="project-overview-card emphasis">
                <span>운영 메모</span>
                <strong>{detail.coordinatorNote}</strong>
                <p>{detail.requestedOutcome}</p>
              </div>
              <div className="project-overview-card">
                <span>기업 담당자</span>
                <strong>{detail.client.contactName}</strong>
                <p>
                  {detail.client.email} · {detail.client.phone}
                </p>
              </div>
              <div className="project-overview-card">
                <span>사업자등록번호</span>
                <strong>{detail.client.businessNumber ?? "미등록"}</strong>
                <p>{detail.requestedAt}</p>
              </div>
              <div className="project-overview-card">
                <span>최근 업데이트</span>
                <strong>{detail.updatedAt}</strong>
                <p>{detail.nextActionNote}</p>
              </div>
            </div>
          </DetailSectionCard>

          <DetailSectionCard
            id="project-status"
            title="상태"
            description="표준 상태 흐름과 현재 단계의 맥락을 함께 봅니다."
            actions={
              isStatusEditing ? (
                <button type="button" className="button ghost detail-inline-button" onClick={() => {
                  setIsStatusEditing(false);
                  setStatusDraft(detail.status);
                }}>
                  취소
                </button>
              ) : (
                <button type="button" className="button ghost detail-inline-button" onClick={() => setIsStatusEditing(true)}>
                  상태 수정
                </button>
              )
            }
          >
            {isStatusEditing ? (
              <div className="detail-edit-panel">
                <div className="detail-form-grid">
                  <label className="detail-field">
                    <span>현재 상태</span>
                    <select value={statusDraft} onChange={(event) => setStatusDraft(event.target.value as ProjectStatus)}>
                      {projectStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="detail-form-actions">
                  <button type="button" className="button ghost detail-inline-button" onClick={() => {
                    setIsStatusEditing(false);
                    setStatusDraft(detail.status);
                  }}>
                    취소
                  </button>
                  <button type="button" className="button primary detail-inline-button" onClick={handleStatusSave}>
                    저장
                  </button>
                </div>
              </div>
            ) : null}
            <ProjectStatusTimeline detail={detail} />
          </DetailSectionCard>

          <DetailSectionCard
            id="project-next-actions"
            title="다음 액션"
            description="당장 처리해야 하는 운영 포인트를 먼저 보여줍니다."
            actions={
              isNextActionEditing ? (
                <button type="button" className="button ghost detail-inline-button" onClick={() => {
                  setIsNextActionEditing(false);
                  setNextActionDraft(detail.nextAction);
                  setNextActionNoteDraft(detail.nextActionNote);
                }}>
                  취소
                </button>
              ) : (
                <button type="button" className="button ghost detail-inline-button" onClick={() => setIsNextActionEditing(true)}>
                  수정
                </button>
              )
            }
          >
            {isNextActionEditing ? (
              <div className="detail-edit-panel">
                <div className="detail-form-grid">
                  <label className="detail-field">
                    <span>다음 액션</span>
                    <input value={nextActionDraft} onChange={(event) => setNextActionDraft(event.target.value)} />
                  </label>
                  <label className="detail-field detail-field-wide">
                    <span>메모</span>
                    <textarea value={nextActionNoteDraft} onChange={(event) => setNextActionNoteDraft(event.target.value)} rows={3} />
                  </label>
                </div>
                <div className="detail-form-actions">
                  <button type="button" className="button ghost detail-inline-button" onClick={() => {
                    setIsNextActionEditing(false);
                    setNextActionDraft(detail.nextAction);
                    setNextActionNoteDraft(detail.nextActionNote);
                  }}>
                    취소
                  </button>
                  <button
                    type="button"
                    className="button primary detail-inline-button"
                    onClick={handleNextActionSave}
                    disabled={!nextActionDraft.trim() || !nextActionNoteDraft.trim()}
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : null}
            <div className="project-next-actions-grid">
              <div className="project-next-actions-primary">
                <span className="mini-flag danger">우선 확인</span>
                <strong>{detail.nextAction}</strong>
                <p>{detail.nextActionNote}</p>
              </div>
              <div className="project-next-actions-list">
                {highlightedTasks.map((task) => (
                  <article className="project-next-action-card" key={task.id}>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <div className="project-task-footer">
                      <span>{task.owner}</span>
                      <span>{task.dueText}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </DetailSectionCard>

          <DetailSectionCard
            id="project-dispatch"
            title="견적 / 신청서 / 회신"
            description="발송 기록과 최근 회신, 리마인더 상태를 별도 블록으로 추적합니다."
            actions={
              isDispatchEditing ? (
                <button
                  type="button"
                  className="button ghost detail-inline-button"
                  onClick={() => {
                    setIsDispatchEditing(false);
                    setDispatchDraft({
                      ...detail.dispatchSummary,
                      needsReminder: detail.needsReminder,
                    });
                  }}
                >
                  취소
                </button>
              ) : (
                <button type="button" className="button ghost detail-inline-button" onClick={() => setIsDispatchEditing(true)}>
                  기록 수정
                </button>
              )
            }
          >
            {isDispatchEditing && dispatchDraft ? (
              <div className="detail-edit-panel">
                <div className="detail-form-grid">
                  <label className="detail-field">
                    <span>견적서 발송일</span>
                    <input
                      value={dispatchDraft.quoteSentAt ?? ""}
                      onChange={(event) =>
                        setDispatchDraft((current) => (current ? { ...current, quoteSentAt: event.target.value } : current))
                      }
                      placeholder="예: 3월 13일 14:00"
                    />
                  </label>
                  <label className="detail-field">
                    <span>신청 의뢰서 발송일</span>
                    <input
                      value={dispatchDraft.applicationSentAt ?? ""}
                      onChange={(event) =>
                        setDispatchDraft((current) => (current ? { ...current, applicationSentAt: event.target.value } : current))
                      }
                      placeholder="예: 3월 13일 14:05"
                    />
                  </label>
                  <label className="detail-field">
                    <span>최근 회신 상태</span>
                    <select
                      value={dispatchDraft.latestReplyStatus}
                      onChange={(event) =>
                        setDispatchDraft((current) =>
                          current
                            ? {
                                ...current,
                                latestReplyStatus: event.target.value as ProjectDispatchSummary["latestReplyStatus"],
                              }
                            : current,
                        )
                      }
                    >
                      <option value="회신 대기">회신 대기</option>
                      <option value="일부 회신">일부 회신</option>
                      <option value="회신 완료">회신 완료</option>
                      <option value="추가 확인 필요">추가 확인 필요</option>
                    </select>
                  </label>
                  <label className="detail-field">
                    <span>리마인더 기준일</span>
                    <input
                      value={dispatchDraft.reminderDueAt}
                      onChange={(event) =>
                        setDispatchDraft((current) => (current ? { ...current, reminderDueAt: event.target.value } : current))
                      }
                    />
                  </label>
                  <label className="detail-field detail-field-wide">
                    <span>마지막 후속 조치 메모</span>
                    <textarea
                      value={dispatchDraft.lastFollowUpNote}
                      onChange={(event) =>
                        setDispatchDraft((current) => (current ? { ...current, lastFollowUpNote: event.target.value } : current))
                      }
                      rows={3}
                    />
                  </label>
                  <label className="detail-toggle-field">
                    <input
                      type="checkbox"
                      checked={dispatchDraft.needsReminder}
                      onChange={(event) =>
                        setDispatchDraft((current) => (current ? { ...current, needsReminder: event.target.checked } : current))
                      }
                    />
                    <span>리마인더 필요 상태로 표시</span>
                  </label>
                </div>
                <div className="detail-form-actions">
                  <button
                    type="button"
                    className="button ghost detail-inline-button"
                    onClick={() => {
                      setIsDispatchEditing(false);
                      setDispatchDraft({
                        ...detail.dispatchSummary,
                        needsReminder: detail.needsReminder,
                      });
                    }}
                  >
                    취소
                  </button>
                  <button type="button" className="button primary detail-inline-button" onClick={handleDispatchSave}>
                    저장
                  </button>
                </div>
              </div>
            ) : null}
            <ProjectDispatchTracker summary={detail.dispatchSummary} needsReminder={detail.needsReminder} />
          </DetailSectionCard>

          <DetailSectionCard
            id="project-notes"
            title="상담 / 내부 메모"
            description="최근 의사결정과 공유 메모를 타임라인으로 확인합니다."
            actions={
              isAddingNote ? (
                <button
                  type="button"
                  className="button ghost detail-inline-button"
                  onClick={() => {
                    setIsAddingNote(false);
                    setNoteDraft(emptyNoteForm);
                  }}
                >
                  취소
                </button>
              ) : (
                <button type="button" className="button ghost detail-inline-button" onClick={() => setIsAddingNote(true)}>
                  메모 추가
                </button>
              )
            }
          >
            {isAddingNote ? (
              <div className="detail-edit-panel">
                <div className="detail-form-grid">
                  <label className="detail-field">
                    <span>메모 종류</span>
                    <select
                      value={noteDraft.kind}
                      onChange={(event) =>
                        setNoteDraft((current) => ({ ...current, kind: event.target.value as ProjectDetailNoteKind }))
                      }
                    >
                      <option value="상담">상담</option>
                      <option value="내부">내부</option>
                      <option value="회의">회의</option>
                    </select>
                  </label>
                  <label className="detail-field detail-field-wide">
                    <span>제목</span>
                    <input
                      value={noteDraft.title}
                      onChange={(event) => setNoteDraft((current) => ({ ...current, title: event.target.value }))}
                    />
                  </label>
                  <label className="detail-field detail-field-wide">
                    <span>내용</span>
                    <textarea
                      value={noteDraft.content}
                      onChange={(event) => setNoteDraft((current) => ({ ...current, content: event.target.value }))}
                      rows={4}
                    />
                  </label>
                </div>
                <div className="detail-form-actions">
                  <button
                    type="button"
                    className="button ghost detail-inline-button"
                    onClick={() => {
                      setIsAddingNote(false);
                      setNoteDraft(emptyNoteForm);
                    }}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="button primary detail-inline-button"
                    onClick={handleNoteSave}
                    disabled={!noteDraft.title.trim() || !noteDraft.content.trim()}
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : null}
            <ProjectNotesTimeline notes={detail.notes} />
          </DetailSectionCard>

          <DetailSectionCard
            id="project-artifacts"
            title="자료 링크"
            description="접수 자료, 시험 증적, 성적서 작업 링크를 한 번에 봅니다."
          >
            <ProjectArtifactLinks items={detail.artifactLinks} />
          </DetailSectionCard>

          <DetailSectionCard
            id="project-workflows"
            title="성적서 / g4v"
            description="후반 운영 흐름을 카드 두 장으로 나눠서 추적합니다."
          >
            <div className="project-workflow-grid">
              <ProjectWorkflowSummaryCard item={detail.reportWorkflow} />
              <ProjectWorkflowSummaryCard item={detail.g4vWorkflow} />
            </div>
          </DetailSectionCard>

          <DetailSectionCard
            id="project-tasks"
            title="할 일"
            description="해야 할 일과 완료된 작업을 분리해 운영 우선순위를 관리합니다."
          >
            <ProjectTaskBoard tasks={detail.tasks} />
          </DetailSectionCard>
        </div>
      </div>
    </section>
  );
}
