import { FC } from 'react';
import { useSelector } from 'react-redux';
import { SEARCH_VALUE_MIN_SIZE } from '..';
import { getFoundChats, getSearchValue } from '../../../redux/search/selectors';
import GlobalSearchChats from './GlobalSearchChats';
import SearchChats from './SearchChats';

const SearchChatsResult: FC = () => {
  const chats = useSelector(getFoundChats);
  const searchValue = useSelector(getSearchValue);

  if (searchValue.length < SEARCH_VALUE_MIN_SIZE) {
    return <></>;
  }

  if (chats.length) {
    return <SearchChats />;
  }

  return <GlobalSearchChats />;
};

export default SearchChatsResult;
