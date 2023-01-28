import Search from '../Search';
import ChatList from '../ChatList';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Search />
      <ChatList />
    </div>
  );
};

export default Sidebar;
