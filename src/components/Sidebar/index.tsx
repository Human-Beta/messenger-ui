import { FC } from 'react';
import { useSelector } from 'react-redux';
import { isSearhing } from '../../redux/search/selectors';
import ChatList from '../ChatList';
import Search from '../Search';
import SearchResult from '../Search/SearchResult';

const Sidebar: FC = () => {
  const searching = useSelector(isSearhing);

  return (
    <div className="sidebar">
      <Search />
      {searching ? <SearchResult /> : <ChatList />}
    </div>
  );
};

export default Sidebar;
