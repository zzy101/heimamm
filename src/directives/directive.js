import Vue from 'vue'
// import router from '../router/router'

import store from '../store/store.js'

// 不需要暴露,只要在main.js导入路径就行
Vue.directive('power',{
    inserted : function(el,binding){
        if(binding.value.includes(store.state.userInfo.role)) {
            el.parentNode.removeChild(el)
        }
        // window.console.log(store.state.userInfo.role)
        // window.console.log(el)
        // window.console.log(binding.value.role)
    }
})