import React, { createContext, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { fakeAuthProvider } from "./auth";


export interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
const AuthContext = createContext<AuthContextType>(null!);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);

  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
}

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();

  // Используем локацию, чтоб после логина кинуть юзера на страницу, на которую он хотел попасть
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthContext;