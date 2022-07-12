import React from 'react';
import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';

const messages: Message[][] = [
  [
    {
      id: 123,
      senderId: 1,
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 312,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 124,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 125,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 5736,
      senderId: 1,
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 498234,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 34562775,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 16475,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 59263,
      senderId: 1,
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 245463,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 234562,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 4442245,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 234561,
      senderId: 1,
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 77345,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 23455,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 234556,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 234662,
      senderId: 1,
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 234626,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 67782,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 69874,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 5484762,
      senderId: 1,
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 5586454,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 65464444,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 695746432,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 5575,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 446364,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 337493,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 584763,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 5863638,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 458473653,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 48472,
      senderId: 0,
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 47374,
      senderId: 1,
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 234234,
      senderId: 1,
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
  ],
  [
    {
      id: 4616,
      senderId: 2,
      value: 'Ну че, как оно?',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 94736,
      senderId: 0,
      value: 'Та норм',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 1429,
      senderId: 2,
      value: 'круто',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
  ],
  [
    {
      id: 56111,
      senderId: 3,
      value: 'Як умру',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 472522,
      senderId: 0,
      value: 'То поховайте',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 3332,
      senderId: 0,
      value: 'мэнэ у могыли',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
  ],
  [
    {
      id: 1234,
      senderId: 4,
      value: 'Чувак это рэпчик',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 5432,
      senderId: 0,
      value: 'Круто круто',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 9951,
      senderId: 4,
      value: 'действительно круто',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
  ],
];

type ChatAreaProps = {
  selectedChat: Chat;
};

const ChatArea: React.FC<ChatAreaProps> = ({ selectedChat }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
    console.log('hello');
  }, [selectedChat, messages]);

  return (
    <div className="chat-area">
      <div className={styles.header}>
        {/* TODO: user avatar */}
        <span className="sender">{selectedChat.name}</span>
      </div>
      <div className={styles['messages-wrapper']}>
        <div className={`${styles['messages']} scrollable`}>
          <MessageItem
            key={0}
            {...{
              id: 56111,
              senderId: 3,
              value: 'начало',
              // date: JSON.parse('2022-06-12T20:23:00+03:00'),
              date: '2022-06-12T20:23:00+03:00',
            }}
          />
          {messages[selectedChat.id - 1].map((msg) => (
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
