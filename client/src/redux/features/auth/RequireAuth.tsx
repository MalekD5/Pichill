import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';
import { setCredentials } from './authSlice';
import { Loading } from '../../../components';

export default function RequireAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setCredentials({
            email: user.email,
            username: user.displayName,
          }),
        );
        setLoggedIn(true);
      } else {
        navigate('/login');
      }
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loggedIn ? <Outlet /> : <Loading />;
}
