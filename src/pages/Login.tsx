import React from 'react';

const Login = () => {
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Login');
    // localStorage.setUser(user)
  };

  return (
    <form onSubmit={login} className="login" method="POST">
      <input type="text" placeholder="Nickname" name="nickname" />
      <input type="password" placeholder="Password" name="password" />
      <button>Login</button>
    </form>
  );
};

export default Login;
