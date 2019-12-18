// 导入vue
import Vue from 'vue'

// 导入VueX
import Vuex from 'vuex'

// 注册Vuex
Vue.use(Vuex)

// 实例store  ==   仓库
const store = new Vuex.Store({
    state : {           //存储数据
        userInfo : '',
    }
})

// 暴露Vuex
export default store
