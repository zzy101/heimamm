import axios from 'axios';

const Interface = axios.create({
    baseURL: process.env.VUE_APP_baseUrl,
    withCredentials: true,
})

// 登录页面 - 表单验证
export function loginFrom(data) {
    return Interface({
        url: "/login",
        method: "post",
        data
    })
}

//注册页面 - 短信验证码
export function note(data) {
    return Interface({
        url: "/sendsms",
        method: "post",
        data
    })
}

//注册页面 - 完成注册
export function registerFrom(data) {
    return Interface({
        url: "/register",
        method: "post",
        data
    })
}
