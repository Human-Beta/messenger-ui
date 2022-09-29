import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthRedirect from './AuthRedirect';
import Chats from './pages/Chats';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { isSearhing } from './redux/search/selectors';
import RequireAuth from './RequireAuth';

const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searching = useSelector(isSearhing);

  useEffect(() => {
    const navigateToHome = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && location.pathname !== '/' && !searching) {
        navigate('/');
      }
    };

    document.addEventListener('keydown', navigateToHome);

    return () => {
      document.removeEventListener('keydown', navigateToHome);
    };
  }, [navigate, location, searching]);

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
