// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import splitPane from 'vue-splitpane'
// mock
import './mock' // 模拟数据

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // 权限控制
import './utils/filter' // 全局过滤器
import i18n from './locales'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(iView);
Vue.component('split-pane',splitPane);

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
