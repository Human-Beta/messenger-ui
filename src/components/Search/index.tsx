import React from 'react';
import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';

const { root, input_wrapper } = styles;

const Search: React.FC = () => {
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
    </div>
  );
};

export default Search;
