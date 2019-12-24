import Vue from 'vue'

// 导入moment组件
import moment from 'moment'

// 不需要暴露 , 只需要在 Main.js 导入路径即可
Vue.filter('filterMoment',function(time){
    return moment(time).format('YYYY☀️MM🌙DD⭐')
})



