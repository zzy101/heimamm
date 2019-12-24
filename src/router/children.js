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

export default [
    {
        path: 'chart',
        component: chart,
        meta: {
            power: ['超级管理员','管理员', '老师', '学生'],
            icon: 'el-icon-pie-chart',
            index: '/index/chart',
            title: '数据概览'
        }
    },
    {
        path: 'user',
        component: user,
        meta: {
            power: ['超级管理员','管理员'],
            icon: 'el-icon-user',
            index: '/index/user',
            title: '用户列表'
        }
    },
    {
        path: 'question',
        component: question,
        meta: {
            power: ['超级管理员','管理员', '老师','学生'],
            icon: 'el-icon-edit-outline',
            index: '/index/question',
            title: '题库列表'
        }
    },
    {
        path: 'enterprise',
        component: enterprise,
        meta: {
            power: ['管理员', '老师'],
            icon: 'el-icon-office-building',
            index: '/index/enterprise',
            title: '企业列表'
        }
    },
    {
        path: 'subject',
        component: subject,
        meta: {
            power: ['管理员', '老师', '学生'],
            icon: 'el-icon-notebook-2',
            index: '/index/subject',
            title: '学科列表'
        }
    },
]