import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from './services/localStorage.service';

const AuthRedirect: FC = () => {
  return getAccessToken() ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
