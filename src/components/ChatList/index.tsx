import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Status } from '../../@types/status';
import { getAllChats } from '../../redux/chat/asyncActions';
import { getChats, getChatsStatus } from '../../redux/chat/selectors';
import { getMessages } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import messageUtils from '../../utils/message.utils';
import ChatItem from '../ChatItem';
import styles from './ChatList.module.scss';
import ChatListSkeleton from './ChatListSkeleton';

const { root, empty } = styles;

const PAGE_SIZE = 15;

const ChatList: FC = () => {
  const chats = useSelector(getChats);
  const status = useSelector(getChatsStatus);
  const messages = useSelector(getMessages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: pagination
    dispatch(getAllChats({ page: 1, size: PAGE_SIZE }));
  }, [dispatch]);

  return (
    <div className={`${root} scrollable`}>
      {status === Status.LOADING ? (
        <ChatListSkeleton />
      ) : chats.length ? (
        chats
          .slice()
          .sort((c1, c2) => {
            // TODO: refactor?
            const lastMessage1 = messageUtils.getLastMessage(messages[c1.id]);
            const lastMessage2 = messageUtils.getLastMessage(messages[c2.id]);

            return lastMessage2.date.localeCompare(lastMessage1.date);
          })
          .map((chatItem) => <ChatItem key={chatItem.id} chat={chatItem} />)
      ) : (
        <p className={empty}>You have no friends yet (</p>
      )}
    </div>
  );
};

export default ChatList;
