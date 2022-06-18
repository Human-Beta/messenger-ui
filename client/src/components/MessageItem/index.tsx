import moment from 'moment';
import styles from './MessageItem.module.scss';

const { root, message, my, time } = styles;

type MessageItemProps = Message;

const MessageItem: React.FC<MessageItemProps> = ({ senderNickName, value, date }) => {
  return (
    <div className={`${root} ${senderNickName === 'me' ? my : ''}`}>
      <span className={message}>{value}</span>
      <span className={time}>{moment(date).format('hh:mm')}</span>
    </div>
  );
};

export default MessageItem;
