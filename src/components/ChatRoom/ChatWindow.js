import {  DeleteOutlined, UserAddOutlined} from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Alert, Popconfirm, Empty } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { formatDate } from './Message';
import Message from './Message';
import { AppContext } from '../../context/AppProvider';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';
import {db} from '../../firebase/config'

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 53px;
  padding: 0 15px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  // position: sticky;
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }

  }
`;

const WrapperStyled = styled.div`
  height: 95vh;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
  overflow-y: scroll;
  height: calc(95vh - 114px);
  background-color: mintcream;
  li.you{
    justify-content: flex-end;
    text-align: right;
    margin-right: 10px;
  }
  li#title{
    
  }
  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    theme: black;
  }
`;

export default function ChatWindow() {
  const { selectedRoom, setIsInviteMemberVisible, selectedRoomId, setSelectedRoomId } =
    useContext(AppContext);
  
  const {
    user: { uid, displayName, photoURL },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const messageListRef = useRef(null);
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    if(inputValue !== null){
    addDocument('messages', {
      title: 'message',
      textRequest: inputValue,
      textRespone: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    console.log(photoURL);
    form.resetFields(['message']);
    setInputValue(null);
    // reset focus input
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore('messages', condition, true);
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      console.log(messageListRef.current.scrollTop);
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight - 116;
      console.log(messageListRef.current.scrollTop);
    }
  }, [messages]);

  const confirmDelete = () => {
          const roomRef = db.collection('rooms').doc(selectedRoomId);
          // neu trong phong chi con 1 thanh vien thi se xoa phong do
          if(selectedRoom.members.length === 1){
            roomRef.delete();
            console.log("Da xoa phong");
          }
          // nguoc lai chung ta se chi xoa bo thanh vien do ra khoi phong
          else{
            roomRef.update({
              members: [...selectedRoom.members.filter((val) => val !== uid)]
            })
            console.log("Da xoa thanh vien");
          }
          // them message thong bao cho doan chat
          let textRequest = 'Bạn đã rời khỏi phòng.'
          let textRespone = displayName + ' đã rời khỏi phòng.'
          addDocument('messages', {
            title: 'delete',
            textRequest: textRequest,
            textRespone: textRespone,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
          })
          // 
          setSelectedRoomId('');
    }

  return (
      selectedRoom.id ? (
        <WrapperStyled>
          <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{selectedRoom.name}</p>
              <span className='header__description'>
                Mô tả: {selectedRoom.description}
              </span>
              
            </div>
            <ButtonGroup>
              <Button
                title='Thêm người'
                type= 'primary'
                shape='round'
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMemberVisible(true)}
              />
              <Popconfirm
                title='Rời khỏi đoạn chat'
                description='Bạn muốn rời khỏi đoạn chat này ư?'
                onConfirm={confirmDelete}
                okText='YES'
                cancelText='NO'>
                <Button
                  type='primary'
                  icon={<DeleteOutlined />}
                  shape='round'
                />
              </Popconfirm>
              </ButtonGroup>
          </HeaderStyled>
            <MessageListStyled>

              <ul ref={messageListRef} >
                <div style={{textAlign: 'center', fontSize: 12, marginBottom: 5}}>
                  <p> {formatDate(selectedRoom.createdAt?.seconds)} </p>
                  <p> {uid === selectedRoom.hostId ? "Bạn" : selectedRoom.hostName} đã tạo phòng này. </p>
                </div>

                {messages.map((mes) => (
                  <li className={mes.uid === uid ? 'you': 'other'}>
                    <Message
                      title={mes.title}
                      displayName={mes.uid === uid ? null : mes.displayName}
                      key={mes.id}
                      photoURL={mes.photoURL}
                      text={mes.uid === uid ? mes.textRequest : mes.textRespone}
                      createdAt={mes.createdAt} 
                    />
                  </li>
                ))}
              </ul>

            </MessageListStyled>
            <FormStyled form={form}>
                <Form.Item name='message' >
                  <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder='Nhập tin nhắn...'
                  bordered={false}
                  autoComplete='off'
                  />
                </Form.Item>
                <Button type='primary' onClick={handleOnSubmit}>
                  Gửi
                </Button>
            </FormStyled>
        </WrapperStyled>
      )
       : (
      <div>
        <Alert
          message='Please select a room'
          type='info'
          showIcon
          style={{ margin: 5 }}
          closable
        />
        <Empty description='No room is selected' style={{margin:'30%'}}/>
      </div>
      )
  );
}