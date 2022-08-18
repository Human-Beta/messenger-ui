import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

import { getSelectedChat } from '../../redux/chat/selectors';

import { Link } from 'react-router-dom';
import avatarSvg from '../../assets/img/avatar.svg';
import { getLastMessage } from '../../redux/message/selectors';
import styles from './ChatItem.module.scss';

const { sender, message, time, active } = styles;

// TODO: move somewhere (utils?)
const getDateString = (date: string): string => {
  const dateMoment = moment(date);
  const now = moment();

  if (dateMoment.isBefore(now, 'year')) {
    return dateMoment.format('DD.MM.YY');
  } else if (dateMoment.isBefore(now, 'month')) {
    return dateMoment.format('MMMM Do');
  } else if (dateMoment.isBefore(now, 'day')) {
    return dateMoment.format('ddd');
  }

  return dateMoment.format('HH:mm');
};

interface ChatItemProps {
  chat: Chat;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const selectedChat = useSelector(getSelectedChat);
  // TODO: useCallback for getLastMessage?
  const lastMessage = useSelector(getLastMessage(chat.id));

  return (
    <Link
      to={`/@${chat.chatName}`}
      className={`${styles.chat} ${chat.id === selectedChat?.id ? active : ''}`}>
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
