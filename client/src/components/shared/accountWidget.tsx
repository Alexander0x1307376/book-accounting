import React, { CSSProperties } from 'react';
import { Avatar, Button, Card, Popover } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const AccountWidget: React.FC = () => {

  const userData = {
    name: 'UserData111',
    imgUrl: "https://joeschmoe.io/api/v1/random"
  }


  const {user: {userData: { name }}, logout} = useAuth();

  return (
    <Card style={{ borderRadius: 0}}>
      <Card.Meta
        avatar={
          <Popover
            content={<AccountOptionsMenu onLogoutClick={logout} />}
            trigger="click"
            placement='right'
          >
            <Avatar src={userData.imgUrl} style={{ cursor: 'pointer'}} /> 
          </Popover>
        }
        title={name}
        />      
    </Card>
  )
}


interface AccountOptionsMenuProps {
  onLogoutClick: VoidFunction;
}

const AccountOptionsMenu: React.FC<AccountOptionsMenuProps> = ({ onLogoutClick }) => {

  const buttonStyle: CSSProperties = {
    textAlign: 'start',
  }

  return (
    <div>
      {/* <Button style={buttonStyle} icon={<SettingOutlined />} block type="text">Настройки</Button> */}
      <Button 
        style={buttonStyle} 
        icon={<LogoutOutlined />} 
        block 
        type="text"
        onClick={onLogoutClick}
      >
        Выйти
      </Button>
    </div>
  )
}

export default AccountWidget;