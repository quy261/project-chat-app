import React from 'react';
import { Button, Avatar, Typography, Popconfirm } from 'antd';
import styled from 'styled-components';
import { LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { auth } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
import ButtonGroup from 'antd/es/button/button-group';

const WrapperStyled = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: black;
    margin-left: 5px;
    margin-right: 8px;

  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const { clearState,setIsAddRoomVisible } = React.useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  const confirmLogOut = () => {
    clearState();
    auth.signOut();
  }

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL? photoURL: displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
        <ButtonGroup size='small' >
          <Popconfirm
            title='Đăng xuất tài khoản'
            description='Bạn muốn đăng xuất khỏi tài khoản này?'
            onConfirm={confirmLogOut}
            okText='YES'
            cancelText='NO'>
            <Button
              type='primary'
              title='Log out'
              icon={<LogoutOutlined/>}
              shape='round'
            />
          </Popconfirm>
          <Button
            type='primary'
            icon={< UsergroupAddOutlined/>}
            shape='round'
            onClick={handleAddRoom}
            title='Add room'
          />
        </ButtonGroup>
          
      </div>
    </WrapperStyled>
  );
}
