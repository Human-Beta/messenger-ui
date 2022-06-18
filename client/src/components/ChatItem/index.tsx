import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedChat } from '../../redux/chat/selectors';

import { setSelectedChat } from '../../redux/chat/slice';
import styles from './ChatItem.module.scss';

const { sender, message, time, active } = styles;

// TODO: move somewhere
const getDateString = (date: Date): string => {
  const dateMoment = moment(date);
  const now = moment();

  if (dateMoment.isBefore(now, 'year')) {
    return dateMoment.format('DD.MM.YY');
  } else if (dateMoment.isBefore(now, 'month')) {
    return dateMoment.format('MMMM Do');
  } else if (dateMoment.isBefore(now, 'day')) {
    return dateMoment.format('ddd');
  }

  return dateMoment.format('hh:mm');
};

type ChatItemProps = {
  chat: Chat;
};

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const selectedChat = useSelector(getSelectedChat);
  const dispatch = useDispatch();

  const updateSelectedChat = (chat: Chat) => () => {
    const currentChat: Chat | null = selectedChat?.id === chat.id ? null : chat;

    dispatch(setSelectedChat(currentChat));
  };

  return (
    <div
      className={`${styles.chat} ${chat.id === selectedChat?.id ? active : ''}`}
      onClick={updateSelectedChat(chat)}>
      <img src={chat.user.avatarUrl} alt="avatar" />
      <span className={sender}>{chat.user.name}</span>
      <span className={message}>{chat.lastMessage.value}</span>
      <span className={time}>{getDateString(chat.lastMessage.date)}</span>
    </div>
  );
};

export default ChatItem;
