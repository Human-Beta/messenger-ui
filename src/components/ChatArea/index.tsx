import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesFromChat } from '../../redux/message/asyncActions';
import { getMessages } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';

type ChatAreaProps = {
  selectedChat: Chat;
};

const ChatArea: FC<ChatAreaProps> = ({ selectedChat }) => {
  const messages = useSelector(getMessages);
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: pagination
    dispatch(getMessagesFromChat({ chatId: selectedChat.id, page: 1, size: 15 }));
  }, [dispatch, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [selectedChat, messages]);

  return (
    <div className="chat-area">
      <div className={styles.header}>
        {/* TODO: user avatar */}
        <span className="sender">{selectedChat.name}</span>
      </div>
      <div className={styles['messages-wrapper']}>
        <div className={`${styles['messages']} scrollable`}>
          {messages.map((msg) => (
            <MessageItem key={msg.id} {...msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <input type="text" placeholder=" Write a message..." />
      </div>
    </div>
  );
};

export default ChatArea;
