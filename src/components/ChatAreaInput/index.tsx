import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import sendSvg from '../../assets/img/send.svg';
import { sendMessage } from '../../redux/message/asyncActions';
import { getChatMessages } from '../../redux/message/selectors';
import { useAppDispatch } from '../../redux/store';
import { getUser } from '../../redux/user/selectors';
import { createMessageRequest } from '../../services/message.service';

import styles from './ChatAreaInput.module.scss';

interface ChatAreaInputProps {
  selectedChat: Chat;
}

const ChatAreaInput: FC<ChatAreaInputProps> = ({ selectedChat }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const currentUser = useSelector(getUser);
  const messages = useSelector(getChatMessages);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    if (value.trim()) {
      const messageRequest = createMessageRequest(selectedChat.id, currentUser.id, value);

      dispatch(sendMessage(messageRequest));

      setValue('');
    }
  }, [dispatch, setValue, selectedChat, currentUser, value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedChat, messages]);

  return (
    <div className={styles.root}>
      <TextareaAutosize
        ref={inputRef}
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
  );
};

export default ChatAreaInput;
