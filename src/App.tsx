import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Chats from './pages/Chats';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { RequireAuth } from './RequireAuth';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className="app">
      <Routes>
        <Route
          index
          element={
            <RequireAuth>
              <Chats />
            </RequireAuth>
          }
        />
        <Route
          path="/@:chatName"
          element={
            <RequireAuth>
              <Chats />
            </RequireAuth>
          }
        />
        {/* TODO: bug in router. Cannot use @ in the children's path*/}
        {/* <Route path="/" element={<RequireAuth />}>
          <Route index element={<Chats />} />
          <Route path="@:chatName" element={<Chats />} />
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
