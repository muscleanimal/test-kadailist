import { FormEvent, useMemo, useState } from 'react';
import { Project, TaskFormValues } from '../types';

type TaskFormProps = {
  mode: 'create' | 'edit';
  projects: Project[];
  initialValues: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
};

type FormErrors = Partial<Record<keyof TaskFormValues, string>>;

const defaultErrors: FormErrors = {};

export function TaskForm({ mode, projects, initialValues, onSubmit }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(defaultErrors);

  const assigneeCandidates = useMemo(
    () => ['山田', '佐藤', '田中', '高橋', '鈴木', '中村'],
    []
  );

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!values.title.trim()) nextErrors.title = '課題タイトルは必須です';
    if (!values.projectName.trim()) nextErrors.projectName = '案件名は必須です';
    if (!values.description.trim()) nextErrors.description = '内容は必須です';
    if (!values.assignee.trim()) nextErrors.assignee = '担当者は必須です';
    if (!values.dueDate.trim()) nextErrors.dueDate = '期限は必須です';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form className="form" onSubmit={submit} data-testid="task-form">
      <div className="form-grid">
        <label>
          課題タイトル
          <input
            data-testid="input-title"
            value={values.title}
            onChange={(e) => setValues((prev) => ({ ...prev, title: e.target.value }))}
          />
          {errors.title ? <small className="error">{errors.title}</small> : null}
        </label>

        <label>
          案件名
          <select
            data-testid="input-projectName"
            value={values.projectName}
            onChange={(e) => setValues((prev) => ({ ...prev, projectName: e.target.value }))}
          >
            <option value="">選択してください</option>
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.projectName ? <small className="error">{errors.projectName}</small> : null}
        </label>

        <label>
          担当者
          <select
            data-testid="input-assignee"
            value={values.assignee}
            onChange={(e) => setValues((prev) => ({ ...prev, assignee: e.target.value }))}
          >
            <option value="">選択してください</option>
            {assigneeCandidates.map((candidate) => (
              <option key={candidate} value={candidate}>
                {candidate}
              </option>
            ))}
          </select>
          {errors.assignee ? <small className="error">{errors.assignee}</small> : null}
        </label>

        <label>
          優先度
          <select
            data-testid="input-priority"
            value={values.priority}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, priority: e.target.value as TaskFormValues['priority'] }))
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          ステータス
          <select
            data-testid="input-status"
            value={values.status}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, status: e.target.value as TaskFormValues['status'] }))
            }
          >
            <option value="未対応">未対応</option>
            <option value="対応中">対応中</option>
            <option value="完了">完了</option>
            <option value="保留">保留</option>
          </select>
        </label>

        <label>
          期限
          <input
            data-testid="input-dueDate"
            type="date"
            value={values.dueDate}
            onChange={(e) => setValues((prev) => ({ ...prev, dueDate: e.target.value }))}
          />
          {errors.dueDate ? <small className="error">{errors.dueDate}</small> : null}
        </label>
      </div>

      <label>
        内容
        <textarea
          data-testid="input-description"
          rows={4}
          value={values.description}
          onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
        />
        {errors.description ? <small className="error">{errors.description}</small> : null}
      </label>

      <button className="btn-primary" data-testid="submit-task" type="submit">
        {mode === 'create' ? '登録する' : '保存する'}
      </button>
    </form>
  );
}
