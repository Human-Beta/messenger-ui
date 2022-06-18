import React from 'react';
import { useSelector } from 'react-redux';
import ChatArea from './components/ChatArea';
import Sidebar from './components/Sidebar';
import { getSelectedChat } from './redux/chat/selectors';

const App: React.FC = () => {
  const selectedChat = useSelector(getSelectedChat);

  return (
    <div className="app">
      <Sidebar />
      {selectedChat ? <ChatArea selectedChat={selectedChat} /> : <h1>Chat is not chosen</h1>}
    </div>
  );
};

export default App;
