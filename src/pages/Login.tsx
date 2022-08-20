import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/auth/asyncActions';
import { useAppDispatch } from '../redux/store';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nickname && password) {
      dispatch(getToken({ nickname, password })).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <form onSubmit={login} className="login" method="POST">
      <input
        type="text"
        placeholder="Nickname"
        name="nickname"
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
