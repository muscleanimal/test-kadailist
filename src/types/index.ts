export type Priority = 'High' | 'Medium' | 'Low';
export type TaskStatus = '未対応' | '対応中' | '完了' | '保留';
export type ProjectStatus = '進行中' | '完了' | '保留';

export type Task = {
  id: string;
  title: string;
  projectName: string;
  description: string;
  assignee: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  owner: string;
  startDate: string;
  endDate: string;
};

export type TaskFormValues = {
  title: string;
  projectName: string;
  description: string;
  assignee: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
};

export type TaskFilters = {
  status: 'all' | TaskStatus;
  priority: 'all' | Priority;
  assignee: 'all' | string;
  keyword: string;
  overdueOnly: boolean;
};
