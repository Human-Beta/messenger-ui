import React from 'react';
import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';

const { root, input_wrapper } = styles;

const Search = () => {
  const [inputValue, setInputValue] = React.useState('');

  const changeInputValue = (event) => setInputValue(event.target.value);

  return (
    <div className={root}>
      <div className={input_wrapper}>
        <img width="22" src={searchSvg} alt="search icon" />
        <input onChange={changeInputValue} value={inputValue} type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default Search;
