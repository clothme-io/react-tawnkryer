import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface ContextType {
  userId: any;
  email: any;
  projectId: any;
  login: any;
  logout: any;
  addProjectId: any;
}

const AuthContext = createContext<ContextType>({
  userId: undefined,
  email: undefined,
  projectId: undefined,
  login: undefined,
  logout: undefined,
  addProjectId: undefined,
});

export const AuthProvider = ({ children }: any) => {
  const [userId, setUser] = useLocalStorage("tempUserId", null);
  const [email, setEmail] = useLocalStorage("tempEmail", null);
  const [projectId, setProjectId] = useLocalStorage("tempProjectId", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = (userId: string, email: string) => {
    setUser(userId);
    setEmail(email);
    navigate("/dashboard");
  };

  const addProjectId = (projectId: string) => {
    setProjectId(projectId);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setEmail(null);
    setProjectId(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      userId,
      email,
      projectId,
      login,
      logout,
      addProjectId
    }),
    [userId, email, projectId]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};