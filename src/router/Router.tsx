import { Routes, Route, Outlet } from 'react-router-dom';
import { HomePage } from '../pages/home/HomePage';
import { SettingPage } from '../pages/setting/SettingPage';
import { EntityPage } from '../pages/keyword/EntityPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ContentOutlinePage } from '../pages/outline/ContentOutline';
import { CreateAccountPage } from '../pages/auth/createAccount/CreateAccount';
import { LoginPage } from '../pages/auth/login/LoginPage';
import { WriterPage } from '../pages/writer/WriterPage';
import { SchedulerPage } from '../pages/scheduler/SettingPage';
import { AntSidebar } from '../components/ui/antSideBar';

export function SimpleRouter() {
  return (
    <Routes>
      <Route element={<AntSidebar />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/entity" element={<EntityPage />} />
        <Route path="/outline" element={<ContentOutlinePage />} />
        <Route path="/writer" element={<WriterPage />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
      
      <Route element={<div> <Outlet /> </div>}>
        <Route path="/register" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
