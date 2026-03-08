import { ChangeEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Task, TaskFilters } from '../types';
import { applyTaskFilters } from '../utils/taskUtils';
import { TaskTable } from '../components/TaskTable';

type TasksPageProps = {
  tasks: Task[];
};

const initialFilters: TaskFilters = {
  status: 'all',
  priority: 'all',
  assignee: 'all',
  keyword: '',
  overdueOnly: false
};

export function TasksPage({ tasks }: TasksPageProps) {
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);

  const assignees = useMemo(
    () => Array.from(new Set(tasks.map((task) => task.assignee))).sort(),
    [tasks]
  );

  const filteredTasks = useMemo(() => applyTaskFilters(tasks, filters), [tasks, filters]);

  const updateFilter =
    <K extends keyof TaskFilters>(key: K) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value;
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <section data-testid="tasks-page">
      <div className="section-title-row">
        <h2>課題一覧</h2>
        <Link className="btn-primary" to="/tasks/new" data-testid="new-task-button">
          新規登録
        </Link>
      </div>

      <div className="filter-grid" data-testid="task-filters">
        <label>
          ステータス
          <select data-testid="filter-status" value={filters.status} onChange={updateFilter('status')}>
            <option value="all">すべて</option>
            <option value="未対応">未対応</option>
            <option value="対応中">対応中</option>
            <option value="完了">完了</option>
            <option value="保留">保留</option>
          </select>
        </label>

        <label>
          優先度
          <select
            data-testid="filter-priority"
            value={filters.priority}
            onChange={updateFilter('priority')}
          >
            <option value="all">すべて</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          担当者
          <select
            data-testid="filter-assignee"
            value={filters.assignee}
            onChange={updateFilter('assignee')}
          >
            <option value="all">すべて</option>
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
        </label>

        <label>
          キーワード
          <input
            data-testid="filter-keyword"
            value={filters.keyword}
            onChange={updateFilter('keyword')}
            placeholder="課題タイトル・案件名・内容"
          />
        </label>

        <label className="checkbox-label">
          <input
            data-testid="filter-overdue-only"
            type="checkbox"
            checked={filters.overdueOnly}
            onChange={updateFilter('overdueOnly')}
          />
          期限超過のみ表示
        </label>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty" data-testid="empty-message">
          条件に一致する課題はありません。
        </p>
      ) : (
        <TaskTable tasks={filteredTasks} testId="task-list-table" />
      )}
    </section>
  );
}
