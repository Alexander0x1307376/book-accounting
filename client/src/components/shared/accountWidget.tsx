import React from 'react';
import { Avatar, Button, Card, List, Menu, Popover, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ButtonRouterLink from './buttonRouterLink';

const { Title } = Typography;

const AccountWidget: React.FC = () => {
  return (
   <div>
     
   </div>
  )
}



const AccountOptionsMenu: React.FC = () => {

  const style = {
    padding: '0',
    margin: '0'
  }

  return (
    <List size='small' style={style}>
      <List.Item style={style}>
        <Button style={style} icon={<SettingOutlined />} size='small' type="text">Настройки</Button>
      </List.Item>
      <List.Item style={style}>
        <Button icon={<LogoutOutlined />} size='small' type="text">Выйти</Button>
      </List.Item>
    </List>
  )
}

export default AccountWidget;