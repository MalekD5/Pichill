import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { selectCurrentUser, logOut } from '../redux/features/auth/authSlice';
import { auth } from '../firebase';

export default function Welcome() {
  const { email, username } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  async function handleLogout() {
    await signOut(auth);
    dispatch(logOut(null));
  }

  return (
    <div>
      <h1>
        Welcome {email} {username}
      </h1>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
