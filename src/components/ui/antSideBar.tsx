import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  DesktopOutlined,
  BookOutlined,
  PieChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { useAuth } from '../../hooks/useAuth';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Entity', '/entity', <DesktopOutlined />),
  getItem('Cluster', '/cluster', <DesktopOutlined />),
  getItem('Outline', '/outline', <DesktopOutlined />),
  getItem('Writer', '/writer', <BookOutlined />),
  getItem('Scheduler', '/scheduler', <DesktopOutlined />),
  getItem('Setting', '/setting', <SettingOutlined />),
  getItem('Sign Out', '/signout', <PoweroffOutlined />),
];

export function AntSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMen] = useState('');
  const { userId, email, logout } = useAuth();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!userId || !email) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="text-white text-2xl font-bold flex justify-center items-center bg-blue-gray-500 h-16">
          <p>T</p>
        </div> */}
        <Menu
          theme="dark"
          defaultSelectedKeys={['/dashboard']}
          activeKey={selectedMenu}
          items={items}
          onClick={({ key }) => {
            if (key === '/signout') {
              logout();
            } else {
              navigate(key);
              setSelectedMen(key);
            }
          }}
          style={{
            paddingTop: '60px',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            maxWidth: (collapsed as unknown as number) ? 40 : 200,
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '0px 6px',
            padding: 24,
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
