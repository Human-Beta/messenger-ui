import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import avatarSvg from '../../assets/img/avatar.svg';
import { getSelectedChat } from '../../redux/chat/selectors';
import { getLastMessage } from '../../redux/message/selectors';
import { getDateString } from '../../utils';
import styles from './ChatItem.module.scss';

const { sender, message, time, active } = styles;

interface ChatItemProps {
  chat: Chat;
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const selectedChat = useSelector(getSelectedChat);
  const lastMessage = useSelector(getLastMessage(chat.id));

  return (
    <Link
      to={`/@${chat.chatName}`}
      className={`${styles.chat} unselectable ${chat.id === selectedChat?.id ? active : ''}`}>
      {/* TODO: get image url from server. Images should be stored on the server */}
      {/* <img src={chat.imageUrl} alt="avatar" /> */}
      <img src={avatarSvg} alt="avatar" />
      <span className={sender}>{chat.name}</span>
      <span className={message}>{lastMessage.value}</span>
      <span className={time}>{getDateString(lastMessage.date)}</span>
    </Link>
  );
};

export default ChatItem;
