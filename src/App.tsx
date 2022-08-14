import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Chats from './pages/Chats';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const App: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/@:chatName" element={<Chats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
