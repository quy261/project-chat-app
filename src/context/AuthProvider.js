import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const navigate =  useNavigate();
  
  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        navigate('/chatroom');
        // alert("Bạn đã đăng nhập thành công");
        return;
      }

      // reset user info
        setUser({});
        navigate('/');
        // alert("Bạn đã đăng nhập thất bại. Mời bạn đăng nhập lại!");
    });

    // clean function
    return () => {
      // alert("Bạn đã đăng nhập thất bại. Mời bạn đăng nhập lại!"); 
      unsubscibed();
    };
  }, [navigate]);

  return (
    // {contextHolder}
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}