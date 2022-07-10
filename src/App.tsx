import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Chats from './pages/Chats';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
