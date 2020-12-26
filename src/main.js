import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 加载rem基准值
import 'amfe-flexible'
// 加载vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

import './utils/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
