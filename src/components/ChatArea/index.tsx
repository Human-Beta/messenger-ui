import React from 'react';
import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';

const messages: Message[][] = [
  [
    {
      id: 123,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 312,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 124,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 125,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 5736,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 498234,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 34562775,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 16475,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 59263,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 245463,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 234562,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 4442245,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 234561,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 77345,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 23455,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 234556,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 234662,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 234626,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 67782,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 69874,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 5484762,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 5586454,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 65464444,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 695746432,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 5575,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 446364,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 337493,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 584763,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 5863638,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 458473653,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
    {
      id: 48472,
      senderNickName: 'me',
      value: 'Хэлооооу',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 47374,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
    {
      id: 234234,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      // date: new Date('2022-06-12T12:25:00+03:00'),
      date: '2022-06-12T12:25:00+03:00',
    },
  ],
  [
    {
      id: 4616,
      senderNickName: 'kitty',
      value: 'Ну че, как оно?',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 94736,
      senderNickName: 'me',
      value: 'Та норм',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 1429,
      senderNickName: 'kitty',
      value: 'круто',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
  ],
  [
    {
      id: 56111,
      senderNickName: 'vasya_voin',
      value: 'Як умру',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 472522,
      senderNickName: 'me',
      value: 'То поховайте',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 3332,
      senderNickName: 'me',
      value: 'мэнэ у могыли',
      // date: new Date('2022-06-12T12:24:00+03:00'),
      date: '2022-06-12T12:24:00+03:00',
    },
  ],
  [
    {
      id: 1234,
      senderNickName: 'pushka_petrushka',
      value: 'Чувак это рэпчик',
      // date: new Date('2022-06-12T08:23:00+03:00'),
      date: '2022-06-12T08:23:00+03:00',
    },
    {
      id: 5432,
      senderNickName: 'me',
      value: 'Круто круто',
      // date: new Date('2022-06-12T11:02:00+03:00'),
      date: '2022-06-12T11:02:00+03:00',
    },
    {
      id: 9951,
      senderNickName: 'pushka_petrushka',
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
        <span className="sender">{selectedChat.user.name}</span>
      </div>
      <div className={styles['messages-wrapper']}>
        <div className={`${styles['messages']} scrollable`}>
          <MessageItem
            key={0}
            {...{
              id: 56111,
              senderNickName: 'vasya_voin',
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
