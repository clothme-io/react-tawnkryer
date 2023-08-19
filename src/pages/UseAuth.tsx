import { useLocation, Navigate } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const loggedInUser = localStorage.getItem('tempUser');

  if (!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
