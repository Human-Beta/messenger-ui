import { FC, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { Status } from '../../@types/status';
import { getInitChats, getNextChats } from '../../redux/chat/asyncActions';
import { getChats, getChatsInitStatus, getChatsStatus } from '../../redux/chat/selectors';
import { getMessages } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import messageUtils from '../../utils/message.utils';
import ChatItem from '../ChatItem';
import Spinner from '../Spinner';
import styles from './ChatList.module.scss';
import ChatListSkeleton from './ChatListSkeleton';

const { root, empty } = styles;

const PAGE_SIZE = 10;

const ChatList: FC = () => {
  const dispatch = useAppDispatch();

  const chats = useSelector(getChats);
  const initChatsStatus = useSelector(getChatsInitStatus);
  const chatsStatus = useSelector(getChatsStatus);
  const messages = useSelector(getMessages);

  useEffect(() => {
    if (initChatsStatus === Status.INITIAL) {
      dispatch(getInitChats({ size: PAGE_SIZE }));
    }
  }, [dispatch, initChatsStatus]);

  const loadNextChats = useCallback(
    (inView: boolean) => {
      if (inView) {
        const excludeIds = chats.map((chat) => chat.id);

        dispatch(getNextChats({ excludeIds, size: PAGE_SIZE }));
      }
    },
    [dispatch, chats],
  );

  const [loadTriggerRef] = useInView({
    onChange: loadNextChats,
  });

  return (
    <div className={`${root} scrollable`}>
      {initChatsStatus < Status.SUCCESS ? (
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
      {chatsStatus === Status.LOADING && <Spinner />}
      {initChatsStatus === Status.SUCCESS && chatsStatus !== Status.FULL_LOADED && (
        <div ref={loadTriggerRef} className={styles['load-trigger']} />
      )}
    </div>
  );
};

export default ChatList;
