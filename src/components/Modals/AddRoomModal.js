import React, { useContext } from 'react';
import { Form, Modal, Input, message } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
  const {
    user: { uid, displayName}
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = () => {
    // handle logic
    // add new room to firestore
    try{
      // them phong moi vao db
      addDocument('rooms', { ...form.getFieldsValue(), members: [uid], hostId: uid, hostName: displayName});
      messageApi.open({
        type: 'success',
        content: 'Bạn đã thêm phòng thành công!',
        duration: 2,
      });
      // reset form value
      form.resetFields();
      setIsAddRoomVisible(false);
    } catch(error){
      form.resetFields(); 
        messageApi.open({
        type: 'warning',
        content: 'Mời bạn nhập lại thông tin phòng!',
        duration: 5,
      });
    };
};

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      {contextHolder}
      <Modal
        title='Tạo phòng'
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' >
          <Form.Item label='Tên phòng' name='name'>
            <Input placeholder='Nhập tên phòng...(không quá 10 kí tự)' maxLength={10}/>
          </Form.Item>
          <Form.Item label='Thông tin mô tả thêm' name='description'>
            <Input placeholder='Nhập mô tả...(không quá 20 kí tự)' maxLength={20}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}