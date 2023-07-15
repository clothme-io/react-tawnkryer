import { createBrowserRouter } from 'react-router-dom';
import { routes } from './Routes';
import { SideBarRoutes } from '../components/ui/sidebar';

const menuRoutes = [...routes, ...SideBarRoutes];
export const router = createBrowserRouter(menuRoutes);
