import { Link } from 'react-router-dom';
import { Task } from '../types';

type TaskTableProps = {
  tasks: Task[];
  showEdit?: boolean;
  testId?: string;
};

export function TaskTable({ tasks, showEdit = true, testId = 'task-table' }: TaskTableProps) {
  return (
    <table className="table" data-testid={testId}>
      <thead>
        <tr>
          <th>課題タイトル</th>
          <th>案件名</th>
          <th>担当者</th>
          <th>優先度</th>
          <th>ステータス</th>
          <th>期限</th>
          <th>更新日</th>
          {showEdit ? <th>操作</th> : null}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} data-testid={`task-row-${task.id}`}>
            <td>{task.title}</td>
            <td>{task.projectName}</td>
            <td>{task.assignee}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.updatedAt}</td>
            {showEdit ? (
              <td>
                <Link to={`/tasks/${task.id}/edit`} data-testid={`edit-link-${task.id}`}>
                  編集
                </Link>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
