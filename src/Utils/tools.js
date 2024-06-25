
// import axios from 'axios';
import {request} from '../Utils/request';
export const getCurrentCity = () => {
    const a = localStorage.getItem('hkzf_city');
    // const localCity = JSON.parse(a);
    if(!a || a=== 'undefined' || a === '{}'){
        //使用promise来解决异步问题
        return new Promise(async (resolve, reject) => {
            // const curCity  = new window.BMap.LocalCity();
            const curCity='上海';
                try {

                    const result = await request({
                        url: `/area/info`,
                        method: 'GET',
                        params: { name: curCity }
                    });
                    // const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`);
                    // const result = await axios.get(`http://localhost:8080/area/info?name=${curCity}`);
                    //存储到本地
                    localStorage.setItem('hkzf_city', JSON.stringify(result));
                    resolve(result);
                }catch (e) {
                    reject(e);
                }

        })
    }
    //如果有，直接返回，直接暴露一个成功的promise
    return Promise.resolve(JSON.parse(a));
}
