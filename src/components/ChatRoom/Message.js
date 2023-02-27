import React from 'react';
import { Tooltip, Typography, Avatar} from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { isNull } from 'lodash';
const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .content1, .content2 {
    color: deeppink;
    margin: 2px 0 0 27px;
    font-size: medium;
    border: 1px solid lightgray;
    padding: 3px;
    border-radius: 9px;
    font-family: monospace;
    background: greenyellow;
    display: inline-flex;
    max-width: 70%;
    text-align: center;
  }

`;

export function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({ text, displayName, createdAt, uid, photoURL, title}) {

  return (
    title === 'message' ?
      isNull(displayName) ?
        <WrapperStyled>
          <div>
            <Tooltip title={formatDate(createdAt?.seconds)} key={uid} placement='rightTop'>
            <Typography.Text className='content2' onClick>{text}</Typography.Text>
            </Tooltip>
          </div>
        </WrapperStyled>
        :
        <WrapperStyled>
          <div>
            <Avatar size='small' src={photoURL}>
              {photoURL? photoURL : displayName?.charAt(0)?.toUpperCase()}
              
            </Avatar>
            <Typography.Text className='author' >{displayName}</Typography.Text>
          </div>
          <div>
            <Tooltip title={formatDate(createdAt?.seconds)} key={uid} placement='rightTop'>
            <Typography.Text className='content1'>{text}</Typography.Text>
            </Tooltip>
          </div>
        </WrapperStyled>
    :
      <div style={{textAlign: 'center', fontSize: 12, marginBottom: 5}}>
        <p> {formatDate(createdAt?.seconds)} </p>
        <p> {text} </p>
      </div>    

  ) 
}