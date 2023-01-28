import { FC } from 'react';
import SearchChatsResult from '../SearchChatsResult';
import SearchMessages from '../SearchMessages';

const SearchResult: FC = () => {
  return (
    <div className="scrollable">
      <SearchChatsResult />
      <SearchMessages />
    </div>
  );
};

export default SearchResult;
