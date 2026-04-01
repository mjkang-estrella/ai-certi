import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  applyProjectDetailUpdate,
  buildExaminers,
  buildPipelineStages,
  buildSidebarSections,
  getActionItems,
  getClientCompanies,
  getDashboardProjects,
  getFollowUpProjects,
  getNewIntakeProjects,
  getProjectDetail,
  getProjectOwners,
  getProjectsByScope,
  getScheduleActionItems,
  getUnconfirmedScheduleCount,
  initialProjects,
  type ActionItem,
  type ClientListItem,
  type Examiner,
  type PipelineStage,
  type ProjectDetailOverridesById,
  type ProjectDetailRecord,
  type ProjectDetailRecordUpdate,
  type ProjectRow,
  type SidebarSection,
} from "../data/dashboard";

type DashboardDataContextValue = {
  projects: ProjectRow[];
  dashboardProjects: ProjectRow[];
  projectOwners: string[];
  clientCompanies: ClientListItem[];
  newIntakeProjects: ProjectRow[];
  followUpProjects: ProjectRow[];
  activeProjects: ProjectRow[];
  completedProjects: ProjectRow[];
  unconfirmedScheduleCount: number;
  sidebarSections: SidebarSection[];
  actionItems: ActionItem[];
  scheduleActionItems: ActionItem[];
  pipelineStages: PipelineStage[];
  examiners: Examiner[];
  getProjectDetail: (projectId: string) => ProjectDetailRecord | null;
  updateProjectDetail: (projectId: string, updates: ProjectDetailRecordUpdate) => void;
};

const DashboardDataContext = createContext<DashboardDataContextValue | null>(null);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState(initialProjects);
  const [detailOverridesById, setDetailOverridesById] = useState<ProjectDetailOverridesById>({});

  const handleUpdateProjectDetail = useCallback((projectId: string, updates: ProjectDetailRecordUpdate) => {
    setProjects((current) =>
      current.map((project) => (project.id === projectId ? applyProjectDetailUpdate(project, updates) : project)),
    );

    if (updates.dispatchSummary === undefined && updates.notes === undefined) {
      return;
    }

    setDetailOverridesById((current) => {
      const next = { ...current };
      const previous = next[projectId] ?? {};
      const merged = {
        ...previous,
        ...(updates.dispatchSummary !== undefined ? { dispatchSummary: updates.dispatchSummary } : {}),
        ...(updates.notes !== undefined ? { notes: updates.notes } : {}),
      };

      next[projectId] = merged;
      return next;
    });
  }, []);

  const handleGetProjectDetail = useCallback(
    (projectId: string) => getProjectDetail(projectId, projects, detailOverridesById),
    [detailOverridesById, projects],
  );

  const value = useMemo<DashboardDataContextValue>(() => {
    return {
      projects,
      dashboardProjects: getDashboardProjects(projects),
      projectOwners: getProjectOwners(projects),
      clientCompanies: getClientCompanies(projects),
      newIntakeProjects: getNewIntakeProjects(projects),
      followUpProjects: getFollowUpProjects(projects),
      activeProjects: getProjectsByScope("active", projects),
      completedProjects: getProjectsByScope("completed", projects),
      unconfirmedScheduleCount: getUnconfirmedScheduleCount(projects),
      sidebarSections: buildSidebarSections(projects),
      actionItems: getActionItems(projects),
      scheduleActionItems: getScheduleActionItems(projects),
      pipelineStages: buildPipelineStages(projects),
      examiners: buildExaminers(projects),
      getProjectDetail: handleGetProjectDetail,
      updateProjectDetail: handleUpdateProjectDetail,
    };
  }, [handleGetProjectDetail, handleUpdateProjectDetail, projects]);

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error("useDashboardData must be used within DashboardDataProvider");
  }

  return context;
}
