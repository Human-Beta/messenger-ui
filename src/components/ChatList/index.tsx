import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllChats } from '../../redux/chat/asyncActions';

import { getChats } from '../../redux/chat/selectors';
import { useAppDispatch } from '../../redux/store';
import ChatItem from '../ChatItem';
import styles from './ChatList.module.scss';

const { root } = styles;

const PAGE_SIZE = 15;

const ChatList: React.FC = () => {
  const chats = useSelector(getChats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: pagination
    dispatch(getAllChats({ page: 1, size: PAGE_SIZE }));
  }, [dispatch]);

  return (
    <div className={`${root} scrollable`}>
      {chats.map((chatItem) => (
        <ChatItem key={chatItem.id} chat={chatItem} />
      ))}
    </div>
  );
};

export default ChatList;
