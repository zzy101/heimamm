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

// 导入数据概览 - chart
import chart from '../views/index/chart/chart.vue'

// 导入用户列表 - user
import user from '../views/index/user/user.vue'

// 导入题库列表 - question
import question from '../views/index/question/question.vue'

// 导入企业列表 - enterprise
import enterprise from '../views/index/enterprise/enterprise.vue'

// 导入学科列表 - subject
import subject from '../views/index/subject/subject.vue'

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
            children: [
                {
                    path: 'chart',
                    component: chart
                },
                {
                    path: 'user',
                    component: user
                },
                {
                    path: 'question',
                    component: question
                },
                {
                    path: 'enterprise',
                    component: enterprise
                },
                {
                    path: 'subject',
                    component: subject
                },
            ]
        },
    ]
})

export default router