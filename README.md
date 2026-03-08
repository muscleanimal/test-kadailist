# 週次進捗報告ダッシュボード付き課題管理アプリ (React + TypeScript + Vite)

PMO向けに進捗・課題・リスクの見える化を行う、ポートフォリオ兼POC用のフロントエンドアプリです。

## 機能

- ダッシュボード
- 課題一覧 (フィルタ / 検索 / 期限超過のみ表示 / 0件メッセージ)
- 課題登録 (必須バリデーション)
- 課題編集
- 週次報告 (進捗集計・リスク一覧・簡易コメント)
- Playwright E2Eテスト

## 画面ルーティング

- `/` : ダッシュボード
- `/tasks` : 課題一覧
- `/tasks/new` : 課題登録
- `/tasks/:id/edit` : 課題編集
- `/weekly-report` : 週次報告

## ディレクトリ構成

```txt
pmo-weekly-dashboard/
  src/
    app/
      App.tsx
    components/
      Layout.tsx
      StatCard.tsx
      TaskForm.tsx
      TaskTable.tsx
    data/
      seed.ts
    pages/
      DashboardPage.tsx
      NotFoundPage.tsx
      TaskEditPage.tsx
      TaskNewPage.tsx
      TasksPage.tsx
      WeeklyReportPage.tsx
    styles/
      global.css
    types/
      index.ts
    utils/
      taskUtils.ts
    main.tsx
  tests/
    app.spec.ts
  index.html
  package.json
  playwright.config.ts
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
  README.md
```

## ダミーデータ要件の満たし方

- Task: 10件
- 期限超過課題: 4件以上
- 高優先度未完了課題: 4件以上
- 完了課題: 2件
- 担当者: 複数
- Project: 4件

## コメント生成ロジック

`src/utils/taskUtils.ts` の `generateWeeklyComments` で実装。

- 期限超過課題がある場合:
  - `期限超過課題が存在するため、対応優先度の見直しが必要です`
- 高優先度未完了課題が複数ある場合:
  - `高優先度課題が滞留しているため、早期対応が必要です`
- 完了課題数が一定以上 (3件以上) の場合:
  - `今週は課題対応が進捗しています`

## セットアップと起動方法

```bash
cd /home/masu/pmo-weekly-dashboard
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いて確認します。

## E2Eテスト実行

```bash
cd /home/masu/pmo-weekly-dashboard
npx playwright install
npm run test:e2e
```

テストケース:

- 課題新規登録
- 必須バリデーション
- 課題編集
- フィルタ絞り込み
- 期限超過表示
- 0件表示
- 週次報告画面表示
