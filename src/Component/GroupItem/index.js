import './index.css';
import {importAll, getImagePath } from '../../Utils/imagesGuider';


// 使用 require.context 动态导入图片
// const importAll = (r) => {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
//   };
  
//   const images = importAll(require.context('../../assets/img/groups', false, /\.(png|jpe?g|svg)$/));

// //动态生成图片路径
// const getImagePath = (path) => {
//     const imageName = path.replace('/img/groups/', '');
//     return images[imageName] || null;
//   };
 const images = importAll(require.context('../../assets/img/groups', false, /\.(png|jpe?g|svg)$/));

const GroupItem = ({id, title, desc, imgSrc}) => {
    return (
        <div className="groupItem" >
            <div className="desc">
                <span className='title'>{title}</span>
                <span className='viceTitle'>{desc}</span>
            </div>
            <div className="image">
                <img className='embeddedImg' src={getImagePath(imgSrc, images, 'groups')}/>
                {/* <img className='embeddedImg' src={getImagePath(imgSrc)}/> */}
            </div>
        </div>
    )
}

export default GroupItem;