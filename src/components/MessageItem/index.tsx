import moment from 'moment';
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Status } from '../../@types/status';
import { getCurrentUser } from '../../redux/user/selectors';
import styles from './MessageItem.module.scss';

const { root, message, my, time, loading, error, loader } = styles;

type MessageItemProps = Message;

const loaderSize = 17;

const statusMap: { [key: string]: string } = {
  [Status.LOADING]: loading,
  [Status.SUCCESS]: '',
  [Status.ERROR]: error,
};

const MessageItem: React.FC<MessageItemProps> = ({ senderId, value, date, status }) => {
  const currentUser = useSelector(getCurrentUser);

  return (
    // TODO: change it 'senderId === 0' to checking if it is the current user
    <div className={`${root} ${statusMap[status] || ''} ${senderId === currentUser.id ? my : ''}`}>
      <p className={message}>{value}</p>
      {/* TODO: add date before messages
        For example, if messages from 5th of May, than before ones should be placed 
        May 5, 2021
        msg1
        msg2
            msg3
      */}
      <span className={time}>{moment(date).format('HH:mm')}</span>
      <Oval wrapperClass={loader} color="#00BFFF" height={loaderSize} width={loaderSize} />
    </div>
  );
};

export default MessageItem;
