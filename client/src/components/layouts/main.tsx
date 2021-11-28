import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Content, Sider, Footer } = Layout;

const Main: FC = () => {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1"><Link to="/">Главная</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/authors">Авторы</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/books">Книги</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/categories">Категории</Link></Menu.Item>
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