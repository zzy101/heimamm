const KEY = 'mmtoken';

// 设置token
export function setToken(token) {
    localStorage.setItem(KEY,token)
}

// 获取token
export function getToken() {
   return localStorage.getItem(KEY)     //获取的值要返回
}

// 删除token
export function removerToken() {
    localStorage.removeItem(KEY)
}

