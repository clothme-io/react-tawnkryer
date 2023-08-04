/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import { ReactNode, useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  open: boolean;
  initiallyOpened?: boolean;
  hasChildren?: boolean;
  path?: string;
  children?: { label: string; path: string; element: ReactNode }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  open,
  hasChildren,
  path,
  children,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(children);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

  console.log('This is has children *****************', hasChildren);
  console.log('This is has children *****************', hasChildren);
  console.log('This is has PAth *****************', path);
  return (
    <>
      <UnstyledButton
        onClick={() => (open && hasChildren ? setOpened((o) => !o) : null)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            {open ? <Box ml="md">{label}</Box> : <div />}
          </Box>
          {hasLinks && open && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && hasChildren ? (
        <Collapse in={opened}>
          {children.map((child, index) => (
            <Link to={child.path} key={index} className={classes.link}>
              <Text>{child.label}</Text>
            </Link>
          ))}
        </Collapse>
      ) : (
        <Link to={path as string} className={classes.link}>
          {/* <Collapse in={opened}> */}
          <Text>{label}</Text>
          {/* </Collapse> */}
        </Link>
      )}
    </>
  );
}
