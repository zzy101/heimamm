// import axios from 'axios'

import instance from '../utils/request.js'

// 添加企业
export function enterpriseAdd(data) {
    return instance({
        url : '/enterprise/add',
        method : 'post',
        data
    })
}

// 企业列表
export function enterpriseList(params) {
    return instance({
        url : '/enterprise/list',
        method : 'get',
        params,
    })
}

// 企业状态
export function enterpriseStatus(data) {
    return instance({
        url : '/enterprise/status',
        method : 'post',
        data,
    })
}

// 企业编辑
export function enterpriseEdit(data) {
    return instance({
        url : '/enterprise/edit',
        method : 'post',
        data,
    })
}

// 企业编辑
export function enterpriseRemove(data) {
    return instance({
        url : '/enterprise/remove',
        method : 'post',
        data,
    })
}