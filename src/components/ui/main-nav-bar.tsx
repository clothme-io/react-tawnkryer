/* eslint-disable react/destructuring-assignment */
// import { CalendarDateRangePicker } from '@/app/examples/dashboard/components/date-range-picker';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';

export function MainNavBar(props: {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  return (
    <div className="hidden flex-col md:flex mb-10 lg:max-w-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex justify-end">
            {props.open ? (
              <ChevronLeftCircle
                size={26}
                className="cursor-pointer text-black"
                onClick={() => props.setOpen(!props.open)}
              />
            ) : (
              <ChevronRightCircle
                size={26}
                className="cursor-pointer text-black"
                onClick={() => props.setOpen(!props.open)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
