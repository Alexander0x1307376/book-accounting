import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserData, getUserFromLocalStorage } from "../utils/authUtils";

const defaultValues = {
  userData: {
    uuid: '',
    name: ''
  },
  accessToken: '',
  refreshToken: '',
};

export const useAuth = () => {

  const navigate = useNavigate();

  const logout = () => {
    clearUserData();
    navigate('/login');
  }

  const getUser = useRef(getUserFromLocalStorage);

  const user = useMemo(() => {
    return getUser.current() || defaultValues;
  }, [getUser]);

  return {user, logout}; 
};
