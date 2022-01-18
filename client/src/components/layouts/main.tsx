import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Avatar, Layout, Menu, Space } from 'antd';
import AccountWidget from "../shared/accountWidget";
import SubMenu from "antd/lib/menu/SubMenu";
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
const { Content, Sider, Footer } = Layout;

const Main: FC = () => {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <AccountWidget />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1"><Link to="/">Главная</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/authors/1">Авторы</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/books/1">Книги</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/categories/1">Категории</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/users/1">Пользователи</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Libro-1309
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Main;