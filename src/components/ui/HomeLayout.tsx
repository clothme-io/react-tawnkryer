import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const HomeLayout = () => {
  const { userId, email } = useAuth();

  if (userId && email) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav> */}
      <Outlet />
    </div>
  )
};