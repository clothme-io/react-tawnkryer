import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface ContextType {
  userId: any;
  email: any;
  login: any;
  logout: any;
}

const AuthContext = createContext<ContextType>({
  userId: undefined,
  email: undefined,
  login: undefined,
  logout: undefined
});

export const AuthProvider = ({ children }: any) => {
  const [userId, setUser] = useLocalStorage("tempUserId", null);
  const [email, setEmail] = useLocalStorage("tempEmail", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = (userId: string, email: string) => {
    setUser(userId);
    setEmail(email);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setEmail(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      userId,
      email,
      login,
      logout
    }),
    [userId, email]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};