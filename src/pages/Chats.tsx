import React from 'react';
import { useSelector } from 'react-redux';
import Background from '../components/Background';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import { getSelectedChat } from '../redux/chat/selectors';

const Chats: React.FC = () => {
  const selectedChat = useSelector(getSelectedChat);

  return (
    <>
      <Sidebar />
      <Background />
      {selectedChat && <ChatArea selectedChat={selectedChat} />}
    </>
  );
};

export default Chats;
