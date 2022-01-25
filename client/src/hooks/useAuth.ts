import { UserState } from "../store/authSlice";
import { getUserFromLocalStorage } from "../utils/authUtils"

export const useAuth = () => {
  const user = getUserFromLocalStorage();
  return user || {
    userData: {
      uuid: '',
      name: ''
    },
    accessToken: '',
    refreshToken: '',
  };
}
