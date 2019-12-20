import  instance from '../utils/request.js'

// 题库列表
export function questionList(params) {
    return instance({
        url : '/question/list',
        method: 'get',
        params,
    })
}

// 发布题目
export function questionAdd(data) {
    return instance({
        url:'/question/add',
        method:'post',
        data
    })
}

// 获取题目信息
export function questionOne(data) {
    return instance({
        url:'/question/one',
        method:'post',
        data
    })
}

// 设置题库状态
export function questionStatus(data) {
    return instance({
        url:'/question/status',
        method:'post',
        data
    })
}

// 删除题目
export function questionRemove(data) {
    return instance({
        url:'/question/remove',
        method:'post',
        data
    })
}

// 编辑题目
export function questionEdit(data) {
    return instance({
        url : '/question/edit',
        method : 'post',
        data
    })
}

// 上传文件
export function questionUpload(data) {
    return instance({
        url:'/question/upload',
        method:'post',
        data
    })
}