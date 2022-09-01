import { FC } from 'react';
import ChatList from '../ChatList';
import Search from '../Search';

const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <Search />
      <ChatList />
    </div>
  );
};

export default Sidebar;
