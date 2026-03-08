import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Project, Task, TaskFormValues } from '../types';
import { TaskForm } from '../components/TaskForm';

type TaskEditPageProps = {
  tasks: Task[];
  projects: Project[];
  onUpdate: (task: Task) => void;
};

export function TaskEditPage({ tasks, projects, onUpdate }: TaskEditPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const targetTask = useMemo(() => tasks.find((task) => task.id === id), [tasks, id]);

  if (!targetTask) {
    return <Navigate to="/tasks" replace />;
  }

  const initialValues: TaskFormValues = {
    title: targetTask.title,
    projectName: targetTask.projectName,
    description: targetTask.description,
    assignee: targetTask.assignee,
    priority: targetTask.priority,
    status: targetTask.status,
    dueDate: targetTask.dueDate
  };

  const handleSubmit = (values: TaskFormValues) => {
    const updatedTask: Task = {
      ...targetTask,
      ...values,
      updatedAt: new Date().toISOString().slice(0, 10)
    };

    onUpdate(updatedTask);
    navigate('/tasks');
  };

  return (
    <section data-testid="task-edit-page">
      <h2>課題編集</h2>
      <TaskForm mode="edit" projects={projects} initialValues={initialValues} onSubmit={handleSubmit} />
    </section>
  );
}
