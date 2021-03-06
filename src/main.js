import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './router/router.js'

// 导入 element-ui 和 element-ui的样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入仓库
import store from './store/store.js'

// 导入过滤器
import './filters/filters.js'

// 导入自定义指令
import './directives/directive.js'


//注册element-ui
Vue.use(ElementUI);

// 导入初始化css
import './style/base.css'

// 接收基地址
// window.console.log(process.env.VUE_APP_info)

Vue.config.productionTip = false

new Vue({
  router,   //挂载路由
  store,     //挂载Vuex
  render: h => h(App),
}).$mount('#app')
