export type SidebarItem = {
  label: string;
  badge?: string;
  tone?: "default" | "danger";
  active?: boolean;
};

export type BannerMetric = {
  label: string;
  value: string;
  sub: string;
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

export type SummaryItem = {
  title: string;
  description: string;
  value: string;
};

export type ActionItem = {
  priority: "긴급" | "검토" | "일정" | "추적";
  tone: "danger" | "warn";
  title: string;
  description: string;
  count: string;
  hint: string;
};

export type ProjectRow = {
  company: string;
  project: string;
  state: string;
  stateTone: "in-progress" | "review" | "done";
  owner: string;
  ownerRole: string;
  nextAction: string;
  nextActionNote: string;
  updatedAt: string;
};

export type InfoItem = {
  title: string;
  description: string;
};

export const sidebarSections: Array<{ label: string; items: SidebarItem[] }> = [
  {
    label: "운영",
    items: [
      { label: "운영 현황", badge: "HOME", active: true },
      { label: "프로젝트", badge: "128" },
      { label: "기업 목록", badge: "84" },
      { label: "전화 접수", badge: "5", tone: "danger" },
      { label: "성적서 관리", badge: "18" },
    ],
  },
  {
    label: "지원",
    items: [
      { label: "일정 캘린더" },
      { label: "자료 링크 관리" },
      { label: "리마인더", badge: "11", tone: "danger" },
    ],
  },
];

export const bannerMetrics: BannerMetric[] = [
  { label: "이 달 접수 건 수", value: "43", sub: "웹 31 · 전화 12" },
  { label: "시험 협의중", value: "8", sub: "일정 미확정 5건" },
  { label: "시험중", value: "14", sub: "이번 주 진행 7건" },
  { label: "성적서 작성중", value: "6", sub: "초안 4 · 내부검토 2" },
  { label: "성적서 발행", value: "4", sub: "최종확정 직후" },
  { label: "성적서 제출", value: "3", sub: "고객 전달 완료" },
  { label: "이 달 종료 / 완료", value: "11", sub: "g4v 완료 8건" },
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
];

export const workloadInsights: SummaryItem[] = [
  { title: "시험 협의 편중", description: "박지은 담당 협의중 프로젝트가 가장 많음", value: "4" },
  { title: "시험 진행 병목 가능", description: "김민수 담당 시험중 건이 많아 일정 조정 필요", value: "5" },
  { title: "성적서 작성 집중", description: "이서준 담당 작성중 건이 가장 많음", value: "4" },
  { title: "마감 실적 최다", description: "최유진 담당 종료/완료 건이 가장 많음", value: "5" },
];

export const actionItems: ActionItem[] = [
  {
    priority: "긴급",
    tone: "danger",
    title: "견적 발송 후 3일 이상 회신 없음",
    description: "테크웨이브 외 3건 · 다음 액션: 팔로업 메일 초안 확인",
    count: "4",
    hint: "즉시 확인",
  },
  {
    priority: "검토",
    tone: "warn",
    title: "사장님 내부검토 대기 성적서",
    description: "AI메딕스 · 네오로직스 · 블루센스",
    count: "3",
    hint: "오늘 검토 필요",
  },
  {
    priority: "일정",
    tone: "warn",
    title: "시험 일정 미확정 프로젝트",
    description: "접수 후 2일 이상 협의 미진행",
    count: "5",
    hint: "담당자 확인",
  },
  {
    priority: "추적",
    tone: "danger",
    title: "g4v 업로드 후 결과 확인 필요",
    description: "문제 발생 여부 추적 · 완료 처리 전 검증 필요",
    count: "2",
    hint: "완료 대기",
  },
];

export const operatingNotes: SummaryItem[] = [
  { title: "내부검토 대기 성적서", description: "사장님 검토가 필요한 문서 수", value: "4" },
  { title: "고객검토 회신 지연", description: "2일 이상 피드백 미도착", value: "3" },
  { title: "전화 접수 미정리", description: "프로젝트 생성 전 메모 상태", value: "5" },
];

export const projects: ProjectRow[] = [
  {
    company: "네오로직스",
    project: "의료 AI 모델 안전성 검증",
    state: "내부검토",
    stateTone: "review",
    owner: "이서준",
    ownerRole: "성적서 담당",
    nextAction: "사장님 검토 반영",
    nextActionNote: "오늘 17:00 전",
    updatedAt: "오늘 11:24",
  },
  {
    company: "테크웨이브",
    project: "S/W 취약점 및 운영환경 검증",
    state: "회신대기",
    stateTone: "in-progress",
    owner: "박지은",
    ownerRole: "상담 / 견적",
    nextAction: "팔로업 메일 초안 검토",
    nextActionNote: "3일 초과",
    updatedAt: "어제 15:10",
  },
  {
    company: "블루센스",
    project: "영상 분석 모델 성능 검증",
    state: "시험진행중",
    stateTone: "in-progress",
    owner: "김민수",
    ownerRole: "시험 담당",
    nextAction: "시험 사진 및 증적 링크 적재",
    nextActionNote: "오늘 시험 종료 후",
    updatedAt: "오늘 09:40",
  },
  {
    company: "AI메딕스",
    project: "추론 서버 환경 검증",
    state: "g4v업로드",
    stateTone: "done",
    owner: "이서준",
    ownerRole: "업로드 추적",
    nextAction: "문제 발생 여부 확인 후 완료 전환",
    nextActionNote: "내일 오전 확인",
    updatedAt: "오늘 08:12",
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

