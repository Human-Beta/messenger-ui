import { FC, useCallback, useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import arrowSvg from '../../assets/img/arrow.svg';
import burgerMenu from '../../assets/img/burger-menu.svg';
import logoutImg from '../../assets/img/logout.svg';
import searchSvg from '../../assets/img/search.svg';
import { getSearchBy, getSearchValue, isSearhing } from '../../redux/search/selectors';
import {
  resetSearch,
  setSearchBy,
  setSearchValue,
  startSearching,
  stopSearching,
} from '../../redux/search/slice';
import { SearchBy } from '../../redux/search/types';
import { LOGOUT_USER_ACTION, useAppDispatch } from '../../redux/store';

import { findInitChats } from '../../redux/search/asyncActions';
import { extractChatName } from '../../utils/search.utils';
import styles from './Search.module.scss';

const { root, input_wrapper, logout } = styles;

export const PAGE_SIZE = 50;
export const SEARCH_VALUE_MIN_SIZE = 3;

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const searching = useSelector(isSearhing);
  const searchBy = useSelector(getSearchBy);
  const value = useSelector(getSearchValue);

  const startSearch = useCallback(() => {
    if (!searching) {
      dispatch(startSearching());
      inputRef.current?.focus();
    }
  }, [dispatch, searching]);

  const resolveSearchBy = useCallback(
    (value: string) => {
      let newSearchBy = SearchBy.CHATS_AND_MESSAGES;

      if (value.startsWith('@')) {
        newSearchBy = SearchBy.CHATS;
      }

      if (searchBy !== newSearchBy) {
        dispatch(setSearchBy(newSearchBy));
      }
    },
    [dispatch, searchBy],
  );

  const search = useCallback(
    (value: string) => {
      value = value.trim();

      if (!value) {
        return;
      }

      if (searchBy === SearchBy.CHATS) {
        const name = extractChatName(value);

        if (name) {
          dispatch(findInitChats({ name, size: PAGE_SIZE }));
        }
      }
    },
    [dispatch, searchBy],
  );

  useEffect(() => {
    const focus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(stopSearching());
      }
    };

    document.addEventListener('keydown', focus);

    return () => {
      document.removeEventListener('keydown', focus);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!searching) {
      inputRef.current?.blur();
    }
  }, [dispatch, searching]);

  return (
    <div className={root}>
      {searching ? (
        <img src={arrowSvg} className={styles.arrow} alt="arrow" />
      ) : (
        <img src={burgerMenu} className={styles.burger} alt="burger menu" />
      )}
      <div className={`${input_wrapper} ${searching ? styles.focus : ''}`} onClick={startSearch}>
        <img src={searchSvg} width="22" alt="search icon" />
        <DebounceInput
          inputRef={inputRef}
          minLength={SEARCH_VALUE_MIN_SIZE}
          debounceTimeout={300}
          placeholder="Search"
          onInput={(e: any) => {
            const currValue = e.target.value.trim();
            dispatch(setSearchValue(currValue));
            dispatch(resetSearch());
            resolveSearchBy(currValue);
          }}
          onChange={(e) => search(e.target.value)}
          value={value}
        />
      </div>
      <img
        className={logout}
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
