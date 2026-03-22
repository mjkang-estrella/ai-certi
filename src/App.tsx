import { ActionQueueCard } from "./components/ActionQueueCard";
import { DashboardBanner } from "./components/DashboardBanner";
import { ExaminerStatusSection } from "./components/ExaminerStatusSection";
import { InfoListCard } from "./components/InfoListCard";
import { ProjectsTable } from "./components/ProjectsTable";
import { Sidebar } from "./components/Sidebar";
import { SummaryListCard } from "./components/SummaryListCard";
import { Topbar } from "./components/Topbar";
import { activityLogs, operatingNotes, weeklySchedule, workloadInsights } from "./data/dashboard";

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <div className="container">
          <Topbar />
          <DashboardBanner />

          <section className="layout-grid">
            <ExaminerStatusSection />
            <SummaryListCard
              title="운영 해석 포인트"
              description="시험원 표를 보고 바로 판단해야 하는 내용을 요약한다."
              items={workloadInsights}
            />
          </section>

          <section className="layout-grid">
            <ActionQueueCard />
            <SummaryListCard
              title="오늘 꼭 볼 운영 메모"
              description="시험원 매트릭스와 별개로 관리자 판단이 필요한 이슈만 요약한다."
              items={operatingNotes}
            />
          </section>

          <ProjectsTable />

          <section className="bottom-grid">
            <InfoListCard
              title="최근 활동 로그"
              description="누가 무엇을 바꿨는지 홈에서도 바로 확인할 수 있게 한다."
              items={activityLogs}
              variant="timeline"
            />
            <InfoListCard
              title="이번 주 일정"
              description="일정은 보조 영역으로 두고, 홈의 주인공은 전체 상태와 처리 큐로 둔다."
              items={weeklySchedule}
              variant="schedule"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
