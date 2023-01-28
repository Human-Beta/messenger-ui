import { FC } from 'react';
import { Link } from 'react-router-dom';
import avatarSvg from '../../../assets/img/avatar.svg';
import { stopSearching } from '../../../redux/search/slice';
import { useAppDispatch } from '../../../redux/store';
import styles from './SearchChat.module.scss';

interface SearchChatProps {
  chat: Chat;
}

const SearchChat: FC<SearchChatProps> = ({ chat }) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      to={`/@${chat.chatName}`}
      className={`${styles.root} unselectable`}
      onClick={() => {
        dispatch(stopSearching());
      }}>
      {/* TODO: get image url from server. Images should be stored on the server */}
      {/* <img src={chat.imageUrl} alt="avatar" /> */}
      <img src={avatarSvg} alt="avatar" width={40} />
      <span className={styles.name}>{chat.name}</span>
      <span className={styles.chat_name}>@{chat.chatName}</span>
    </Link>
  );
};

export default SearchChat;
