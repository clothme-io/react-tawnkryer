import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  PenTool,
  Book,
  KeyIcon,
  ChevronLeftCircle,
  ChevronRightCircle,
} from 'lucide-react';
import { WriterPage } from '../../pages/writer/WriterPage';
import { KeywordPage } from '../../pages/keyword/KeywordPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { MainNavBar } from './main-nav-bar';
import { ContentOutlinePage } from '../../pages/outline/ContentOutline';

import { RequireAuth } from '../../pages/UseAuth';

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
      <div
        className={`basis-1/8 bg-[#fafafa] min-h-screen ${
          open ? 'w-60' : 'w-16'
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          {open ? (
            <ChevronLeftCircle
              size={26}
              className="cursor-pointer text-black"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <ChevronRightCircle
              size={26}
              className="cursor-pointer text-black"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
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
        </div>
      </div>
      <div className="grow m-3 text-xl text-gray-900 font-semibold">
        <MainNavBar />
        <Outlet />
      </div>
    </section>
  );
}
