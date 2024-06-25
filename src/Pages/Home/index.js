import React from 'react'
import { TabBar } from 'antd-mobile'
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  SearchOutline,
  UserOutline,
} from 'antd-mobile-icons'
import './index.css';

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const { pathname } = location
  
    const tabs = [
      {
        key: '/layout',
        title: '首页',
        icon: <AppOutline />,
      },
      {
        key: '/find',
        title: '找房',
        icon: <SearchOutline />,
      },
      {
        key: '/message',
        title: '资讯',
        icon: <MessageOutline />,
      },
      {
        key: '/me',
        title: '我的',
        icon: <UserOutline />,
      },
    ]
  

  return (
    <div className='app'>
      <div className='body'>
        <Outlet />
      </div>
      <div className='bottom'>
        <TabBar tintColor="#21b97a" noRenderContent={true} barTintColor="white" activeKey={pathname} onChange={value => navigate(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Home;
