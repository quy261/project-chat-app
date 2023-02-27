import React from 'react';
import { Collapse, Typography, Avatar } from 'antd';
import styled from 'styled-components';
import { UnorderedListOutlined, OrderedListOutlined } from '@ant-design/icons';
import { AppContext } from '../../context/AppProvider';
import { formatDate } from './Message';
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  
  &&& {
    background-color: #9550c7;
    .ant-collapse-content-box {
      max-height: 301px;
      color: black;
      padding: 0 0 3px 0; 
      align-content: center;
      overflow-y:scroll;
      background-color: #f6cef5;
    }
    .disabled{
      display: none;
    }
  }
  ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li.selected2{
    display: none;
  }
  &&&.disabled{
    display: none;
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  text-align: center;
  color: blue;
  border-bottom: 0.5px solid #c75073;
  padding-top: 20px;
  height: 60px;
`;

const MemberStyled = styled.div`
padding: 10px 15px;
border-bottom: 0.5px solid rgb(151, 80, 199);
.username {
  color: black;
  margin-left: 5px;
  margin-right: 15px;

}
`;

const RoomStyled = styled.div`
  display: block;
  color: black;
  border-bottom: 0.5px solid #c75073;
  padding-top: 20px;
  height: 50px;
  background-color: #50c77f;
  text-align: center;
  &&&.null {
    display: none;
  }
`

export default function RoomList() {
  const { rooms, setSelectedRoomId, selectedRoomId, selectedRoom, members} = React.useContext(AppContext);
  return (
    <Collapse ghost
      defaultActiveKey={['1']}
      expandIcon={(isActive) => isActive ? <OrderedListOutlined/> : <UnorderedListOutlined />}
      expandIconPosition='start'
      size='large'
    >
      <PanelStyled header='Danh sách phòng của bạn' key={2}>
        <ul title='Danh sach phong'>
          {rooms.map((room) => (
            <li className={room.id === selectedRoomId ? 'selected2': 'noselect'}>
              <LinkStyled key={room.id}
                onClick={() => {
                  setSelectedRoomId(room.id);
                }

              }
              >
                {room.name}
              </LinkStyled>
            </li>  
          ))}
        </ul>
      </PanelStyled>
      <RoomStyled className={selectedRoomId === '' ? 'null' : 'selected'}>
        <li> Đang ở phòng: {selectedRoom.name}</li>
      </RoomStyled>
      <PanelStyled header='Thông tin phòng đang chọn' key={3} className={selectedRoomId === '' ? 'disabled' : 'header' } >
        <ul>
          <MemberStyled>
            <div style={{fontSize: 12}}> Thời gian tạo: {formatDate(selectedRoom.createdAt?.seconds)} </div>
            <div style={{fontSize: 12}}> Thành viên trong phòng: {members.length} </div>
          </MemberStyled>
          {members.map((member) =>
            <li key={member.uid}>
              <MemberStyled>  
                <Avatar src={member.photoURL}>
                {member.photoURL? member.photoURL : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className='displayName'> {member.displayName}{member.uid === selectedRoom.hostId ? ' - Chủ phòng' : null} </Typography.Text>
              </MemberStyled>  
            </li>
          )}
        </ul>  
      </PanelStyled>
    </Collapse>
  );
}