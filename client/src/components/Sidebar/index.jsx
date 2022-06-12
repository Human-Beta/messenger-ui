import styles from './Sidebar.module.scss';
import Search from '../Search';
import ChatList from '../ChatList';

const Sidebar = () => {
  return (
    <div className={styles.root}>
      <Search />
      <ChatList />
    </div>
  );
};

export default Sidebar;
