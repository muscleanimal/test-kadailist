import { useNavigate } from 'react-router-dom';
import { Task, TaskFormValues, Project } from '../types';
import { TaskForm } from '../components/TaskForm';

type TaskNewPageProps = {
  projects: Project[];
  onCreate: (task: Task) => void;
};

const initialValues: TaskFormValues = {
  title: '',
  projectName: '',
  description: '',
  assignee: '',
  priority: 'High',
  status: '未対応',
  dueDate: ''
};

export function TaskNewPage({ projects, onCreate }: TaskNewPageProps) {
  const navigate = useNavigate();

  const handleSubmit = (values: TaskFormValues) => {
    const now = new Date().toISOString().slice(0, 10);
    const nextTask: Task = {
      id: `t-${Date.now()}`,
      ...values,
      createdAt: now,
      updatedAt: now
    };

    onCreate(nextTask);
    navigate('/tasks');
  };

  return (
    <section data-testid="task-new-page">
      <h2>課題登録</h2>
      <TaskForm mode="create" projects={projects} initialValues={initialValues} onSubmit={handleSubmit} />
    </section>
  );
}
