import { Button, Swiper, Toast, TabBar, Badge, Form, Dropdown, Input } from 'antd-mobile'
import './index.css';
import { useEffect, useState } from 'react';
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
    DownFill,
    SearchOutline
} from 'antd-mobile-icons'
import GroupItem from '../../Component/GroupItem';
import NewsItem from '../../Component/NewsItem';
import { useNavigate, useLocation } from 'react-router-dom';

//使用 require.context 动态导入图片
// const importAll = (r) => {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
//   };

//   const images = importAll(require.context('../../assets/', false, /\.(png|jpe?g|svg)$/));

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { pathname } = location


    // useEffect(()=> {


    // }, []);

    const groupList = [
        {
            "id": 1,
            "title": "家住回龙观",
            "desc": "归属的感觉",
            "imgSrc": "/img/groups/1.png"
        },
        {
            "id": 2,
            "title": "宜居四五环",
            "desc": "大都市生活",
            "imgSrc": "/img/groups/2.png"
        },
        {
            "id": 3,
            "title": "喧嚣三里屯",
            "desc": "繁华的背后",
            "imgSrc": "/img/groups/3.png"
        },
        {
            "id": 4,
            "title": "比邻十号线",
            "desc": "地铁心连心",
            "imgSrc": "/img/groups/4.png"
        }
    ];

    const newsList = [
        {
            "id": 1,
            "title": "置业选择 | 安贞西里 三室一厅 河间的古雅别院",
            "imgSrc": "/img/news/1.png",
            "from": "新华网",
            "date": "两天前"
        },
        {
            "id": 2,
            "title": "置业佳选 | 大理王宫 苍山洱海间的古雅别院",
            "imgSrc": "/img/news/2.png",
            "from": "新华网",
            "date": "一周前"
        },
        {
            "id": 3,
            "title": "置业选择 | 安居小屋 花园洋房 清新别野",
            "imgSrc": "/img/news/3.png",
            "from": "新华网",
            "date": "一周前"
        }
    ]

    // groupList.forEach(item => {
    //     console.log(images[item.imgSrc])
    // })

    const tabs = [
        {
            key: 'home',
            title: '整租',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: 'todo',
            title: '合租',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: 'message',
            title: '地图找房',
            icon: (active) =>
                active ? <MessageFill /> : <MessageOutline />,
            badge: '99+',
        },
        {
            key: 'personalCenter',
            title: '去出租',
            icon: <UserOutline />,
        },
    ]

    const bottomTabs = [
        {
          key: '/',
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

    const [activeKey, setActiveKey] = useState('todo')

    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

    const items = colors.map((color, index) => (
        <Swiper.Item key={index}>
            <div
                className='content'
                style={{ background: color }}
                onClick={() => {
                    Toast.show(`你点击了卡片 ${index + 1}`)
                }}
            >
            </div>
        </Swiper.Item>
    ))

    const extra = (
        <div className='inputExtra'>
            <Button className="custom-button">
                <span className="button-text">Click Me</span>
                <DownFill className="button-icon" />
            </Button>
            <SearchOutline className='searchIcon' />

        </div>

    )

    const clickLocation = () => {
        console.log('hhhh');
        navigate('/locationList');
    }

    return (
        <div className="layout">
            <div className="swiper-container">
                <Swiper
                    loop
                    autoplay
                    onIndexChange={i => {
                        // console.log(i, 'onIndexChange1')
                    }}
                >
                    {items}
                </Swiper>

                <div className='input-overlay'>
                    <Form layout='horizontal' className='inputForm'>

                        <Form.Item name='address' className='address'
                            extra={
                                <div className='inputExtra'>
                                    <Button className="custom-button" onClick={clickLocation}>
                                        <span className="button-text">Click Me</span>
                                        <DownFill className="button-icon" />
                                    </Button>
                                    <SearchOutline className='searchIcon' />
                                </div>
                            }
                        >
                            <Input
                                placeholder='请输入小区或地址'
                                clearable
                                type='text'
                            />
                        </Form.Item>
                    </Form>
                </div>

            </div>
            <div className="toolBar">
                <TabBar activeKey={activeKey} onChange={setActiveKey}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
            <div className="groupList">
                <div className='guide'>
                    <span className='groupTitle'>去租房</span>
                    <Button className='getMore' color='primary' fill='none'>更多</Button>
                </div>
                <div className="container">
                    {groupList.map(item => (
                        <div className="box" key={item.id}>
                            <GroupItem id={item.id} title={item.title} desc={item.desc} imgSrc={item.imgSrc} />
                        </div>
                    )
                    )}
                </div>
            </div>

            <div className="news">
                <span className='groupTitle'>最新资讯</span>
                {newsList.map(item => (
                    <div key={item.id}>
                        <NewsItem id={item.id} title={item.title} from={item.from} date={item.date} imgSrc={item.imgSrc} />
                    </div>
                ))}
            </div>
            {/* <div className='bottom'>
                <TabBar activeKey={pathname} onChange={value => navigate(value)}>
                    {bottomTabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div> */}
        </div>
    )
}

export default Layout;