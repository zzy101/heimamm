import axios from 'axios';

// 导入token
import {getToken} from '../utils/token.js'

const user = axios.create({
    baseURL : process.env.VUE_APP_baseUrl,
    headers : {
        'token' : getToken()
    }
})

// 获取用户列表
export function userList() {
    return user({
        url : '/user/list',
        method : 'get',
    })
}