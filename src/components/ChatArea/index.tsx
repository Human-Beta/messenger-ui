import { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Status } from '../../@types/status';
import arrowSvg from '../../assets/img/arrow.svg';
import { getMessagesFromChat } from '../../redux/message/asyncActions';
import { getChatMessages, getChatMessagesStatus } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import ChatAreaInput from '../ChatAreaInput';
import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';
import MessageItemsSkeleton from './MessageItemsSkeleton';

interface ChatAreaProps {
  selectedChat: Chat;
}

const PAGE_SIZE = 100;

const ChatArea: FC<ChatAreaProps> = ({ selectedChat }) => {
  const dispatch = useAppDispatch();

  const messagesRef = useRef<HTMLDivElement>(null);

  const messages = useSelector(getChatMessages);
  const messagesStatus = useSelector(getChatMessagesStatus);

  const scrollToEnd = useCallback(() => {
    messagesRef.current?.scrollTo({ top: 0 });
  }, [messagesRef]);

  useEffect(() => {
    // TODO: pagination, or not here?
    // Because it is the initial messages loading.
    // For the initial loading we may load just a first page.
    dispatch(getMessagesFromChat({ chatId: selectedChat.id, page: 1, size: PAGE_SIZE }));
  }, [dispatch, selectedChat]);

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
          {messagesStatus === Status.LOADING ? (
            <MessageItemsSkeleton />
          ) : (
            messages.map((msg) => <MessageItem key={msg.date} {...msg} />)
          )}
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
