// 使用 require.context 动态导入图片
// import img from '../assets/img'

export function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };


// const groupsImages = importAll(require.context('../assets/img/groups', false, /\.(png|jpe?g|svg)$/));
// const newsImages = importAll(require.context('../assets/img/news', false, /\.(png|jpe?g|svg)$/));


  // 动态生成图片路径
export function getImagePath(path, filterDirPath, images){
    // const images = importAll(require.context(`../assets/img/${filterDirPath}`, false, /\.(png|jpe?g|svg)$/));
    const imageName = path.replace(`/img/${filterDirPath}/`, '');
    return images[imageName] || null;
    // switch (filterDirPath) {
    //     case 'groups':
    //       return groupsImages[imageName];
    //     case 'news':
    //       return newsImages[imageName];
    //     // 你可以继续添加其他主题
    //     default:
    //       return null;
    //   }
};

 
  