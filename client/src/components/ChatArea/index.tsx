import MessageItem from '../MessageItem';
import styles from './ChatArea.module.scss';

const messages: Array<Message[]> = [
  [
    {
      id: 123,
      senderNickName: 'oleg_ubiyca',
      value: 'Привет!',
      date: new Date('2022-06-12T08:23:00+03:00'),
    },
    {
      id: 312,
      senderNickName: 'me',
      value: 'Хэлооооу',
      date: new Date('2022-06-12T11:02:00+03:00'),
    },
    {
      id: 124,
      senderNickName: 'oleg_ubiyca',
      value: 'Как дела?',
      date: new Date('2022-06-12T12:24:00+03:00'),
    },
    {
      id: 125,
      senderNickName: 'oleg_ubiyca',
      value: 'еще не родила??',
      date: new Date('2022-06-12T12:25:00+03:00'),
    },
  ],
  [
    {
      id: 4616,
      senderNickName: 'kitty',
      value: 'Ну че, как оно?',
      date: new Date('2022-06-12T08:23:00+03:00'),
    },
    {
      id: 94736,
      senderNickName: 'me',
      value: 'Та норм',
      date: new Date('2022-06-12T11:02:00+03:00'),
    },
    {
      id: 1429,
      senderNickName: 'kitty',
      value: 'круто',
      date: new Date('2022-06-12T12:24:00+03:00'),
    },
  ],
  [
    {
      id: 56111,
      senderNickName: 'vasya_voin',
      value: 'Як умру',
      date: new Date('2022-06-12T08:23:00+03:00'),
    },
    {
      id: 472522,
      senderNickName: 'me',
      value: 'То поховайте',
      date: new Date('2022-06-12T11:02:00+03:00'),
    },
    {
      id: 3332,
      senderNickName: 'me',
      value: 'мэнэ у могыли',
      date: new Date('2022-06-12T12:24:00+03:00'),
    },
  ],
  [
    {
      id: 1234,
      senderNickName: 'pushka_petrushka',
      value: 'Чувак это рэпчик',
      date: new Date('2022-06-12T08:23:00+03:00'),
    },
    {
      id: 5432,
      senderNickName: 'me',
      value: 'Круто круто',
      date: new Date('2022-06-12T11:02:00+03:00'),
    },
    {
      id: 9951,
      senderNickName: 'pushka_petrushka',
      value: 'действительно круто',
      date: new Date('2022-06-12T12:24:00+03:00'),
    },
  ],
];

type ChatAreaProps = {
  selectedChat: Chat;
};

const ChatArea: React.FC<ChatAreaProps> = ({ selectedChat }) => {
  console.log(selectedChat);

  return (
    <div className="chat-area">
      <div className={styles.header}>
        <span className="sender">{selectedChat.user.name}</span>
      </div>
      <div className={styles['messages-wrapper']}>
        <div className={styles['messages']}>
          {messages[selectedChat.id - 1].map((msg) => (
            <MessageItem key={msg.id} {...msg} />
          ))}
        </div>
        <input type="text" placeholder=" Write a message..." />
      </div>
    </div>
  );
};

export default ChatArea;
