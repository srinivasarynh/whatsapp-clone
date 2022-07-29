import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chat from "./components/Chat";
import { useState } from 'react';
import Login from './components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="app">
      
        {!user ? (
          <Login />
        ) : (
          <div className='app__body'>
          <Sidebar />
          <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/rooms/:roomId' element={<Chat />} />
          </Routes>
          </div>
        )}
    </div>
  );
}

export default App;
