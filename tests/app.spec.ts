import { expect, test } from '@playwright/test';

test('課題新規登録ができる', async ({ page }) => {
  await page.goto('/tasks/new');

  await page.getByTestId('input-title').fill('Playwright 追加課題');
  await page.getByTestId('input-projectName').selectOption('営業支援システム刷新');
  await page.getByTestId('input-description').fill('E2Eで追加した課題');
  await page.getByTestId('input-assignee').selectOption('山田');
  await page.getByTestId('input-priority').selectOption('High');
  await page.getByTestId('input-status').selectOption('未対応');
  await page.getByTestId('input-dueDate').fill('2026-03-30');
  await page.getByTestId('submit-task').click();

  await expect(page).toHaveURL('/tasks');
  await expect(page.getByText('Playwright 追加課題')).toBeVisible();
});

test('必須バリデーションが表示される', async ({ page }) => {
  await page.goto('/tasks/new');
  await page.getByTestId('submit-task').click();

  await expect(page.getByText('課題タイトルは必須です')).toBeVisible();
  await expect(page.getByText('案件名は必須です')).toBeVisible();
  await expect(page.getByText('内容は必須です')).toBeVisible();
  await expect(page.getByText('担当者は必須です')).toBeVisible();
  await expect(page.getByText('期限は必須です')).toBeVisible();
});

test('課題編集ができる', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('edit-link-t-1').click();

  await page.getByTestId('input-title').fill('要件定義レビュー(更新)');
  await page.getByTestId('input-status').selectOption('完了');
  await page.getByTestId('submit-task').click();

  await expect(page).toHaveURL('/tasks');
  await expect(page.getByText('要件定義レビュー(更新)')).toBeVisible();
  await expect(page.getByRole('cell', { name: '完了' }).first()).toBeVisible();
});

test('フィルタ絞り込みができる', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('filter-priority').selectOption('Low');

  await expect(page.getByTestId('task-list-table')).toContainText('Low');
  await expect(page.getByTestId('task-list-table')).not.toContainText('High');
});

test('期限超過のみ表示できる', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('filter-overdue-only').check();

  await expect(page.getByTestId('task-list-table')).toContainText('要件定義レビュー');
  await expect(page.getByTestId('task-list-table')).toContainText('承認フロー設定の確認');
});

test('0件表示メッセージが表示される', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByTestId('filter-keyword').fill('存在しないキーワード');

  await expect(page.getByTestId('empty-message')).toBeVisible();
  await expect(page.getByTestId('empty-message')).toContainText('条件に一致する課題はありません。');
});

test('週次報告画面が表示される', async ({ page }) => {
  await page.goto('/weekly-report');

  await expect(page.getByTestId('weekly-report-page')).toBeVisible();
  await expect(page.getByTestId('weekly-summary')).toBeVisible();
  await expect(page.getByTestId('weekly-overdue-list')).toBeVisible();
  await expect(page.getByTestId('weekly-high-priority-list')).toBeVisible();
  await expect(page.getByTestId('weekly-risk-list')).toBeVisible();
  await expect(page.getByTestId('weekly-comments')).toBeVisible();
});
