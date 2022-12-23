import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

export const useAuthHook = () => {
  const user = useSelector(selectCurrentUser);

  return {
    user,
    isLoggedIn() {
      return !!user.email;
    },
  };
};
