import Login from './components/Login'
import './App.css';
import ChatRoom from './components/ChatRoom';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import React from 'react';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal'

function App() {

  return(
  <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route element={<Login/>} path = '/'/>
          <Route element={<ChatRoom/>} path = "/chatroom"/>    
        </Routes>
        <AddRoomModal />
        <InviteMemberModal />
      </AppProvider>  
    </AuthProvider>
    </BrowserRouter>
  )
}
export default App