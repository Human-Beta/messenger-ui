import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import sendSvg from '../../assets/img/send.svg';
import { getMessagesFromChat, sendMessage } from '../../redux/message/asyncActions';
import { getMessages } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import { getCurrentUser } from '../../redux/user/selectors';
import { createMessageRequest } from '../../services/message.service';
import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';

type ChatAreaProps = {
  selectedChat: Chat;
};

const ChatArea: FC<ChatAreaProps> = ({ selectedChat }) => {
  const dispatch = useAppDispatch();

  const messages = useSelector(getMessages);
  const currentUser = useSelector(getCurrentUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    if (value.trim()) {
      const messageRequest = createMessageRequest(selectedChat.id, currentUser.id, value);

      dispatch(sendMessage(messageRequest));

      setValue('');
    }
  }, [dispatch, setValue, selectedChat, currentUser, value]);

  useEffect(() => {
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
            <MessageItem key={msg.date} {...msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles['input-wrapper']}>
          <TextareaAutosize
            cacheMeasurements
            maxRows={10}
            className={styles.input}
            value={value}
            onChange={(e) => {
              const currValue = e.target.value;
              if (currValue !== ' ') {
                setValue(currValue);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder=" Write a message..."
          />

          <div className={styles['send-wrapper']} onClick={handleSend}>
            <img className="filter-white" src={sendSvg} alt="send" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
