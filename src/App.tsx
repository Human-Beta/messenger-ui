import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Chats from './pages/Chats';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import AuthRedirect from './AuthRedirect';
import RequireAuth from './RequireAuth';

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
        {['/', '/@:chatName'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <RequireAuth>
                <Chats />
              </RequireAuth>
            }
          />
        ))}
        {/* TODO: bug in router. Cannot use @ in the children's path*/}
        {/* <Route path="/" element={<RequireAuth />}>
          <Route index element={<Chats />} />
          <Route path="@:chatName" element={<Chats />} />
        </Route> */}
        {/* TODO: it does not work as well! React router is a shit!!! */}
        {/* <Route
          path="/(@:chatName)?"
          element={
            <RequireAuth>
              <Chats />
            </RequireAuth>
          }
        /> */}
        <Route path="/" element={<AuthRedirect />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
