import { FC } from 'react';
import SearchChats from '../SearchChats';
import SearchMessages from '../SearchMessages';

const SearchResult: FC = () => {
  return (
    <div className="scrollable">
      <SearchChats />
      <SearchMessages />
    </div>
  );
};

export default SearchResult;
