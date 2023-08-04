import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, PenTool, Book, KeyIcon } from 'lucide-react';
import {
  IconNotes,
  IconCalendarStats,
  IconPencil,
  IconPresentationAnalytics,
  IconKey,
  IconSettings,
} from '@tabler/icons-react';
import { WriterPage } from '../../pages/writer/WriterPage';
import { TopicalAuthorityKeywordPage } from '../../pages/keyword/TopicalAuthorityKeywordPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { MainNavBar } from './main-nav-bar';
import { ContentOutlinePage } from '../../pages/outline/ContentOutline';

import { RequireAuth } from '../../pages/UseAuth';
import { SettingPage } from '../../pages/setting/SettingPage';
import { SideBarFullNested } from './side-bar-full';

export const SideBarRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: <Sidebar />,
    isPrivate: false,
    margin: true,
    icon: <LayoutDashboard />,
    children: [
      {
        path: '/dashboard',
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/keyword',
    name: 'Keyword',
    element: <Sidebar />,
    isPrivate: false,
    margin: true,
    icon: <KeyIcon />,
    children: [
      {
        path: '/keyword',
        element: (
          <RequireAuth>
            <TopicalAuthorityKeywordPage />
          </RequireAuth>
        ),
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/outline',
    name: 'Outline',
    element: <Sidebar />,
    isPrivate: false,
    margin: true,
    icon: <Book />,
    children: [
      {
        path: '/outline',
        element: (
          <RequireAuth>
            <ContentOutlinePage />
          </RequireAuth>
        ),
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/writer',
    name: 'Writer',
    element: <Sidebar />,
    isPrivate: false,
    margin: true,
    icon: <PenTool />,
    children: [
      {
        path: '/writer',
        element: (
          <RequireAuth>
            <WriterPage />
          </RequireAuth>
        ),
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/setting',
    name: 'Setting',
    element: <Sidebar />,
    isPrivate: false,
    margin: true,
    icon: <PenTool />,
    children: [
      {
        path: '/setting',
        element: (
          <RequireAuth>
            <SettingPage />
          </RequireAuth>
        ),
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/',
    name: 'Sign Out',
    isPrivate: false,
    margin: true,
    icon: <PenTool />,
  },
];

export const routesData = [
  {
    label: 'Dashboard',
    icon: IconPresentationAnalytics,
    path: '/dashboard',
    element: <Sidebar />,
    hasChildren: true,
    // children: [
    //   {
    //     path: '/dashboard',
    //     element: (
    //       <RequireAuth>
    //         <DashboardPage />
    //       </RequireAuth>
    //     ),
    //     // loader: eventLoader,
    //   },
    // ],
  },
  {
    label: 'Keyword',
    icon: IconKey,
    element: <Sidebar />,
    hasChildren: true,
    children: [
      {
        label: 'Topical Authority',
        path: '/topical-authority-keyword',
        element: (
          <RequireAuth>
            <TopicalAuthorityKeywordPage />
          </RequireAuth>
        ),
      },
      {
        label: 'Topical Gap',
        path: '/topical-gap-keyword',
        element: (
          <RequireAuth>
            <SettingPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    label: 'Outline',
    icon: IconNotes,
    element: <Sidebar />,
    hasChildren: true,
    children: [
      {
        label: 'Topical Authority',
        path: '/topical-authority-outline',
        element: (
          <RequireAuth>
            <SettingPage />
          </RequireAuth>
        ),
      },
      { label: 'Topical Gap', path: '/topical-gap-outline' },
    ],
  },
  {
    label: 'Writer',
    icon: IconPencil,
    element: <Sidebar />,
    hasChildren: true,
    children: [
      {
        label: 'Topical Authority',
        path: '/dashboard',
        element: (
          <RequireAuth>
            <SettingPage />
          </RequireAuth>
        ),
      },
      {
        label: 'Topical Gap',
        path: '/topical-gap-writer',
        element: (
          <RequireAuth>
            <SettingPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    label: 'Scheduler',
    icon: IconCalendarStats,
    element: <Sidebar />,
    hasChildren: true,
    children: [
      {
        label: 'Topical Authority',
        path: '/dashboard',
        element: (
          <RequireAuth>
            <SettingPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    label: 'Settings',
    icon: IconSettings,
    element: <Sidebar />,
    path: '/setting',
    hasChildren: false,
    // children: [
    //   {
    //     label: 'Setting',
    //     path: '/setting',
    //     element: (
    //       <RequireAuth>
    //         <SettingPage />
    //       </RequireAuth>
    //     ),
    //   },
    // ],
  },
];

export function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <section className="flex">
      <SideBarFullNested open={open} routesData={routesData} />
      <div className="grow text-xl text-gray-900 font-semibold bg-[#f9fafc]">
        <MainNavBar open={open} setOpen={setOpen} />
        <Outlet />
      </div>
    </section>
  );
}
