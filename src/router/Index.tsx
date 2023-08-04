import { createBrowserRouter } from 'react-router-dom';
import { routes } from './Routes';
import { routesData } from '../components/ui/sidebar';

const menuRoutes = [...routes, ...routesData];
export const router = createBrowserRouter(menuRoutes);
