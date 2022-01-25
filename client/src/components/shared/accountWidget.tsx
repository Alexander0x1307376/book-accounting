import React, { CSSProperties } from 'react';
import { Avatar, Button, Card, Popover } from 'antd';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const AccountWidget: React.FC = () => {

  const userData = {
    name: 'UserData111',
    imgUrl: "https://joeschmoe.io/api/v1/random"
  }


  const {userData: {uuid, name}} = useAuth();

  console.log('userName', name);
  console.log('userUuid', uuid);

  return (
    <Card style={{borderRadius: 0}}>
      <Popover
        content={<AccountOptionsMenu />}
        trigger="click"
      >
      <Card.Meta
        avatar={ <Avatar src={userData.imgUrl} /> }
        title={name}
        />
      </Popover>
    </Card>
  )
}


const AccountOptionsMenu: React.FC = () => {

  const buttonStyle: CSSProperties = {
    textAlign: 'start',
  }

  return (
    <div>
      <Button style={buttonStyle} icon={<SettingOutlined />} block type="text">Настройки</Button>
      <Button style={buttonStyle} icon={<LogoutOutlined />} block type="text">Выйти</Button>
    </div>
  )
}

export default AccountWidget;