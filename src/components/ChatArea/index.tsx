import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesFromChat } from '../../redux/message/asyncActions';
import { getChatMessages } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import { ChatAreaInput } from '../ChatAreaInput';
import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';

type ChatAreaProps = {
  selectedChat: Chat;
};

const PAGE_SIZE = 15;

const ChatArea: FC<ChatAreaProps> = ({ selectedChat }) => {
  const dispatch = useAppDispatch();

  const messages = useSelector(getChatMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: pagination, or not here?
    // Because it is initial messages loading.
    // For initial loading we may load just first page.
    dispatch(getMessagesFromChat({ chatId: selectedChat.id, page: 1, size: PAGE_SIZE }));
  }, [dispatch, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [selectedChat, messages]);

  return (
    <div className="chat-area">
      <div className={styles.header}>
        {/* TODO: chat avatar */}
        <span className="sender">{selectedChat.name}</span>
      </div>
      <div className={styles['messages-wrapper']}>
        <div className={`${styles['messages']} scrollable`}>
          {messages.map((msg) => (
            <MessageItem key={msg.date} {...msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatAreaInput selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default ChatArea;
