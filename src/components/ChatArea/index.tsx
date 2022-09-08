import { FC, useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { Status } from '../../@types/status';
import arrowSvg from '../../assets/img/arrow.svg';
import { getInitMessagesFromChat, getNextMessagesFromChat } from '../../redux/message/asyncActions';
import {
  getChatMessages,
  getInitMessagesStatusForSelectedChat,
  getMessagesStatusForSelectedChat,
} from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import ChatAreaInput from '../ChatAreaInput';
import MessageItem from '../MessageItem';
import Spinner from '../Spinner';
import styles from './ChatArea.module.scss';
import MessageItemsSkeleton from './MessageItemsSkeleton';

const PAGE_SIZE = 50;

interface ChatAreaProps {
  selectedChat: Chat;
}

const ChatArea: FC<ChatAreaProps> = ({ selectedChat }) => {
  const dispatch = useAppDispatch();

  const messagesRef = useRef<HTMLDivElement>(null);
  const [loadTriggerRef, isLoadTriggerInView] = useInView();

  const messages = useSelector(getChatMessages);
  const initMessagesStatus = useSelector(getInitMessagesStatusForSelectedChat);
  const messagesStatus = useSelector(getMessagesStatusForSelectedChat);

  const scrollToEnd = useCallback(() => {
    messagesRef.current?.scrollTo({ top: 0 });
  }, [messagesRef]);

  useEffect(() => {
    if (!initMessagesStatus || initMessagesStatus === Status.ERROR) {
      dispatch(getInitMessagesFromChat({ chatId: selectedChat.id, size: PAGE_SIZE }));
    }
  }, [dispatch, selectedChat, initMessagesStatus]);

  useEffect(() => {
    if (initMessagesStatus === Status.SUCCESS && isLoadTriggerInView) {
      dispatch(getNextMessagesFromChat({ chatId: selectedChat.id, size: PAGE_SIZE }));
    }
  }, [dispatch, initMessagesStatus, isLoadTriggerInView, selectedChat]);

  const onScroll = useCallback(() => {
    const messagesElement = messagesRef.current;
    if (!messagesElement) {
      return;
    }

    if (messagesElement.scrollTop < -200) {
      messagesElement.parentElement?.classList.add(styles.scrolling);
    } else {
      messagesElement.parentElement?.classList.remove(styles.scrolling);
    }
  }, []);

  return (
    <div className="chat-area">
      <div className={styles.header}>
        {/* TODO: chat avatar */}
        <span className="sender">{selectedChat.name}</span>
      </div>
      <div className={styles['messages-wrapper']}>
        <div className={`${styles['messages']} scrollable`} ref={messagesRef} onScroll={onScroll}>
          {initMessagesStatus === Status.LOADING ? (
            <MessageItemsSkeleton />
          ) : (
            messages.map((msg) => <MessageItem key={msg.date} {...msg} />)
          )}
          <div ref={loadTriggerRef} className={styles['load-trigger']} />
          {messagesStatus === Status.LOADING && <Spinner />}
        </div>
        <ChatAreaInput selectedChat={selectedChat} onSend={() => scrollToEnd()} />
        <div className={styles['scroll-wrapper']} onClick={scrollToEnd}>
          <img src={arrowSvg} className="filter-grey" width={22} alt="scroll" />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
