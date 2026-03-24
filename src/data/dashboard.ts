export type SidebarItem = {
  label: string;
  href: string;
  badge?: string;
  tone?: "default" | "danger";
};

export type BannerMetric = {
  label: string;
  value: string;
  sub: string;
};

export type PipelineStage = {
  title: string;
  metrics: BannerMetric[];
};

export type Examiner = {
  name: string;
  role: string;
  counts: {
    coordination: number;
    testing: number;
    reporting: number;
    issued: number;
    submitted: number;
    completed: number;
  };
};

export type ActionItem = {
  priority: "긴급" | "검토" | "일정" | "추적";
  tone: "danger" | "warn";
  title: string;
  description: string;
  count: string;
  hint: string;
};

export type ProjectStateTone = "in-progress" | "review" | "done";
export type IntakeSource = "web" | "phone";
export type ProjectStatus =
  | "접수"
  | "상담중"
  | "견적/신청서 발송"
  | "회신대기"
  | "시험원배정"
  | "시험협의중"
  | "시험진행중"
  | "성적서초안"
  | "내부검토"
  | "고객검토"
  | "최종확정"
  | "g4v업로드"
  | "완료";

export type ProjectRow = {
  id: string;
  companyId: string;
  company: string;
  project: string;
  status: ProjectStatus;
  statusTone: ProjectStateTone;
  owner: string;
  ownerRole: string;
  intakeSource: IntakeSource;
  nextAction: string;
  nextActionNote: string;
  updatedAt: string;
  updatedAtSortKey: string;
  needsReminder: boolean;
  isCompleted: boolean;
};

export type ClientRecord = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  businessNumber?: string;
};

export type ClientProjectSummary = {
  id: string;
  projectName: string;
  status: ProjectStatus;
  statusTone: ProjectStateTone;
  owner: string;
  intakeSource: IntakeSource;
  nextAction: string;
  updatedAt: string;
};

export type ClientListItem = {
  client: ClientRecord;
  projectCount: number;
  activeProjectCount: number;
  latestProjectAt: string;
  projects: ClientProjectSummary[];
};

export type InfoItem = {
  title: string;
  description: string;
};

type ProjectStatusMeta = {
  tone: ProjectStateTone;
  isCompleted: boolean;
};

type ProjectSeed = Omit<ProjectRow, "statusTone" | "isCompleted">;

export const CURRENT_USER_NAME = "이서준";

export const projectStatuses: ProjectStatus[] = [
  "접수",
  "상담중",
  "견적/신청서 발송",
  "회신대기",
  "시험원배정",
  "시험협의중",
  "시험진행중",
  "성적서초안",
  "내부검토",
  "고객검토",
  "최종확정",
  "g4v업로드",
  "완료",
];

export const projectStatusMeta: Record<ProjectStatus, ProjectStatusMeta> = {
  접수: { tone: "in-progress", isCompleted: false },
  상담중: { tone: "in-progress", isCompleted: false },
  "견적/신청서 발송": { tone: "in-progress", isCompleted: false },
  회신대기: { tone: "in-progress", isCompleted: false },
  시험원배정: { tone: "in-progress", isCompleted: false },
  시험협의중: { tone: "in-progress", isCompleted: false },
  시험진행중: { tone: "in-progress", isCompleted: false },
  성적서초안: { tone: "review", isCompleted: false },
  내부검토: { tone: "review", isCompleted: false },
  고객검토: { tone: "review", isCompleted: false },
  최종확정: { tone: "done", isCompleted: false },
  g4v업로드: { tone: "done", isCompleted: false },
  완료: { tone: "done", isCompleted: true },
};

const clientRecords: ClientRecord[] = [
  {
    id: "neologics",
    companyName: "네오로직스",
    contactName: "정소연",
    email: "sy.jeong@neologics.co.kr",
    phone: "02-6012-1098",
    businessNumber: "214-88-01942",
  },
  {
    id: "techwave",
    companyName: "테크웨이브",
    contactName: "이준호",
    email: "jh.lee@techwave.ai",
    phone: "031-778-4420",
    businessNumber: "129-86-44712",
  },
  {
    id: "bluesense",
    companyName: "블루센스",
    contactName: "김다은",
    email: "contact@bluesense.kr",
    phone: "070-4112-7788",
  },
  {
    id: "aimedics",
    companyName: "AI메딕스",
    contactName: "윤세영",
    email: "sy.yoon@aimedics.ai",
    phone: "02-512-9081",
    businessNumber: "110-81-77231",
  },
  {
    id: "medibridge",
    companyName: "메디브릿지",
    contactName: "한지민",
    email: "jm.han@medibridge.co.kr",
    phone: "02-4421-5090",
  },
  {
    id: "quantuminsight",
    companyName: "퀀텀인사이트",
    contactName: "서동현",
    email: "dh.seo@quantuminsight.ai",
    phone: "031-995-2280",
    businessNumber: "321-88-55102",
  },
  {
    id: "lucidware",
    companyName: "루시드웨어",
    contactName: "임가영",
    email: "gy.lim@lucidware.kr",
    phone: "070-5230-8812",
  },
];

const projectSeeds: ProjectSeed[] = [
  {
    id: "neologics-medical-ai",
    companyId: "neologics",
    company: "네오로직스",
    project: "의료 AI 모델 안전성 검증",
    status: "내부검토",
    owner: "이서준",
    ownerRole: "성적서 담당",
    intakeSource: "web",
    nextAction: "사장님 검토 반영",
    nextActionNote: "오늘 17:00 전",
    updatedAt: "오늘 11:24",
    updatedAtSortKey: "2026-03-23T11:24:00+09:00",
    needsReminder: false,
  },
  {
    id: "techwave-security",
    companyId: "techwave",
    company: "테크웨이브",
    project: "S/W 취약점 및 운영환경 검증",
    status: "회신대기",
    owner: "박지은",
    ownerRole: "상담 / 견적",
    intakeSource: "web",
    nextAction: "팔로업 메일 초안 검토",
    nextActionNote: "3일 초과",
    updatedAt: "어제 15:10",
    updatedAtSortKey: "2026-03-22T15:10:00+09:00",
    needsReminder: true,
  },
  {
    id: "bluesense-vision",
    companyId: "bluesense",
    company: "블루센스",
    project: "영상 분석 모델 성능 검증",
    status: "시험진행중",
    owner: "김민수",
    ownerRole: "시험 담당",
    intakeSource: "web",
    nextAction: "시험 사진 및 증적 링크 적재",
    nextActionNote: "오늘 시험 종료 후",
    updatedAt: "오늘 09:40",
    updatedAtSortKey: "2026-03-23T09:40:00+09:00",
    needsReminder: false,
  },
  {
    id: "aimedics-inference",
    companyId: "aimedics",
    company: "AI메딕스",
    project: "추론 서버 환경 검증",
    status: "g4v업로드",
    owner: "이서준",
    ownerRole: "업로드 추적",
    intakeSource: "phone",
    nextAction: "문제 발생 여부 확인 후 완료 전환",
    nextActionNote: "내일 오전 확인",
    updatedAt: "오늘 08:12",
    updatedAtSortKey: "2026-03-23T08:12:00+09:00",
    needsReminder: true,
  },
  {
    id: "neologics-report-revision",
    companyId: "neologics",
    company: "네오로직스",
    project: "성적서 문구 보완 검토",
    status: "고객검토",
    owner: "박지은",
    ownerRole: "고객 커뮤니케이션",
    intakeSource: "phone",
    nextAction: "고객 피드백 확인",
    nextActionNote: "수정 요청 1건",
    updatedAt: "어제 16:40",
    updatedAtSortKey: "2026-03-22T16:40:00+09:00",
    needsReminder: false,
  },
  {
    id: "techwave-final-report",
    companyId: "techwave",
    company: "테크웨이브",
    project: "기존 검증 건 최종 성적서 정리",
    status: "완료",
    owner: "정하늘",
    ownerRole: "성적서 마감",
    intakeSource: "phone",
    nextAction: "완료 보관",
    nextActionNote: "이력만 유지",
    updatedAt: "3월 18일",
    updatedAtSortKey: "2026-03-18T13:30:00+09:00",
    needsReminder: false,
  },
  {
    id: "medibridge-intake",
    companyId: "medibridge",
    company: "메디브릿지",
    project: "진단 보조 모델 검증 신규 접수",
    status: "접수",
    owner: "최유진",
    ownerRole: "초기 분류",
    intakeSource: "phone",
    nextAction: "전화 상담 내용 정리",
    nextActionNote: "메모만 존재",
    updatedAt: "오늘 13:05",
    updatedAtSortKey: "2026-03-23T13:05:00+09:00",
    needsReminder: false,
  },
  {
    id: "quantuminsight-scheduling",
    companyId: "quantuminsight",
    company: "퀀텀인사이트",
    project: "대화형 AI 응답 품질 검증",
    status: "시험협의중",
    owner: "정하늘",
    ownerRole: "일정 협의",
    intakeSource: "web",
    nextAction: "시험 일정 2차 제안",
    nextActionNote: "고객 회신 지연",
    updatedAt: "오늘 10:55",
    updatedAtSortKey: "2026-03-23T10:55:00+09:00",
    needsReminder: true,
  },
  {
    id: "quantuminsight-assignment",
    companyId: "quantuminsight",
    company: "퀀텀인사이트",
    project: "모델 변경 이력 재검증",
    status: "시험원배정",
    owner: "오세진",
    ownerRole: "배정 조율",
    intakeSource: "web",
    nextAction: "시험원 일정 확정",
    nextActionNote: "내부 배정 대기",
    updatedAt: "오늘 09:12",
    updatedAtSortKey: "2026-03-23T09:12:00+09:00",
    needsReminder: false,
  },
  {
    id: "lucidware-report-draft",
    companyId: "lucidware",
    company: "루시드웨어",
    project: "추천 엔진 검증 성적서 초안",
    status: "성적서초안",
    owner: "오세진",
    ownerRole: "초안 작성",
    intakeSource: "phone",
    nextAction: "초안 문구 정합성 점검",
    nextActionNote: "표지 수정 예정",
    updatedAt: "오늘 07:48",
    updatedAtSortKey: "2026-03-23T07:48:00+09:00",
    needsReminder: false,
  },
  {
    id: "lucidware-consulting",
    companyId: "lucidware",
    company: "루시드웨어",
    project: "데이터 전처리 체계 상담",
    status: "상담중",
    owner: "박지은",
    ownerRole: "상담 담당",
    intakeSource: "web",
    nextAction: "요구사항 재확인 메일 작성",
    nextActionNote: "전화 후속 정리 필요",
    updatedAt: "오늘 12:14",
    updatedAtSortKey: "2026-03-23T12:14:00+09:00",
    needsReminder: false,
  },
  {
    id: "aimedics-finalization",
    companyId: "aimedics",
    company: "AI메딕스",
    project: "임상 적용 리스크 검증 최종확정",
    status: "최종확정",
    owner: "이서준",
    ownerRole: "최종 검수",
    intakeSource: "web",
    nextAction: "g4v 업로드 파일 정리",
    nextActionNote: "오늘 오후 제출",
    updatedAt: "오늘 10:12",
    updatedAtSortKey: "2026-03-23T10:12:00+09:00",
    needsReminder: false,
  },
];

function byUpdatedAtDesc(a: { updatedAtSortKey: string }, b: { updatedAtSortKey: string }) {
  return Date.parse(b.updatedAtSortKey) - Date.parse(a.updatedAtSortKey);
}

export const projects: ProjectRow[] = projectSeeds.map((project) => ({
  ...project,
  statusTone: projectStatusMeta[project.status].tone,
  isCompleted: projectStatusMeta[project.status].isCompleted,
}));

export const dashboardProjects = [...projects]
  .filter((project) => !project.isCompleted)
  .sort(byUpdatedAtDesc)
  .slice(0, 5);

export const projectOwners = Array.from(new Set(projects.map((project) => project.owner))).sort((a, b) =>
  a.localeCompare(b, "ko"),
);

function getLatestProjectSortKey(companyId: string) {
  return projects
    .filter((project) => project.companyId === companyId)
    .sort(byUpdatedAtDesc)[0]?.updatedAtSortKey ?? "";
}

export const clientCompanies: ClientListItem[] = clientRecords
  .map((client) => {
    const relatedProjects = projects
      .filter((project) => project.companyId === client.id)
      .sort(byUpdatedAtDesc);

    if (relatedProjects.length === 0) {
      return null;
    }

    return {
      client,
      projectCount: relatedProjects.length,
      activeProjectCount: relatedProjects.filter((project) => !project.isCompleted).length,
      latestProjectAt: relatedProjects[0].updatedAt,
      projects: relatedProjects.map((project) => ({
        id: project.id,
        projectName: project.project,
        status: project.status,
        statusTone: project.statusTone,
        owner: project.owner,
        intakeSource: project.intakeSource,
        nextAction: project.nextAction,
        updatedAt: project.updatedAt,
      })),
    };
  })
  .filter((item): item is ClientListItem => item !== null)
  .sort((a, b) => getLatestProjectSortKey(b.client.id).localeCompare(getLatestProjectSortKey(a.client.id)));

const reminderProjects = projects.filter((project) => project.needsReminder);
const unconfirmedScheduleCount = projects.filter((project) =>
  project.status === "시험원배정" || project.status === "시험협의중"
).length;
const pendingIntakeCount = projects.filter((project) =>
  project.status === "접수" && project.intakeSource === "phone"
).length;

export const sidebarSections: Array<{ label: string; items: SidebarItem[] }> = [
  {
    label: "운영",
    items: [
      { label: "운영 현황", href: "/", badge: "HOME" },
      { label: "프로젝트", href: "/projects", badge: String(projects.length) },
      { label: "기업 목록", href: "/companies", badge: String(clientCompanies.length) },
      { label: "전화 접수", href: "/#top", badge: String(pendingIntakeCount), tone: "danger" },
      { label: "성적서 관리", href: "/projects", badge: "6" },
    ],
  },
  {
    label: "지원",
    items: [
      { label: "일정 캘린더", href: "/#schedule" },
      { label: "자료 링크 관리", href: "/projects" },
      { label: "리마인더", href: "/#action-queue", badge: String(reminderProjects.length), tone: "danger" },
    ],
  },
];

export const pipelineStages: PipelineStage[] = [
  {
    title: "접수",
    metrics: [{ label: "이 달 접수", value: "43", sub: "웹 31 · 전화 12" }],
  },
  {
    title: "진행중",
    metrics: [
      { label: "시험 협의중", value: "8", sub: "일정 미확정 5건" },
      { label: "시험중", value: "14", sub: "이번 주 진행 7건" },
      { label: "성적서 작성중", value: "6", sub: "초안 4 · 내부검토 2" },
      { label: "성적서 발행", value: "4", sub: "최종확정 직후" },
      { label: "성적서 제출", value: "3", sub: "고객 전달 완료" },
    ],
  },
  {
    title: "완료",
    metrics: [{ label: "이 달 종료 / 완료", value: "11", sub: "최종 검증 완료 8건" }],
  },
];

export const examiners: Examiner[] = [
  {
    name: "김민수",
    role: "시험원 · 현장 및 시험 진행",
    counts: { coordination: 3, testing: 5, reporting: 2, issued: 1, submitted: 0, completed: 4 },
  },
  {
    name: "박지은",
    role: "시험원 · 협의 및 고객 커뮤니케이션",
    counts: { coordination: 4, testing: 2, reporting: 1, issued: 1, submitted: 1, completed: 3 },
  },
  {
    name: "이서준",
    role: "시험원 · 성적서 및 g4v 마감",
    counts: { coordination: 1, testing: 2, reporting: 4, issued: 2, submitted: 2, completed: 4 },
  },
  {
    name: "최유진",
    role: "시험원 · 프로젝트 마감 지원",
    counts: { coordination: 0, testing: 1, reporting: 2, issued: 1, submitted: 0, completed: 5 },
  },
  {
    name: "정하늘",
    role: "시험원 · 일정 협의 및 시험 지원",
    counts: { coordination: 2, testing: 3, reporting: 1, issued: 0, submitted: 1, completed: 2 },
  },
  {
    name: "오세진",
    role: "시험원 · 성적서 보조 및 마감 지원",
    counts: { coordination: 1, testing: 1, reporting: 3, issued: 2, submitted: 1, completed: 3 },
  },
];

export const actionItems: ActionItem[] = [
  {
    priority: "긴급",
    tone: "danger",
    title: "견적 발송 후 3일 이상 회신 없음",
    description: "회신대기 프로젝트 중심으로 팔로업 메일 초안 확인",
    count: String(reminderProjects.filter((project) => project.status === "회신대기").length),
    hint: "즉시 확인",
  },
  {
    priority: "검토",
    tone: "warn",
    title: "사장님 내부검토 대기 성적서",
    description: "내부검토 상태 프로젝트 우선 확인",
    count: String(projects.filter((project) => project.status === "내부검토").length),
    hint: "오늘 검토 필요",
  },
  {
    priority: "일정",
    tone: "warn",
    title: "시험 일정 미확정 프로젝트",
    description: "시험원 배정 또는 협의중 단계 점검",
    count: String(unconfirmedScheduleCount),
    hint: "담당자 확인",
  },
  {
    priority: "추적",
    tone: "danger",
    title: "g4v 업로드 후 결과 확인 필요",
    description: "업로드 이후 완료 전 검증 필요",
    count: String(projects.filter((project) => project.status === "g4v업로드").length),
    hint: "완료 대기",
  },
  {
    priority: "검토",
    tone: "warn",
    title: "전화 접수 미정리",
    description: "프로젝트 생성 전 메모 상태 정리 필요",
    count: String(pendingIntakeCount),
    hint: "정리 필요",
  },
];

export const activityLogs: InfoItem[] = [
  {
    title: "박지은 · 견적 발송 기록 추가",
    description: "테크웨이브 프로젝트에 견적서와 신청 의뢰서 발송 기록 저장 · 13:12",
  },
  {
    title: "김민수 · 시험 사진 링크 등록",
    description: "블루센스 프로젝트 증적 링크 6건 추가 · 11:48",
  },
  {
    title: "이서준 · g4v 업로드 상태 변경",
    description: "AI메딕스 프로젝트 상태를 검증중으로 변경 · 09:05",
  },
];

export const weeklySchedule: InfoItem[] = [
  {
    title: "월 14:00 · 블루센스 시험 진행",
    description: "시험실 A · 담당 김민수 · 증적 사진 업로드 필요",
  },
  {
    title: "화 10:30 · 네오로직스 내부검토",
    description: "사장님 검토 회의 · 성적서 초안 최종 반영",
  },
  {
    title: "수 16:00 · 테크웨이브 팔로업",
    description: "전화 재접촉 또는 메일 초안 확정",
  },
];

export type ProjectDetailTaskStatus = "todo" | "done";
export type ProjectTaskPriority = "high" | "medium" | "low";
export type ProjectDetailNoteKind = "상담" | "내부" | "회의";
export type WorkflowStepState = "done" | "current" | "upcoming";

export type ProjectStatusHistoryEntry = {
  status: ProjectStatus;
  changedAt: string;
  note: string;
};

export type ProjectDetailNote = {
  id: string;
  kind: ProjectDetailNoteKind;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export type ProjectArtifactLink = {
  id: string;
  category: string;
  label: string;
  href: string;
  description: string;
  owner: string;
  updatedAt: string;
};

export type ProjectDetailTask = {
  id: string;
  title: string;
  description: string;
  owner: string;
  dueText: string;
  priority: ProjectTaskPriority;
  status: ProjectDetailTaskStatus;
};

export type ProjectWorkflowStep = {
  label: string;
  detail: string;
  state: WorkflowStepState;
};

export type ProjectWorkflowSummary = {
  title: string;
  description: string;
  statusLabel: string;
  tone: ProjectStateTone;
  steps: ProjectWorkflowStep[];
};

export type ProjectDispatchSummary = {
  quoteSentAt: string | null;
  applicationSentAt: string | null;
  latestReplyStatus: "회신 대기" | "일부 회신" | "회신 완료" | "추가 확인 필요";
  reminderDueAt: string;
  lastFollowUpNote: string;
};

export type ProjectDetailRecord = ProjectRow & {
  client: ClientRecord;
  requestSummary: string;
  requestedOutcome: string;
  requestedAt: string;
  reportDueLabel: string;
  coordinatorNote: string;
  dispatchSummary: ProjectDispatchSummary;
  statusHistory: ProjectStatusHistoryEntry[];
  notes: ProjectDetailNote[];
  artifactLinks: ProjectArtifactLink[];
  reportWorkflow: ProjectWorkflowSummary;
  g4vWorkflow: ProjectWorkflowSummary;
  tasks: ProjectDetailTask[];
};

type ProjectDetailOverrides = {
  dispatchSummary?: ProjectDispatchSummary;
  notes?: ProjectDetailNote[];
};

export type ProjectDetailRecordUpdate = Partial<
  Pick<ProjectRow, "status" | "nextAction" | "nextActionNote" | "needsReminder" | "updatedAt" | "updatedAtSortKey">
> & {
  dispatchSummary?: ProjectDispatchSummary;
  notes?: ProjectDetailNote[];
};

const statusHistoryMoments = [
  "3월 12일 09:20",
  "3월 12일 14:10",
  "3월 13일 10:30",
  "3월 15일 16:05",
  "3월 17일 11:20",
  "3월 18일 15:40",
  "3월 19일 13:15",
  "3월 20일 10:00",
  "3월 21일 14:45",
  "3월 22일 09:35",
  "3월 22일 17:10",
  "3월 23일 08:40",
  "3월 23일 16:20",
] as const;

const reportWorkflowLabels: Array<{ status: ProjectStatus; detail: string }> = [
  { status: "성적서초안", detail: "초안 문구와 표지 정보 정리" },
  { status: "내부검토", detail: "내부 검토 의견 반영" },
  { status: "고객검토", detail: "고객 피드백 수렴" },
  { status: "최종확정", detail: "최종본 확정 및 제출 준비" },
];

const g4vWorkflowLabels: Array<{ label: string; pivot: ProjectStatus; detail: string }> = [
  { label: "업로드 준비", pivot: "최종확정", detail: "제출 파일과 메타 정보 정리" },
  { label: "g4v 업로드", pivot: "g4v업로드", detail: "사이트 업로드와 등록 정보 확인" },
  { label: "검증 확인", pivot: "g4v업로드", detail: "업로드 후 오류 및 보완 사항 점검" },
  { label: "완료 전환", pivot: "완료", detail: "문제 없으면 프로젝트 종료 처리" },
];

function getCurrentStatusIndex(status: ProjectStatus) {
  return projectStatuses.indexOf(status);
}

function buildStatusHistory(project: ProjectRow): ProjectStatusHistoryEntry[] {
  const currentIndex = getCurrentStatusIndex(project.status);

  return projectStatuses.slice(0, currentIndex + 1).map((status, index) => ({
    status,
    changedAt: statusHistoryMoments[index] ?? project.updatedAt,
    note:
      status === project.status
        ? `${project.nextAction} 중심으로 운영 중 · ${project.nextActionNote}`
        : `${status} 단계 기본 체크리스트를 완료하고 다음 단계 준비`,
  }));
}

function buildNotes(project: ProjectRow, client: ClientRecord): ProjectDetailNote[] {
  return [
    {
      id: `${project.id}-note-1`,
      kind: "상담",
      title: "초기 요청 정리",
      content: `${client.contactName} 담당자와 접수 내용을 확인하고 '${project.project}' 범위와 제출 일정 기대치를 정리했습니다.`,
      author: project.owner,
      createdAt: "3월 12일 10:15",
    },
    {
      id: `${project.id}-note-2`,
      kind: "내부",
      title: "운영 메모",
      content: `현재 핵심 포인트는 ${project.nextAction}입니다. ${project.nextActionNote} 메모를 기준으로 일정 리스크를 함께 추적합니다.`,
      author: "운영팀",
      createdAt: "3월 18일 14:20",
    },
    {
      id: `${project.id}-note-3`,
      kind: "회의",
      title: "상태 공유 회의",
      content: `담당자 ${project.owner} 기준으로 현재 상태 '${project.status}'에서 필요한 확인 항목을 공유했습니다.`,
      author: "이서준",
      createdAt: "3월 21일 09:40",
    },
    {
      id: `${project.id}-note-4`,
      kind: "내부",
      title: "후속 조치 메모",
      content: `자료 링크, 성적서 단계, g4v 준비 여부를 한 화면에서 점검할 수 있도록 상세 구조를 유지합니다.`,
      author: "박지은",
      createdAt: project.updatedAt,
    },
  ];
}

function buildDispatchSummary(project: ProjectRow): ProjectDispatchSummary {
  const currentIndex = getCurrentStatusIndex(project.status);
  const dispatchIndex = getCurrentStatusIndex("견적/신청서 발송");
  const assignedIndex = getCurrentStatusIndex("시험원배정");

  return {
    quoteSentAt: currentIndex >= dispatchIndex ? "3월 13일 14:00" : null,
    applicationSentAt: currentIndex >= dispatchIndex ? "3월 13일 14:05" : null,
    latestReplyStatus:
      project.status === "회신대기"
        ? "회신 대기"
        : currentIndex >= assignedIndex
          ? "회신 완료"
          : currentIndex >= dispatchIndex
            ? "일부 회신"
            : "추가 확인 필요",
    reminderDueAt: project.needsReminder ? "오늘 18:00" : "미설정",
    lastFollowUpNote: project.needsReminder
      ? `${project.nextAction} 전 고객 재확인 필요`
      : `${project.nextAction} 기준으로 후속 기록 정리 완료`,
  };
}

function buildArtifactLinks(project: ProjectRow, client: ClientRecord): ProjectArtifactLink[] {
  return [
    {
      id: `${project.id}-artifact-1`,
      category: "접수 자료",
      label: `${client.companyName} 의뢰 자료 원본`,
      href: `https://files.example.com/${project.id}/request`,
      description: "요청서, 범위 문서, 참고 메모 링크",
      owner: project.owner,
      updatedAt: "3월 18일 11:10",
    },
    {
      id: `${project.id}-artifact-2`,
      category: "시험 자료",
      label: `${project.project} 시험 증적`,
      href: `https://files.example.com/${project.id}/evidence`,
      description: "시험 사진, 로그, 확인 캡처 묶음",
      owner: "김민수",
      updatedAt: "3월 22일 15:20",
    },
    {
      id: `${project.id}-artifact-3`,
      category: "성적서",
      label: `${project.project} 성적서 작업 폴더`,
      href: `https://files.example.com/${project.id}/report`,
      description: "초안, 내부 검토본, 최종본 링크",
      owner: project.owner,
      updatedAt: project.updatedAt,
    },
  ];
}

function getWorkflowStepState(currentIndex: number, stepIndex: number) {
  if (currentIndex > stepIndex) return "done" as const;
  if (currentIndex === stepIndex) return "current" as const;
  return "upcoming" as const;
}

function buildReportWorkflow(project: ProjectRow): ProjectWorkflowSummary {
  const currentIndex = reportWorkflowLabels.findIndex((item) => item.status === project.status);

  return {
    title: "성적서 흐름",
    description: "성적서 작성부터 최종 확정까지의 후반 운영 단계를 확인합니다.",
    statusLabel:
      currentIndex === -1 ? (getCurrentStatusIndex(project.status) > getCurrentStatusIndex("최종확정") ? "완료 이후 단계" : "아직 진입 전") : project.status,
    tone: project.statusTone,
    steps: reportWorkflowLabels.map((item, index) => ({
      label: item.status,
      detail: item.detail,
      state: currentIndex === -1 ? (getCurrentStatusIndex(project.status) > getCurrentStatusIndex("최종확정") ? "done" : "upcoming") : getWorkflowStepState(currentIndex, index),
    })),
  };
}

function buildG4vWorkflow(project: ProjectRow): ProjectWorkflowSummary {
  const currentIndex =
    project.status === "완료" ? 3 : project.status === "g4v업로드" ? 2 : getCurrentStatusIndex(project.status) >= getCurrentStatusIndex("최종확정") ? 0 : -1;

  return {
    title: "g4v 추적",
    description: "업로드 준비부터 완료 전환 전 확인 단계까지 묶어서 봅니다.",
    statusLabel:
      currentIndex === -1
        ? "아직 준비 전"
        : currentIndex >= 2
          ? project.status === "완료"
            ? "완료 반영"
            : "업로드 후 검증중"
          : "업로드 준비중",
    tone: project.status === "완료" ? "done" : project.status === "g4v업로드" ? "review" : "in-progress",
    steps: g4vWorkflowLabels.map((item, index) => ({
      label: item.label,
      detail: item.detail,
      state: currentIndex === -1 ? "upcoming" : getWorkflowStepState(currentIndex, index),
    })),
  };
}

function buildTasks(project: ProjectRow): ProjectDetailTask[] {
  return [
    {
      id: `${project.id}-task-1`,
      title: project.nextAction,
      description: project.nextActionNote,
      owner: project.owner,
      dueText: "가장 먼저 확인",
      priority: project.needsReminder ? "high" : "medium",
      status: "todo",
    },
    {
      id: `${project.id}-task-2`,
      title: "자료 링크 최신화",
      description: "시험/성적서 관련 링크 메타 정보를 최신 상태로 맞춥니다.",
      owner: project.owner,
      dueText: "오늘 마감 전",
      priority: "medium",
      status: project.status === "접수" || project.status === "상담중" ? "todo" : "done",
    },
    {
      id: `${project.id}-task-3`,
      title: "내부 공유 메모 정리",
      description: "최근 상담/회의 내용을 운영 메모 기준으로 정리합니다.",
      owner: "운영팀",
      dueText: "이번 주",
      priority: "low",
      status: "done",
    },
    {
      id: `${project.id}-task-4`,
      title: project.needsReminder ? "리마인더 후속 연락" : "상태 점검 리마인더",
      description: project.needsReminder
        ? "회신 지연 또는 완료 전 확인이 필요한 건으로 후속 연락 필요"
        : "다음 단계 전환 전 누락 항목이 없는지 확인",
      owner: project.owner,
      dueText: project.needsReminder ? "즉시" : "이번 주",
      priority: project.needsReminder ? "high" : "medium",
      status: project.needsReminder ? "todo" : "done",
    },
    {
      id: `${project.id}-task-5`,
      title: "후반 단계 체크리스트 검토",
      description: "성적서와 g4v 흐름을 한 번에 검토해 종료 조건을 확인합니다.",
      owner: CURRENT_USER_NAME,
      dueText: "상태 전환 전",
      priority: getCurrentStatusIndex(project.status) >= getCurrentStatusIndex("성적서초안") ? "medium" : "low",
      status: getCurrentStatusIndex(project.status) >= getCurrentStatusIndex("시험진행중") ? "todo" : "done",
    },
  ];
}

function buildProjectDetail(project: ProjectRow, overrides: ProjectDetailOverrides = {}): ProjectDetailRecord {
  const client = clientRecords.find((item) => item.id === project.companyId);

  if (!client) {
    throw new Error(`Client not found for project ${project.id}`);
  }

  return {
    ...project,
    client,
    requestSummary: `${project.company}의 '${project.project}' 운영 현황과 후속 조치 항목을 정리한 상세 화면입니다.`,
    requestedOutcome:
      getCurrentStatusIndex(project.status) >= getCurrentStatusIndex("성적서초안")
        ? "성적서 확정과 제출 후 완료 전환까지 문제 없이 마감"
        : "시험 협의, 시험 진행, 후속 자료 정리가 끊기지 않도록 운영",
    requestedAt: project.intakeSource === "web" ? "웹 의뢰서 접수 건" : "전화 접수 후 수기 등록 건",
    reportDueLabel:
      getCurrentStatusIndex(project.status) >= getCurrentStatusIndex("고객검토") ? "이번 주 마감 대상" : "일정 협의 후 확정 예정",
    coordinatorNote: `${project.owner} 담당 기준으로 현재 '${project.status}' 단계이며, 다음 액션은 '${project.nextAction}'입니다.`,
    dispatchSummary: overrides.dispatchSummary ?? buildDispatchSummary(project),
    statusHistory: buildStatusHistory(project),
    notes: overrides.notes ?? buildNotes(project, client),
    artifactLinks: buildArtifactLinks(project, client),
    reportWorkflow: buildReportWorkflow(project),
    g4vWorkflow: buildG4vWorkflow(project),
    tasks: buildTasks(project),
  };
}

export const projectDetails = projects.map((project) => buildProjectDetail(project));

export function getProjectDetail(projectId: string) {
  return projectDetails.find((project) => project.id === projectId) ?? null;
}

export function updateProjectDetailRecord(detail: ProjectDetailRecord, updates: ProjectDetailRecordUpdate) {
  const nextStatus = updates.status ?? detail.status;
  const nextProject: ProjectRow = {
    ...detail,
    ...updates,
    status: nextStatus,
    statusTone: projectStatusMeta[nextStatus].tone,
    isCompleted: projectStatusMeta[nextStatus].isCompleted,
  };

  return buildProjectDetail(nextProject, {
    dispatchSummary: updates.dispatchSummary ?? detail.dispatchSummary,
    notes: updates.notes ?? detail.notes,
  });
}
