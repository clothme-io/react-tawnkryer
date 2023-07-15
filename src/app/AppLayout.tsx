import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
