import { Project, Task } from '../types';

export const seedProjects: Project[] = [
  {
    id: 'p-1',
    name: '営業支援システム刷新',
    status: '進行中',
    owner: '佐藤',
    startDate: '2026-01-15',
    endDate: '2026-06-30'
  },
  {
    id: 'p-2',
    name: '社内ワークフロー改善',
    status: '進行中',
    owner: '田中',
    startDate: '2025-12-01',
    endDate: '2026-04-15'
  },
  {
    id: 'p-3',
    name: 'データ可視化基盤構築',
    status: '保留',
    owner: '高橋',
    startDate: '2026-02-01',
    endDate: '2026-08-31'
  },
  {
    id: 'p-4',
    name: '監査対応ドキュメント整備',
    status: '完了',
    owner: '鈴木',
    startDate: '2025-10-01',
    endDate: '2026-02-28'
  }
];

export const seedTasks: Task[] = [
  {
    id: 't-1',
    title: '要件定義レビュー',
    projectName: '営業支援システム刷新',
    description: '業務部門レビュー観点を反映する',
    assignee: '山田',
    priority: 'High',
    status: '対応中',
    dueDate: '2026-03-05',
    createdAt: '2026-02-20',
    updatedAt: '2026-03-01'
  },
  {
    id: 't-2',
    title: '画面遷移図の更新',
    projectName: '営業支援システム刷新',
    description: '新規見積導線を追加',
    assignee: '田中',
    priority: 'Medium',
    status: '未対応',
    dueDate: '2026-03-12',
    createdAt: '2026-02-22',
    updatedAt: '2026-02-24'
  },
  {
    id: 't-3',
    title: '承認フロー設定の確認',
    projectName: '社内ワークフロー改善',
    description: '課長承認ステップの例外処理を確認',
    assignee: '佐藤',
    priority: 'High',
    status: '未対応',
    dueDate: '2026-03-02',
    createdAt: '2026-02-18',
    updatedAt: '2026-02-25'
  },
  {
    id: 't-4',
    title: '週次報告テンプレート整備',
    projectName: '社内ワークフロー改善',
    description: 'PMO向けの共通テンプレートを作成',
    assignee: '鈴木',
    priority: 'Low',
    status: '完了',
    dueDate: '2026-03-01',
    createdAt: '2026-02-10',
    updatedAt: '2026-03-01'
  },
  {
    id: 't-5',
    title: 'ダッシュボード指標定義',
    projectName: 'データ可視化基盤構築',
    description: 'KPI候補を事業部と合意する',
    assignee: '山田',
    priority: 'High',
    status: '保留',
    dueDate: '2026-03-04',
    createdAt: '2026-02-19',
    updatedAt: '2026-03-03'
  },
  {
    id: 't-6',
    title: '監査証跡の棚卸し',
    projectName: '監査対応ドキュメント整備',
    description: '証跡不足箇所を一覧化する',
    assignee: '高橋',
    priority: 'Medium',
    status: '完了',
    dueDate: '2026-02-27',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-27'
  },
  {
    id: 't-7',
    title: '障害一次対応手順の確認',
    projectName: '営業支援システム刷新',
    description: '運用チーム向け手順を検証',
    assignee: '中村',
    priority: 'High',
    status: '対応中',
    dueDate: '2026-03-15',
    createdAt: '2026-02-23',
    updatedAt: '2026-03-05'
  },
  {
    id: 't-8',
    title: 'データ連携仕様レビュー',
    projectName: 'データ可視化基盤構築',
    description: '外部API連携の制約を整理',
    assignee: '佐藤',
    priority: 'Medium',
    status: '未対応',
    dueDate: '2026-03-18',
    createdAt: '2026-02-26',
    updatedAt: '2026-03-01'
  },
  {
    id: 't-9',
    title: 'UAT日程調整',
    projectName: '社内ワークフロー改善',
    description: '利用部門との日程を確定',
    assignee: '田中',
    priority: 'Low',
    status: '対応中',
    dueDate: '2026-03-20',
    createdAt: '2026-02-28',
    updatedAt: '2026-03-06'
  },
  {
    id: 't-10',
    title: '移行リハーサル計画書作成',
    projectName: '営業支援システム刷新',
    description: '移行手順とロールバック手順を記載',
    assignee: '高橋',
    priority: 'High',
    status: '未対応',
    dueDate: '2026-03-06',
    createdAt: '2026-02-21',
    updatedAt: '2026-03-02'
  }
];
