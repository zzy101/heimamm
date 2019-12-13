import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './router/router.js'

// 导入 element-ui 和 element-ui的样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//注册element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
