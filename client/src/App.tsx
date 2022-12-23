import { Routes, Route } from 'react-router-dom';
import { Layout, Public } from './components';
import { Welcome, NotFound, Login, Register } from './page';
import { RequireAuth } from './redux/features/auth';
import RedirectAuthed from './redux/features/auth/RedirectAuthed';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route element={<RedirectAuthed />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='welcome' element={<Welcome />} />
        </Route>

        <Route element={<NotFound />} path='*' />
      </Route>
    </Routes>
  );
}

export default App;
