import { Task, TaskFilters } from '../types';

export const isOverdue = (task: Task, nowDate = new Date()): boolean => {
  const due = new Date(task.dueDate);
  const now = new Date(nowDate.toISOString().slice(0, 10));
  return due < now && task.status !== '完了';
};

export const applyTaskFilters = (
  tasks: Task[],
  filters: TaskFilters,
  nowDate = new Date()
): Task[] => {
  const keyword = filters.keyword.trim().toLowerCase();

  return tasks.filter((task) => {
    const byStatus = filters.status === 'all' || task.status === filters.status;
    const byPriority = filters.priority === 'all' || task.priority === filters.priority;
    const byAssignee = filters.assignee === 'all' || task.assignee === filters.assignee;
    const byKeyword =
      keyword.length === 0 ||
      task.title.toLowerCase().includes(keyword) ||
      task.projectName.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);
    const byOverdue = !filters.overdueOnly || isOverdue(task, nowDate);

    return byStatus && byPriority && byAssignee && byKeyword && byOverdue;
  });
};

export const getTaskStats = (tasks: Task[], nowDate = new Date()) => {
  const notStarted = tasks.filter((task) => task.status === '未対応').length;
  const inProgress = tasks.filter((task) => task.status === '対応中').length;
  const done = tasks.filter((task) => task.status === '完了').length;
  const onHold = tasks.filter((task) => task.status === '保留').length;
  const highPriority = tasks.filter((task) => task.priority === 'High').length;
  const overdue = tasks.filter((task) => isOverdue(task, nowDate)).length;

  return {
    total: tasks.length,
    notStarted,
    inProgress,
    done,
    onHold,
    highPriority,
    overdue
  };
};

export const getAssigneeCounts = (tasks: Task[]) => {
  return tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.assignee] = (acc[task.assignee] ?? 0) + 1;
    return acc;
  }, {});
};

export const getHighPriorityOpenTasks = (tasks: Task[]) => {
  return tasks.filter((task) => task.priority === 'High' && task.status !== '完了');
};

export const getOverdueTasks = (tasks: Task[], nowDate = new Date()) => {
  return tasks.filter((task) => isOverdue(task, nowDate));
};

export const getRiskTasks = (tasks: Task[], nowDate = new Date()) => {
  return tasks.filter(
    (task) => isOverdue(task, nowDate) || (task.priority === 'High' && task.status !== '完了')
  );
};

export const generateWeeklyComments = (tasks: Task[], nowDate = new Date()): string[] => {
  const comments: string[] = [];
  const overdueTasks = getOverdueTasks(tasks, nowDate);
  const highPriorityOpen = getHighPriorityOpenTasks(tasks);
  const doneCount = tasks.filter((task) => task.status === '完了').length;

  if (overdueTasks.length > 0) {
    comments.push('期限超過課題が存在するため、対応優先度の見直しが必要です');
  }
  if (highPriorityOpen.length >= 2) {
    comments.push('高優先度課題が滞留しているため、早期対応が必要です');
  }
  if (doneCount >= 3) {
    comments.push('今週は課題対応が進捗しています');
  }

  if (comments.length === 0) {
    comments.push('重大な懸念は見られません。現状の進め方を維持してください');
  }

  return comments;
};

export const getWeeklyFocusPoints = (tasks: Task[], nowDate = new Date()): string[] => {
  const points: string[] = [];
  const overdueTasks = getOverdueTasks(tasks, nowDate);
  const highPriorityOpen = getHighPriorityOpenTasks(tasks);
  const inProgress = tasks.filter((task) => task.status === '対応中').length;

  if (overdueTasks.length > 0) {
    points.push(`期限超過課題 ${overdueTasks.length} 件の挽回計画を確定する`);
  }
  if (highPriorityOpen.length > 0) {
    points.push(`高優先度未完了課題 ${highPriorityOpen.length} 件の担当/期限を再確認する`);
  }
  if (inProgress > 0) {
    points.push(`対応中課題 ${inProgress} 件のブロッカーを解消する`);
  }

  return points;
};
