import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, PenTool, Book, KeyIcon } from 'lucide-react';
import { WriterPage } from '../../pages/writer/WriterPage';
import { KeywordPage } from '../../pages/keyword/KeywordPage';
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
            <KeywordPage />
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

export function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <section className="flex">
      <SideBarFullNested open={open} />
      {/* <div className="mt-4 flex flex-col gap-4 relative">
          {SideBarRoutes?.map((menu, i) => (
            <Link
              to={menu?.path}
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm text-black gap-3.5 font-medium p-2 hover:bg-gray-800 hover:text-white rounded-md active:bg-gray-800 active:text-white`}
            >
              {menu?.icon}
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div> */}
      <div className="grow text-xl text-gray-900 font-semibold bg-[#f9fafc]">
        <MainNavBar open={open} setOpen={setOpen} />
        <Outlet />
      </div>
    </section>
  );
}
