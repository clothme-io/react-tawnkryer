/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

interface ContextType {
  userId: any;
  email: any;
  projectId: any;
  login: any;
  logout: any;
  addProjectId: any;
  addCurrentEntityId: any;
}

const AuthContext = createContext<ContextType>({
  userId: undefined,
  email: undefined,
  projectId: undefined,
  login: undefined,
  logout: undefined,
  addProjectId: undefined,
  addCurrentEntityId: undefined,
});

export function AuthProvider({ children }: any) {
  const [userId, setUser] = useLocalStorage('tempUserId', null);
  const [email, setEmail] = useLocalStorage('tempEmail', null);
  const [projectId, setProjectId] = useLocalStorage('tempProjectId', null);
  const [entityId, setEntityId] = useLocalStorage('tempEntityId', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = (userId: string, email: string) => {
    setUser(userId);
    setEmail(email);
    navigate('/dashboard');
  };

  const addProjectId = (projectId: string) => {
    setProjectId(projectId);
  };

  const addCurrentEntityId = (entityId: string) => {
    setEntityId(entityId);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setEmail(null);
    setProjectId(null);
    setEntityId(null);
    localStorage.removeItem('tempUserId');
    localStorage.removeItem('tempEmail');
    localStorage.removeItem('tempProjectId');
    localStorage.removeItem('tempEntityId');
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      userId,
      email,
      projectId,
      entityId,
      login,
      logout,
      addProjectId,
      addCurrentEntityId,
    }),
    [userId, email, projectId, entityId]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
