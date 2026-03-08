import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'ダッシュボード', testId: 'nav-dashboard' },
  { to: '/tasks', label: '課題一覧', testId: 'nav-tasks' },
  { to: '/tasks/new', label: '課題登録', testId: 'nav-task-new' },
  { to: '/weekly-report', label: '週次報告', testId: 'nav-weekly-report' }
];

export function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div>
          <h1 className="app-title">週次進捗報告ダッシュボード付き課題管理アプリ</h1>
          <p className="app-subtitle">PMO向け Progress / Issue / Risk 可視化</p>
        </div>
      </header>

      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            data-testid={item.testId}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
