/* eslint-disable react/destructuring-assignment */
import { Navbar, createStyles } from '@mantine/core';
import { LinksGroup } from './linkGroup';

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

export function SideBarFullNested(props: { open: boolean; routesData: any }) {
  const { classes } = useStyles();
  const links = props.routesData.map((item: any) => (
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
