import { Outlet } from 'react-router-dom';
import { HomeNavBar } from '../components/ui/homeNavbar';

export function AppLayout() {
  return (
    <div>
      <div className="sticky top-0 z-30 max-h-full bg-white">
        <HomeNavBar />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
