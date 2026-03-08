import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { seedProjects, seedTasks } from '../data/seed';
import { Layout } from '../components/Layout';
import { DashboardPage } from '../pages/DashboardPage';
import { TasksPage } from '../pages/TasksPage';
import { TaskNewPage } from '../pages/TaskNewPage';
import { TaskEditPage } from '../pages/TaskEditPage';
import { WeeklyReportPage } from '../pages/WeeklyReportPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Task } from '../types';

export default function App() {
  const [projects] = useState(seedProjects);
  const [tasks, setTasks] = useState(seedTasks);

  const handleCreateTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleUpdateTask = (task: Task) => {
    setTasks((prev) => prev.map((item) => (item.id === task.id ? task : item)));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage tasks={tasks} projects={projects} />} />
          <Route path="/tasks" element={<TasksPage tasks={tasks} />} />
          <Route path="/tasks/new" element={<TaskNewPage projects={projects} onCreate={handleCreateTask} />} />
          <Route
            path="/tasks/:id/edit"
            element={<TaskEditPage tasks={tasks} projects={projects} onUpdate={handleUpdateTask} />}
          />
          <Route path="/weekly-report" element={<WeeklyReportPage tasks={tasks} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
