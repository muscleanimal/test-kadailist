import { Task } from '../types';
import {
  generateWeeklyComments,
  getHighPriorityOpenTasks,
  getOverdueTasks,
  getRiskTasks,
  getTaskStats
} from '../utils/taskUtils';

type WeeklyReportPageProps = {
  tasks: Task[];
};

export function WeeklyReportPage({ tasks }: WeeklyReportPageProps) {
  const stats = getTaskStats(tasks);
  const overdueTasks = getOverdueTasks(tasks);
  const highPriorityOpen = getHighPriorityOpenTasks(tasks);
  const riskTasks = getRiskTasks(tasks);
  const comments = generateWeeklyComments(tasks);

  return (
    <section data-testid="weekly-report-page">
      <h2>週次報告</h2>

      <article className="panel" data-testid="weekly-summary">
        <h3>今週の進捗概要</h3>
        <p>課題全体の進行状況とリスクを集約しています。</p>
        <ul>
          <li data-testid="weekly-count-done">完了: {stats.done}件</li>
          <li data-testid="weekly-count-in-progress">対応中: {stats.inProgress}件</li>
          <li data-testid="weekly-count-not-started">未対応: {stats.notStarted}件</li>
          <li data-testid="weekly-count-on-hold">保留: {stats.onHold}件</li>
        </ul>
      </article>

      <div className="panel-grid">
        <article className="panel" data-testid="weekly-overdue-list">
          <h3>期限超過課題一覧</h3>
          <ul>
            {overdueTasks.map((task) => (
              <li key={task.id}>
                {task.title} / {task.assignee}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" data-testid="weekly-high-priority-list">
          <h3>高優先度未完了課題一覧</h3>
          <ul>
            {highPriorityOpen.map((task) => (
              <li key={task.id}>
                {task.title} / {task.status}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel" data-testid="weekly-risk-list">
          <h3>リスク課題一覧</h3>
          <ul>
            {riskTasks.map((task) => (
              <li key={task.id}>
                {task.title} / 期限: {task.dueDate}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="panel" data-testid="weekly-comments">
        <h3>簡易コメント</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
