import axios from 'axios';

// 导入token
import { getToken } from './token.js'

const user = axios.create({
    baseURL: process.env.VUE_APP_baseUrl,
    withCredentials: true,
})

// 添加请求拦截器
user.interceptors.request.use(function (config) {
    // 在发送请求之前做些什
    // window.console.log(config)
    // 添加请求头
    config.headers.token = getToken()
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
user.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

export default user;