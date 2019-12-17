import axios from 'axios'

import {getToken} from '../utils/token.js'

const user = axios.create({
    baseURL : process.env.VUE_APP_baseUrl,
    withCredentials : true
})

export function userInfo() {
    return user({
        url : '/info',
        method : 'get',
        headers :{
            'token' : getToken()           //请求头 参数是以 对象的形式传递
        }
    })
}