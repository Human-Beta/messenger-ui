import React from 'react';

const Login = () => {
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Login');
    // localStorage.setUser(user)
  };

  return (
    <form onSubmit={login} className="register" method="POST">
      <input type="text" placeholder="Nickname" name="nickname" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm password" name="password-confirm" />
      <button>Register</button>
    </form>
  );
};

export default Login;
