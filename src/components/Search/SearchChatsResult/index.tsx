import { FC } from 'react';
import { useSelector } from 'react-redux';
import { SEARCH_VALUE_MIN_SIZE } from '..';
import { Status } from '../../../@types/status';
import { getFoundChats, getInitChatsStatus, getSearchValue } from '../../../redux/search/selectors';
import SearchUnknownUsers from './SearchUnknownUsers';
import SearchChats from './SearchChats';

const SearchChatsResult: FC = () => {
  const chats = useSelector(getFoundChats);
  const searchValue = useSelector(getSearchValue);
  const status = useSelector(getInitChatsStatus);

  if (searchValue.length < SEARCH_VALUE_MIN_SIZE || status < Status.SUCCESS) {
    return <></>;
  }

  if (chats.length) {
    return <SearchChats />;
  }

  return <SearchUnknownUsers />;
};

export default SearchChatsResult;
