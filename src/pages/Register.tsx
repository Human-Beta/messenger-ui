import React from 'react';

const Register = () => {
  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={register} className="register" method="POST">
      <input type="text" placeholder="Nickname" name="nickname" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm password" name="password-confirm" />
      <button>Register</button>
    </form>
  );
};

export default Register;
