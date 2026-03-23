import { Suspense, lazy } from "react";
import { DashboardBanner } from "../components/DashboardBanner";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { activityLogs, weeklySchedule } from "../data/dashboard";

const ExaminerStatusSection = lazy(async () => ({
  default: (await import("../components/ExaminerStatusSection")).ExaminerStatusSection,
}));
const ActionQueueCard = lazy(async () => ({
  default: (await import("../components/ActionQueueCard")).ActionQueueCard,
}));
const ProjectsTable = lazy(async () => ({
  default: (await import("../components/ProjectsTable")).ProjectsTable,
}));
const InfoListCard = lazy(async () => ({
  default: (await import("../components/InfoListCard")).InfoListCard,
}));

export function DashboardPage() {
  return (
    <>
      <div id="top" />
      <DashboardBanner />

      <section className="full-section" id="examiner-status">
        <ErrorBoundary>
          <Suspense fallback={<div className="card section-skeleton">시험원별 진행상황을 불러오는 중...</div>}>
            <ExaminerStatusSection />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="full-section" id="action-queue">
        <ErrorBoundary>
          <Suspense fallback={<div className="card section-skeleton">리마인더를 불러오는 중...</div>}>
            <ActionQueueCard />
          </Suspense>
        </ErrorBoundary>
      </section>

      <div id="projects">
        <ErrorBoundary>
          <Suspense fallback={<div className="card section-skeleton">프로젝트 목록을 불러오는 중...</div>}>
            <ProjectsTable />
          </Suspense>
        </ErrorBoundary>
      </div>

      <section className="bottom-grid" id="schedule">
        <ErrorBoundary>
          <Suspense fallback={<div className="card subtle-card section-skeleton">활동 로그를 불러오는 중...</div>}>
            <InfoListCard
              title="최근 활동 로그"
              description="오늘 3건"
              items={activityLogs}
              variant="timeline"
              subtle
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="card subtle-card section-skeleton">일정을 불러오는 중...</div>}>
            <InfoListCard
              title="이번 주 일정"
              description="3월 4주차"
              items={weeklySchedule}
              variant="schedule"
              subtle
            />
          </Suspense>
        </ErrorBoundary>
      </section>
    </>
  );
}
