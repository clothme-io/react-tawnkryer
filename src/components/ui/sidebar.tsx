import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, PenTool, KeyIcon, Link2 } from 'lucide-react';
import { WriterPage } from '../../pages/writer/WriterPage';
import { KeywordPage } from '../../pages/keyword/KeywordPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';

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
        element: <DashboardPage />,
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
        element: <KeywordPage />,
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
        element: <WriterPage />,
        // loader: eventLoader,
      },
    ],
  },
];

export function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#444141] min-h-screen ${
          open ? 'w-72' : 'w-16'
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <Link2
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {SideBarRoutes?.map((menu, i) => (
            <Link
              to={menu?.path}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
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
      <div className="m-3 text-xl text-gray-900 font-semibold">
        <Outlet />
      </div>
    </section>
  );
}
