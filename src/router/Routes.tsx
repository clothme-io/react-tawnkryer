import { Home, LogIn } from 'lucide-react';
import { AppLayout } from '../app/AppLayout';
import { HomePage } from '../pages/home/HomePage';
import { LoginPage } from '../pages/auth/login/LoginPage';
import { AuthLayout } from '../pages/auth/AuthLayout';
import { CreateAccountPage } from '../pages/auth/createAccount/CreateAccount';

export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <AppLayout />,
    isPrivate: false,
    margin: true,
    icon: <Home />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    element: <AuthLayout />,
    isPrivate: false,
    margin: true,
    icon: <LogIn />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        // loader: eventLoader,
      },
    ],
  },
  {
    path: '/create-account',
    name: 'Create Account',
    element: <AuthLayout />,
    isPrivate: false,
    margin: true,
    icon: <LogIn />,
    children: [
      {
        path: '/create-account',
        element: <CreateAccountPage />,
        // loader: eventLoader,
      },
    ],
  },
];
