import Search from '../Search';
import ChatList from '../ChatList';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.root}>
      <Search />
      <ChatList />
    </div>
  );
};

export default Sidebar;
