import { Project, Task } from '../types';
import {
  generateWeeklyComments,
  getAssigneeCounts,
  getHighPriorityOpenTasks,
  getOverdueTasks,
  getTaskStats,
  getWeeklyFocusPoints
} from '../utils/taskUtils';
import { StatCard } from '../components/StatCard';

type DashboardPageProps = {
  tasks: Task[];
  projects: Project[];
};

export function DashboardPage({ tasks, projects }: DashboardPageProps) {
  const stats = getTaskStats(tasks);
  const inProgressProjects = projects.filter((project) => project.status === '進行中').length;
  const assigneeCounts = getAssigneeCounts(tasks);
  const highPriorityOpen = getHighPriorityOpenTasks(tasks);
  const overdueTasks = getOverdueTasks(tasks);
  const focusPoints = getWeeklyFocusPoints(tasks);
  const comments = generateWeeklyComments(tasks);

  return (
    <section data-testid="dashboard-page">
      <h2>ダッシュボード</h2>
      <div className="stat-grid">
        <StatCard label="進行中案件数" value={inProgressProjects} testId="stat-active-projects" />
        <StatCard label="全課題数" value={stats.total} testId="stat-total-tasks" />
        <StatCard label="未対応課題数" value={stats.notStarted} testId="stat-not-started" />
        <StatCard label="対応中課題数" value={stats.inProgress} testId="stat-in-progress" />
        <StatCard label="完了課題数" value={stats.done} testId="stat-done" />
        <StatCard label="高優先度課題数" value={stats.highPriority} testId="stat-high-priority" />
        <StatCard label="期限超過課題数" value={stats.overdue} testId="stat-overdue" />
      </div>

      <div className="panel-grid">
        <article className="panel" data-testid="panel-assignee-counts">
          <h3>担当者別課題件数</h3>
          <ul>
            {Object.entries(assigneeCounts).map(([assignee, count]) => (
              <li key={assignee}>
                {assignee}: {count}件
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" data-testid="panel-high-priority-open">
          <h3>高優先度未完了課題一覧</h3>
          <ul>
            {highPriorityOpen.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </article>

        <article className="panel" data-testid="panel-overdue-tasks">
          <h3>期限超過課題一覧</h3>
          <ul>
            {overdueTasks.map((task) => (
              <li key={task.id}>
                {task.title} ({task.dueDate})
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" data-testid="panel-focus-points">
          <h3>今週の注視ポイント</h3>
          <ul>
            {focusPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className="panel" data-testid="panel-dashboard-comments">
        <h3>状況コメント</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
