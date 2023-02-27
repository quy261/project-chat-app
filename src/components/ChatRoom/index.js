import  React from 'react'
import {Col, Row, } from 'antd'
import ChatWindow from './ChatWindow';
import SideBar from './SideBar'
export default function ChatRoom(){
    return <div>
        
        <Row>
            <Col span={4}><SideBar/></Col>
            <Col span={20}><ChatWindow/></Col>
        </Row>
    </div>
}