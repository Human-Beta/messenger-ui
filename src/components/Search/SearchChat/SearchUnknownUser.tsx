import { FC } from 'react';
import { Link } from 'react-router-dom';
import avatarSvg from '../../../assets/img/avatar.svg';
import { stopSearching } from '../../../redux/search/slice';
import { getCreateNewChatAction, useAppDispatch } from '../../../redux/store';
import styles from './SearchChat.module.scss';

const SearchUnknownUser: FC<User> = (user) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      to={`/@${user.nickname}`}
      className={`${styles.root} unselectable`}
      onClick={() => {
        dispatch(stopSearching());
        dispatch(getCreateNewChatAction(user));
      }}>
      {/* TODO: get image url from server. Images should be stored on the server */}
      {/* <img src={avatarUrl} alt="avatar" /> */}
      <img src={avatarSvg} alt="avatar" width={40} />
      <span className={styles.name}>{user.name}</span>
      <span className={styles.chat_name}>@{user.nickname}</span>
    </Link>
  );
};

export default SearchUnknownUser;
