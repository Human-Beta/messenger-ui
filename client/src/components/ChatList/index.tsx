import React from 'react';

import avatarSvg from '../../assets/img/avatar.svg';
import ChatItem from '../ChatItem';
import styles from './ChatList.module.scss';

const { root } = styles;

const chats: Chat[] = [
  {
    id: 1,
    user: {
      nickName: 'oleg_ubiyca',
      name: 'Олег',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 555,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет, как дела?',
      // date: Date.parse('2022-06-12T11:18:00+03:00'),
      date: '2022-06-12T11:18:00+03:00',
    },
  },
  {
    id: 2,
    user: {
      nickName: 'kitty',
      name: 'Котях',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 444,
      senderNickName: 'kitty',
      value: 'Шо ты, пес?',
      // date: Date.parse('2022-06-10T11:17:00+03:00'),
      date: '2022-06-10T11:17:00+03:00',
    },
  },
  {
    id: 3,
    user: {
      nickName: 'vasya_voin',
      name: 'Вася',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 333,
      senderNickName: 'vasya_voin',
      value: 'Шо там, Путин еще не сдох???',
      // date: Date.parse('2022-05-10T10:35:00+03:00'),
      date: '2022-05-10T10:35:00+03:00',
    },
  },
  {
    id: 4,
    user: {
      nickName: 'pushka_petrushka',
      name: 'Петя',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 222,
      senderNickName: 'pushka_petrushka',
      value: 'Ахахаха очень смишно',
      // date: Date.parse('2021-11-21T10:35:00+03:00'),
      date: '2021-11-21T10:35:00+03:00',
    },
  },
  {
    id: 5,
    user: {
      nickName: 'oleg_ubiyca',
      name: 'Олег',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 555,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет, как дела?',
      // date: Date.parse('2022-06-12T11:18:00+03:00'),
      date: '2022-06-12T11:18:00+03:00',
    },
  },
  {
    id: 6,
    user: {
      nickName: 'kitty',
      name: 'Котях',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 444,
      senderNickName: 'kitty',
      value: 'Шо ты, пес?',
      // date: Date.parse('2022-06-10T11:17:00+03:00'),
      date: '2022-06-10T11:17:00+03:00',
    },
  },
  {
    id: 7,
    user: {
      nickName: 'vasya_voin',
      name: 'Вася',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 333,
      senderNickName: 'vasya_voin',
      value: 'Шо там, Путин еще не сдох???',
      // date: Date.parse('2022-05-10T10:35:00+03:00'),
      date: '2022-05-10T10:35:00+03:00',
    },
  },
  {
    id: 8,
    user: {
      nickName: 'pushka_petrushka',
      name: 'Петя',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 222,
      senderNickName: 'pushka_petrushka',
      value: 'Ахахаха очень смишно',
      // date: Date.parse('2021-11-21T10:35:00+03:00'),
      date: '2021-11-21T10:35:00+03:00',
    },
  },
  {
    id: 9,
    user: {
      nickName: 'oleg_ubiyca',
      name: 'Олег',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 555,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет, как дела?',
      // date: Date.parse('2022-06-12T11:18:00+03:00'),
      date: '2022-06-12T11:18:00+03:00',
    },
  },
  {
    id: 10,
    user: {
      nickName: 'kitty',
      name: 'Котях',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 444,
      senderNickName: 'kitty',
      value: 'Шо ты, пес?',
      // date: Date.parse('2022-06-10T11:17:00+03:00'),
      date: '2022-06-10T11:17:00+03:00',
    },
  },
  {
    id: 11,
    user: {
      nickName: 'vasya_voin',
      name: 'Вася',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 333,
      senderNickName: 'vasya_voin',
      value: 'Шо там, Путин еще не сдох???',
      // date: Date.parse('2022-05-10T10:35:00+03:00'),
      date: '2022-05-10T10:35:00+03:00',
    },
  },
  {
    id: 12,
    user: {
      nickName: 'pushka_petrushka',
      name: 'Петя',
      avatarUrl: avatarSvg,
    },
    lastMessage: {
      id: 222,
      senderNickName: 'pushka_petrushka',
      value: 'Ахахаха очень смишно',
      // date: Date.parse('2021-11-21T10:35:00+03:00'),
      date: '2021-11-21T10:35:00+03:00',
    },
  },
];

const ChatList: React.FC = () => {
  return (
    <div className={`${root} scrollable`}>
      {chats.map((chatItem) => (
        <ChatItem key={chatItem.id} chat={chatItem} />
      ))}
    </div>
  );
};

export default ChatList;
