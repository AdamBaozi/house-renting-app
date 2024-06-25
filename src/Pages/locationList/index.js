import { NavBar, CheckList, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { useEffect, useRef } from 'react';
import { fetchHotCity } from '../../store/directRequest';
import { request } from '../../Utils/request';
import { useState } from 'react';
import { getCurrentCity } from '../../Utils/tools'
import classNames from 'classnames'


//导入List组件
import { List, AutoSizer } from 'react-virtualized';

//索引（A，B ，C。。。）等的高度
const TITLE_HEIGHT = 36;
//每个城市名称的高度
const NAME_HEIGHT = 50;

//封装处理字母索引的方法
const formatCityIndex = (letter) => {
    switch (letter) {
        case '#': {
            return '当前定位'
        }
        case 'hot': {
            return '热门城市'
        }
        default:
            return letter.toUpperCase()
    }
}

//数据格式化方法：把获取的城市列表按照ui图需要划分成以首字符排列的数据
const formDataCity = (list) => {
    //存储以首字符开头的城市数据{}，是个Map
    const cityList = {};
    list.forEach(item => {
        //获取每个城市首字母
        const first = item.short.substr(0, 1);
        if (cityList[first]) {
            //如果有就往该分类中push数据
            cityList[first].push(item);
        } else {
            //5.如果没有就创建新数组存储
            cityList[first] = [item];
        }
    })
    //获取索引数据
    const cityIndex = Object.keys(cityList).sort();
    return {
        cityList,
        cityIndex
    }
}

const LocationList = () => {

    const cityListComponent = useRef();

    useEffect(() => {
        async function generateCityList() {
            // You can await here
            const hotCityRes = await request({
                url: '/area/hot',
                method: 'GET'
            });
        // }

        // async function fetchAreaCity() {
            const areaCityRes = await request({
                url: `/area/city`,
                method: 'GET',
                params: { level: cityAreaLevel }
            });
            const { cityList, cityIndex } = formDataCity(areaCityRes);

            cityList['hot'] = hotCityRes;

            //把索引添加到cityIndex头部
            cityIndex.unshift('hot')
           

            //获取当前定位城市
            const curCity = await getCurrentCity();
            //把当前定位城市加到areaCityList中
            cityList['#'] = [curCity];
            //把当前城市索引添加到cityIndex头部
            cityIndex.unshift('#');

            setCityList(cityList);
            setCityIndex(cityIndex);
            setHotCityList(hotCityRes);
            
        }
        generateCityList();
   

        // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
        // 注意：调用这个方法的时候，需要保证 List 组件中已经有数据了！如果 List 组件中的数据为空，就会导致调用方法报错！
        // 解决：只要保证这个方法是在 获取到数据之后 调用的即可。
        // cityListComponent.current.measureAllRows()

        // 组件卸载前执行的清理操作
        return () => {
            localStorage.removeItem('hkzf_city');
            console.log('Cleared interval');
        };
    }, []); // Or [] if effect doesn't need props or state

    //react18中由于使用了Fiber，不再使用componentDidMount
    // componentDidMount() {    
    //     // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    //     // 注意：调用这个方法的时候，需要保证 List 组件中已经有数据了！如果 List 组件中的数据为空，就会导致调用方法报错！
    //     // 解决：只要保证这个方法是在 获取到数据之后 调用的即可。
    //     this.cityListComponent.current.measureAllRows()
    //   }

    const navigate = useNavigate();
    const [hotCityList, setHotCityList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [cityIndex, setCityIndex] = useState([]);
    //指定右侧字母索引列表[高亮]!的索引号
    const [activeIndex, setActiveIndex] = useState(0);
    const [cityAreaLevel, setCityAreaLevel] = useState(1);

    const back = () => {
        navigate(-1);
    }

    //创建动态计算每一行高度的方法
    const getRowHeight = ({ index }) => {
        //索引标题高度 + 城市数量 * 城市名称的高度
        //TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    // 有房源的城市
    const HOUSE_CITY = ['北京', '上海', '广州', '深圳']
    const changeCity = ({label, value}) => {
        if(HOUSE_CITY.indexOf(label) >-1){
            //有
            localStorage.setItem('hkzf_city', JSON.stringify({label, value}));
            // navigate('/layout');
            navigate(-1);
        }else {
            Toast.info('该城市暂无房源数据', 1, null, false);
        }

    }

    //List组件渲染每一行的方法：
    const rowRenderer = ({
        key,
        index, //索引号
        isScrolling, // 当前项是否在滚动中
        isVisible, // 当前项在List中是可见的
        style // 注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
    }) => {
        //获取每一行的字母索引
        const letter = cityIndex[index];
        return (
            <div key={key} style={style} className='city'>
                <div className='title'>{formatCityIndex(letter)}</div>
                {cityList[letter].map(item => (
                    <div className='name' key={item.value}
                    onClick={()=> changeCity(item)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        )

    }

    //封装渲染右侧索引列表的方法
    const renderCityIndex = () => {
        //获取到cityIndex, 并遍历起，实现渲染
        const displayCityIndex = cityIndex.map((item, index) => {
            console.log('hhh', `${index} ---- ${activeIndex}`);
            return (
                <li className='city-index-item' key={item}
                    onClick={() => {
                        cityListComponent.current.scrollToRow(index);
                    }}
                >
                    <span className={activeIndex === index ? 'index-active' : ''}>
                        {item === 'hot' ? '热' : item.toUpperCase()}
                    </span>
                </li>
            )
            
        }
    )
        console.log(displayCityIndex);
        return displayCityIndex;
    }

    //用于获取List组件中渲染行的信息
    const onRowsRendered = ({startIndex}) => {
        if (activeIndex !== startIndex) {
            console.log('startIndex', startIndex);
            setActiveIndex(startIndex);
        }
    }

    return (
        // <div className='locationList'>
        //     <div className='head'><NavBar onBack={back}>城市选择</NavBar></div>
        //     {/* <div className='body'>
        //         <span className='subTitle'>当前定位</span>
        //         <div className='currentCity'>
        //             <CheckList defaultValue={['sh']}>
        //                 <CheckList.Item value='sh'>上海</CheckList.Item>
        //             </CheckList>
        //         </div>
        //         <span className='subTitle'>热门城市</span>
        //         <div>
        //             <CheckList>
        //                 {hotCityList.length > 0 && hotCityList.map(item =>
        //                     <CheckList.Item value={item.value}>{item.label}</CheckList.Item>
        //                 )}
        //             </CheckList>
        //         </div>
        //         <div className='subTitle'>主要城市</div>
        //         <div>
        //             <CheckList>
        //                 {areaCityList.length > 0 && areaCityList.map(item =>
        //                     <CheckList.Item value={item.value}>{item.label}</CheckList.Item>
        //                 )}
        //             </CheckList>
        //         </div>
        //     </div> */}
        // </div>

        <div className="citylist">
            {/* 顶部导航栏 */}
            <NavBar
                className="navbar"
                mode="light"
                icon={<i className="iconfont icon-back" />}
                onBack={back}
            >
                城市选择
            </NavBar>

            {/* 城市列表 */}
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        ref={cityListComponent}
                        width={width}
                        height={height}
                        rowCount={cityIndex.length}
                        rowHeight={getRowHeight}
                        rowRenderer={rowRenderer}
                        onRowsRendered={onRowsRendered}
                        scrollToAlignment="start"
                    />
                )}
            </AutoSizer>

            {/* 右侧索引列表 */}
            {/* 
          1 封装 renderCityIndex 方法，用来渲染城市索引列表。
          2 在方法中，获取到索引数组 cityIndex ，遍历 cityIndex ，渲染索引列表。
          3 将索引 hot 替换为 热。
          4 在 state 中添加状态 activeIndex ，指定当前高亮的索引。
          5 在遍历 cityIndex 时，添加当前字母索引是否高亮的判断条件。
        */}
            <ul className="city-index">{renderCityIndex()}</ul>
        </div>
    )
}


export default LocationList;