import { RouterProvider } from 'react-router-dom';
import { router } from '../router/Index';

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
