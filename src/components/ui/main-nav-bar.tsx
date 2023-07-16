// import { CalendarDateRangePicker } from '@/app/examples/dashboard/components/date-range-picker';
import { ProjectSwitcher } from './projectswitcher';
import { UserNav } from './usernav';

export function MainNavBar() {
  return (
    <div className="hidden flex-col md:flex mb-10 lg:max-w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <ProjectSwitcher />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
