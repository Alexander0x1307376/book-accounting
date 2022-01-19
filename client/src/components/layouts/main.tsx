import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from 'antd';
import AccountWidget from "../shared/accountWidget";
const { Content, Sider } = Layout;


const Items = [
  {
    title: 'Главная',
    link: '/'
  },
  {
    title: 'Авторы',
    link: '/authors'
  },
  {
    title: 'Книги',
    link: '/books'
  },
  {
    title: 'Категории',
    link: '/categories'
  },
  {
    title: 'Пользователи',
    link: '/users'
  },
];

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
          {
            Items.map(({title, link}, index) => 
              <Menu.Item key={index+1}><Link to={link}>{title}</Link></Menu.Item>
            )
          }
        </Menu>
      </Sider>
      <Layout style={{ padding: '12px' }}>
        <Content
          className="site-layout-background"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main;