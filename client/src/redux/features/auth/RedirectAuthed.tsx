import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { Loading } from '../../../components';

export default function RedirectAuthed() {
  const [state, setState] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setState(user ? 1 : -1);
    });
    return () => {
      unsub();
    };
  }, []);

  switch (state) {
    case 1:
      return <Navigate to='/welcome' state={{ from: location }} replace />;
    case -1:
      return <Outlet />;
    default:
      return <Loading />;
  }
}
