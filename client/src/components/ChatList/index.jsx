import React from 'react';
import moment from 'moment';

import avatarSvg from '../../assets/img/avatar.svg';
import styles from './ChatList.module.scss';
import { classNames } from '../../utils/className';

const { root, chat, sender, message, time, active } = styles;

const getDateString = (date) => {
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

const chats = [
  {
    senderId: 1,
    senderName: 'Олег',
    lastMessage: {
      value: 'Привет, как дела?',
      date: Date.parse('2022-06-12T11:18:00+03:00'),
    },
    avatarUrl: avatarSvg,
  },
  {
    senderId: 2,
    senderName: 'Котях',
    lastMessage: {
      value: 'Шо ты, пес?',
      date: Date.parse('2022-06-10T11:17:00+03:00'),
    },
    avatarUrl: avatarSvg,
  },
  {
    senderId: 3,
    senderName: 'Олег',
    lastMessage: {
      value: 'Шо там, Путин еще не сдох???',
      date: Date.parse('2022-05-10T10:35:00+03:00'),
    },
    avatarUrl: avatarSvg,
  },
  {
    senderId: 4,
    senderName: 'Петя',
    lastMessage: {
      value: 'Ахахаха очень смишно',
      date: Date.parse('2021-11-21T10:35:00+03:00'),
    },
    avatarUrl: avatarSvg,
  },
];

const ChatList = () => {
  const [activeId, setActiveId] = React.useState(null);

  const changeActiveId = (id) => () => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (
    <div className={root}>
      {chats.map((chatItem) => (
        <div
          key={chatItem.senderId}
          className={chatItem.senderId === activeId ? classNames([chat, active]) : chat}
          onClick={changeActiveId(chatItem.senderId)}>
          <img src={chatItem.avatarUrl} alt="avatar" />
          <span className={sender}>{chatItem.senderName}</span>
          <span className={message}>{chatItem.lastMessage.value}</span>
          <span className={time}>{getDateString(chatItem.lastMessage.date)}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
