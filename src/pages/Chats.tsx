import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Status } from '../@types/status';
import Background from '../components/Background';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import { getChats, getChatsStatus, getSelectedChat } from '../redux/chat/selectors';
import { setSelectedChat } from '../redux/chat/slice';
import { useAppDispatch } from '../redux/store';

const findChat = (chats: Chat[], chatName: string | undefined) =>
  chats.find((chat) => chat.chatName === chatName);

const Chats: React.FC = () => {
  const dispatch = useAppDispatch();

  const chats = useSelector(getChats);
  const selectedChat = useSelector(getSelectedChat);
  const chatsStatus = useSelector(getChatsStatus);

  const { chatName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (chatsStatus === Status.LOADING) {
      return;
    } else if (!chatName) {
      dispatch(setSelectedChat(null));
      return;
    }

    const foundChat = findChat(chats, chatName);

    if (foundChat) {
      dispatch(setSelectedChat(foundChat));
    } else {
      // TODO: change to log.error
      console.error(`no chat with chatName == ${chatName}`);
      navigate('/');
    }
  }, [dispatch, navigate, chatsStatus, chats, chatName]);

  return (
    <>
      <Sidebar />
      <Background />
      {selectedChat && <ChatArea selectedChat={selectedChat} />}
    </>
  );
};

export default Chats;
