/* eslint-disable react/destructuring-assignment */
import { Navbar, createStyles } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconPencil,
  IconPresentationAnalytics,
  IconKey,
  IconSettings,
} from '@tabler/icons-react';
import { LinksGroup } from './linkGroup';

const mockdata = [
  { label: 'Dashboard', icon: IconPresentationAnalytics, path: '/dashboard' },
  {
    label: 'Keyword',
    icon: IconKey,
    links: [
      { label: 'Topical Authority', path: '/topical-authority-keyword' },
      { label: 'Topical Gap', path: '/topical-gap-keyword' },
    ],
  },
  {
    label: 'Outline',
    icon: IconNotes,
    links: [
      { label: 'Topical Authority', path: '/topical-authority-outline' },
      { label: 'Topical Gap', path: '/topical-gap-outline' },
    ],
  },
  {
    label: 'Writer',
    icon: IconPencil,
    links: [
      {
        label: 'Topical Authority',
        path: '/dashboard',
      },
      { label: 'Topical Gap', path: '/topical-gap-writer' },
    ],
  },
  { label: 'Scheduler', icon: IconCalendarStats },
  { label: 'Settings', icon: IconSettings, path: '/setting' },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export function SideBarFullNested(props: { open: boolean }) {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup open={props.open} {...item} key={item.label} />
  ));

  return (
    <Navbar width={props.open ? { base: 210 } : { base: 70 }} p="lg">
      <Navbar.Section mt={50} className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
