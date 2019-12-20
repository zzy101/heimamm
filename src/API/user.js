// import axios from 'axios';

// 导入拦截器
import user from '../utils/request.js'

// 获取用户列表
export function userList(params) {
    return user({
        url: '/user/list',
        method: 'get',
        params,
    })
}

// 新增用户
export function useradd(data) {
    return user({
        url: '/user/add',
        method: 'post',
        data
    })
}

// 设置用户状态
export function userstatus(data) {
    return user({
        url: '/user/status',
        method: 'post',
        data
    })
}

// 删除用户
export function userremove(data) {
    return user({
        url: '/user/remove',
        method: 'post',
        data
    })
}

// 编辑用户
export function useredit(data) {
    return user({
        url: '/user/edit',
        method: 'post',
        data
    })
}