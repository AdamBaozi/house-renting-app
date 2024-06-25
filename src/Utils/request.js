import axios from 'axios';


const request = axios.create({
    baseURL: 'http://192.168.0.115:8080',
    timeout: 5000
})

//添加响应拦截器
//在响应返回到客户端之前，做拦截，重点处理返回的数据
request.interceptors.response.use((response) => {
    //2xx范围内的状态码都会触发该函数
    //对响应数据做点什么
    return response.data.body
}, (error) => {
    //超出2xx范围内的状态码都会触发该函数
    return Promise.reject(error)
})

export { request }


