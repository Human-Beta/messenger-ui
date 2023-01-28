import { FC, FormEvent, useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/auth/asyncActions';
import { useAppDispatch } from '../redux/store';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const resetValidationMsgs = useCallback(() => {
    setErrorMsg('');
    setNicknameMsg('');
    setPasswordMsg('');
  }, []);

  // TODO: validation service
  const validate = useCallback((nickname: string, password: string) => {
    let result = true;

    nickname = nickname.trim();
    password = password.trim();

    if (!nickname) {
      setNicknameMsg('Nickname should not be empty');
      result = false;
    }

    if (!password) {
      setPasswordMsg('Password should not be empty');
      result = false;
    }

    return result;
  }, []);

  const login = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      resetValidationMsgs();

      const nickname = nicknameRef.current!.value;
      const password = passwordRef.current!.value;

      if (!validate(nickname, password)) {
        return;
      }

      dispatch(getToken({ nickname, password }))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((resp) => {
          if (resp.status === 400 && resp.error_description === 'Bad credentials') {
            setErrorMsg('There is no user with these nickname and password');
          }
        });
    },
    [dispatch, navigate, validate, resetValidationMsgs],
  );

  return (
    <div className="login-wrapper">
      <form onSubmit={login} className="login" method="POST">
        <p className="error">{errorMsg}</p>
        <span className="error">{nicknameMsg}</span>
        <input type="text" placeholder="Nickname" name="nickname" ref={nicknameRef} />
        <span className="error">{passwordMsg}</span>
        <input type="password" placeholder="Password" name="password" ref={passwordRef} />
        <button>Login</button>
        <p className="redirect">
          Not a member? <Link to="/register">Signup now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
