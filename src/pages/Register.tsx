import { FormEvent, useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { registerUser } from '../redux/user/asyncActions';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nicknameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const resetValidationMsgs = useCallback(() => {
    setErrorMsg('');
    setNicknameError('');
    setNameError('');
    setPasswordError('');
    setPasswordConfirmError('');
  }, []);

  // TODO: validation service
  const validate = useCallback(
    (nickname: string, name: string, pwd: string, pwdConfirm: string) => {
      let result = true;

      nickname = nickname.trim();
      name = name.trim();

      if (!nickname) {
        setNicknameError('Nickname should not be empty');
        result = false;
      } else if (nickname.length > 32) {
        setNicknameError('Nickname length greater than 32');
        result = false;
      }

      if (!name) {
        setNameError('Name should not be empty');
        result = false;
      } else if (name.length > 64) {
        setNameError('Name length greater than 32');
        result = false;
      }

      if (!pwd) {
        setPasswordError('Password should not be empty');
        result = false;
      } else if (pwd.length > 15) {
        setPasswordError('Password length greater than 15');
        result = false;
      } else if (pwd !== pwdConfirm) {
        setPasswordConfirmError('Passwords are not the same');
        result = false;
      }

      return result;
    },
    [],
  );

  const register = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      resetValidationMsgs();

      const nickname = nicknameRef.current!.value;
      const name = nameRef.current!.value;
      const password = passwordRef.current!.value;
      const passwordConfirm = passwordConfirmRef.current!.value;

      if (!validate(nickname, name, password, passwordConfirm)) {
        return;
      }

      dispatch(registerUser({ nickname, name, password }))
        .unwrap()
        .then(() => {
          navigate('/login');
        })
        .catch((resp) => {
          if (resp.status === 409) {
            setErrorMsg(resp.message);
          }

          // TODO: validation from server?

          console.log('err', resp);
        });
    },
    [dispatch, navigate, resetValidationMsgs, validate],
  );

  return (
    <div className="register-wrapper">
      <form onSubmit={register} className="register" method="POST">
        <p className="error">{errorMsg}</p>
        <span className="error">{nicknameError}</span>
        <input type="text" placeholder="Nickname" name="nickname" ref={nicknameRef} />
        <span className="error">{nameError}</span>
        <input type="text" placeholder="Name" name="name" ref={nameRef} />
        <span className="error">{passwordError}</span>
        <input type="password" placeholder="Password" name="password" ref={passwordRef} />
        <span className="error">{passwordConfirmError}</span>
        <input
          type="password"
          placeholder="Confirm password"
          name="password_confirm"
          ref={passwordConfirmRef}
        />
        <button>Register</button>
        <p className="redirect">
          Have an account? <Link to="/login">Signin now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
