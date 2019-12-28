// 导入vue
import Vue from 'vue'

// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)

// 导入登录页面 - login
import login from '../views/login/login.vue'

// 导入首页页面 - index
import index from '../views/index/index.vue'

// 导入 路由嵌套
import children from './children'

// 导入API抽取层 - index
import { userInfo } from '../API/index.js'

// 导入token抽取层 - /utils/token
import { getToken, removerToken } from '../utils/token.js'

// 按需导入 element - ui ---弹窗事件
import { Message } from 'element-ui'
import store from '../store/store'



// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path: '/login',
            component: login  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/index',
            component: index,  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
            meta: {
                power: ['超级管理员','管理员', '老师', '学生'],
            },
            children, 
        },
    ]
})
// 设置白名单
const whitePaths = ['/login','/']

// 设置导航守卫
router.beforeEach((to, from, next) => {
    // indow.console.log(to)      //要去的路径
    // window.console.log(from)    //来时的路径
    // window.console.log(next)    //下一个w

    //查看是否在白名单内,顺便转换大小写
    if (whitePaths.includes(to.path.toLocaleLowerCase())) {
        next()
    } else {
        if (getToken()) {        //如果有token的话 就发送请求
            userInfo().then(res => {
                // 通过 判断用户的状态 是否 被封号
                // window.console.log(to)
                if(res.data.data.status == 0) {
                    Message.warning('你已被封号!')
                    next('/login')
                    return;
                }else if (!(to.meta.power.includes(res.data.data.role))) {
                    window.console.log(res)
                    Message.warning('你没有该权限访问!')
                    next(from)      //跳转到 来时的页面
                    return
                }
                if (res.data.code === 200) {             //如果token参数正确 就登录成功
                    // window.console.log(res)
                    next()
                    store.state.userInfo = res.data.data  //把用户信息存储到  store 里
                    store.state.userInfo.avatar = process.env.VUE_APP_baseUrl + '/' + store.state.userInfo.avatar
                } else if (res.data.code === 206) {
                    // window.console.log(res)
                    Message.warning('登录失败')
                    next('/login')
                    removerToken()  //删除token
                }
            })
        } else {
            next('/login');
            Message.error('请登录')
        }
    }
})

export default router