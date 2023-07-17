import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Typography,
  Button,
  IconButton,
  Input,
} from '@material-tailwind/react';
import { Separator } from '../../../components/ui/separator';

const TABLE_HEAD = ['Keyword', 'Date'];

const TABLE_ROWS = [
  {
    name: 'Spotify for best music',
    date: 'Wed 3:00pm',
    expiry: '06/2026',
  },
  {
    name: 'Jeans for short men',
    date: 'Wed 1:00pm',
    expiry: '06/2026',
  },
  {
    name: 'Poshmark',
    date: 'Mon 7:40pm',
    expiry: '06/2026',
  },
  {
    name: 'Best Converse shoes for men',
    date: 'Wed 5:00pm',
    expiry: '06/2026',
  },
  {
    name: "Men's Converse Shoes",
    date: 'Wed 3:30am',
    expiry: '06/2026',
  },
];

export function SingleKeywordWriter() {
  return (
    <div className="h-full w-full">
      <div className="rounded-none">
        <div className="mb-4 flex flex-row justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
            <div className="w-full md:w-72 pt-6">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="overflow-scroll px-0"> */}
      <div className="px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between mt-6">
        <Button variant="outlined" color="blue-gray" size="sm" className="mr-3">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            8
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            9
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" color="blue-gray" size="sm" className="ml-3">
          Next
        </Button>
      </div>
    </div>
  );
}
