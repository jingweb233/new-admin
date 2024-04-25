import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
// import { Button } from 'element-ui'
import router from './router'

import service from './service'
Vue.prototype.service = service //挂载在原型可全局使用
Vue.use(ElementUI);
// Vue.prototype.axios = axios
// Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
