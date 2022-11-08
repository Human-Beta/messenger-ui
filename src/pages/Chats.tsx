import moment from 'moment';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Status } from '../@types/status';
import Background from '../components/Background';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import { getChats, getChatsInitStatus, getSelectedChat } from '../redux/chat/selectors';
import { deleteNewChat, NEW_CHAT_ID, setSelectedChat } from '../redux/chat/slice';
import { addMessage } from '../redux/message/slice';
import { isSearhing } from '../redux/search/selectors';
import { useAppDispatch } from '../redux/store';
import { getSocket } from '../services/socket.service';

const findChat = (chats: Chat[], chatName: string | undefined) =>
  chats.find((chat) => chat.chatName === chatName);

const Chats: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const chats = useSelector(getChats);
  const selectedChat = useSelector(getSelectedChat);
  const chatsStatus = useSelector(getChatsInitStatus);
  const searching = useSelector(isSearhing);

  const { chatName } = useParams();

  useEffect(() => {
    const navigateToHome = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && location.pathname !== '/' && !searching) {
        navigate('/');
      }
    };

    document.addEventListener('keydown', navigateToHome);

    return () => {
      document.removeEventListener('keydown', navigateToHome);
    };
  }, [navigate, location, searching]);

  useEffect(() => {
    if (selectedChat?.id !== NEW_CHAT_ID) {
      dispatch(deleteNewChat());
    }
  }, [dispatch, selectedChat]);

  useEffect(() => {
    if (chatsStatus <= Status.LOADING) {
      return;
    } else if (!chatName) {
      dispatch(setSelectedChat(null));
      return;
    }

    // TODO: refactor. I don't need a chats array here. I can dispactch action with chatName and slice does this job.
    // Example: dispatch(setSelectedChat("some_chatname"))
    const foundChat = findChat(chats, chatName);

    if (foundChat) {
      dispatch(setSelectedChat(foundChat));
    } else {
      // TODO: change to log.warn
      console.warn(`no chat with chatName == ${chatName}`);
      navigate('/');
    }
  }, [dispatch, navigate, chatsStatus, chats, chatName]);

  useEffect(() => {
    const saveMessage = (message: Message) => {
      // TODO: why is the date received as a number?
      // converting number date to string.
      message.date = moment(message.date).toISOString();

      dispatch(addMessage(message));
    };

    const socket = getSocket();

    socket.on('message', saveMessage);

    return () => {
      socket.off('message', saveMessage);
    };
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <Background />
      {selectedChat && <ChatArea selectedChat={selectedChat} />}
    </>
  );
};

export default Chats;
