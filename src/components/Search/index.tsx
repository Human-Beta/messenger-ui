import React from 'react';
import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';
import logoutImg from '../../assets/img/logout.svg';
import { LOGOUT_USER_ACTION, useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const { root, input_wrapper, logout } = styles;

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = React.useState<string>('');

  const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={root}>
      <div className={input_wrapper}>
        <img width="22" src={searchSvg} alt="search icon" />
        <input onChange={updateInputValue} value={inputValue} type="text" placeholder="Search" />
      </div>
      <img
        className={logout}
        width="20"
        src={logoutImg}
        alt="logout"
        onClick={() => {
          dispatch(LOGOUT_USER_ACTION);
          navigate('/login');
        }}
      />
    </div>
  );
};

export default Search;
