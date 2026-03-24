import { useMemo, useState } from "react";
import type { ProjectDetailTask } from "../data/dashboard";

type ProjectTaskBoardProps = {
  tasks: ProjectDetailTask[];
};

type TaskFilter = "all" | "todo" | "done";

const filters: Array<{ value: TaskFilter; label: string }> = [
  { value: "all", label: "전체" },
  { value: "todo", label: "해야 할 일" },
  { value: "done", label: "완료된 작업" },
];

function priorityLabel(priority: ProjectDetailTask["priority"]) {
  if (priority === "high") return "긴급";
  if (priority === "medium") return "중요";
  return "일반";
}

export function ProjectTaskBoard({ tasks }: ProjectTaskBoardProps) {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [showCompleted, setShowCompleted] = useState(false);

  const pendingTasks = useMemo(() => tasks.filter((task) => task.status === "todo"), [tasks]);
  const doneTasks = useMemo(() => tasks.filter((task) => task.status === "done"), [tasks]);
  const filteredPendingTasks = useMemo(() => (filter === "done" ? [] : pendingTasks), [filter, pendingTasks]);
  const filteredDoneTasks = useMemo(() => (filter === "todo" ? [] : doneTasks), [filter, doneTasks]);

  return (
    <div className="project-task-board">
      <div className="project-task-toolbar">
        <div className="project-segmented">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`filter-chip${filter === item.value ? " active" : ""}`}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button type="button" className="button ghost detail-inline-button" onClick={() => setShowCompleted((current) => !current)}>
          {showCompleted ? "완료 작업 접기" : `완료 작업 펼치기 (${doneTasks.length})`}
        </button>
      </div>

      {filteredPendingTasks.length > 0 ? (
        <div className="project-task-group">
          <div className="project-task-group-head">
            <h3>해야 할 일</h3>
            <span>{pendingTasks.length}건</span>
          </div>
          <div className="project-task-list">
            {filteredPendingTasks.map((task) => (
              <article className="project-task-card todo" key={task.id}>
                <div className="project-task-card-head">
                  <strong>{task.title}</strong>
                  <span className={`project-task-priority ${task.priority}`}>{priorityLabel(task.priority)}</span>
                </div>
                <p>{task.description}</p>
                <div className="project-task-footer">
                  <span>{task.owner}</span>
                  <span>{task.dueText}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {showCompleted && filteredDoneTasks.length > 0 ? (
        <div className="project-task-group completed">
          <div className="project-task-group-head">
            <h3>완료된 작업</h3>
            <span>{doneTasks.length}건</span>
          </div>
          <div className="project-task-list completed">
            {filteredDoneTasks.map((task) => (
              <article className="project-task-card done" key={task.id}>
                <div className="project-task-card-head">
                  <strong>{task.title}</strong>
                  <span className={`project-task-priority ${task.priority}`}>{priorityLabel(task.priority)}</span>
                </div>
                <p>{task.description}</p>
                <div className="project-task-footer">
                  <span>{task.owner}</span>
                  <span>{task.dueText}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
