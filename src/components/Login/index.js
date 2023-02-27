import React from 'react';
import {Row, Col, Button, Typography} from 'antd';
import firebase, {auth} from '../../firebase/config'
import { addDocument, generateKeywords} from '../../firebase/service'
import { GoogleOutlined } from '@ant-design/icons'

const {Title} = Typography;

const Ggprovider = new firebase.auth.GoogleAuthProvider()

export default function Login(){
    const handleGgLogin = async() => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(Ggprovider);
        console.log(user.metadata);
          if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              providerId: additionalUserInfo.providerId,
              keywords: generateKeywords(user.displayName?.toLowerCase()),
          });
      }
    }


    return (
        <div >
          <Row justify='center' style={{ height: '95vh',
                                         backgroundImage: "URL('https://th.bing.com/th/id/R.9c4b93e133d2f3afa9eb0c0228e795d7?rik=Yuw1sD59ftxwDQ&pid=ImgRaw&r=0')",
                                         backgroundSize:'cover'}}>
            <Col span={8}>
              <Title style={{ textAlign: 'center', font: '40', color: 'cyan'}} level={3}>
                FUN CHAT APP/LOGIN
              </Title>
              <Button
                style={{ width: '100%', marginTop: '50%' , color: 'red'}}
                icon={<GoogleOutlined/>}
                onClick={handleGgLogin}
              >
                Đăng nhập bằng Google
              </Button>
            </Col>
          </Row>
        </div>
    );
}