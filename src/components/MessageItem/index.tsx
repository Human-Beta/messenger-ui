import moment from 'moment';
import styles from './MessageItem.module.scss';

const { root, message, my, time } = styles;

type MessageItemProps = Message;

const MessageItem: React.FC<MessageItemProps> = ({ senderNickName, value, date }) => {
  return (
    <div className={`${root} ${senderNickName === 'me' ? my : ''}`}>
      <span className={message}>{value}</span>
      {/* TODO: add date before messages
        For example, if messages from 5th of May, than before ones should be placed 
        May 5, 2021
        msg1
        msg2
            msg3
      */}
      <span className={time}>{moment(date).format('hh:mm')}</span>
    </div>
  );
};

export default MessageItem;
