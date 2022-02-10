import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { checkTokenExpiration } from "../../utils/authUtils";


export interface AuthRouteProps {
  children: React.ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();


  const isRefreshTokenExpired = useMemo(() => {
    return auth.user.refreshToken 
    ? checkTokenExpiration(auth.user.refreshToken)
    : true
  }
  , [checkTokenExpiration, auth]);
  

  if (isRefreshTokenExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRoute;