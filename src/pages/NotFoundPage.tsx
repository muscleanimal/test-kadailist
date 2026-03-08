import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section>
      <h2>ページが見つかりません</h2>
      <Link to="/">ダッシュボードへ戻る</Link>
    </section>
  );
}
