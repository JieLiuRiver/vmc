import Vue from 'vue'
import App from './App'
import router from './router'
import './style/index.less';
import 'packages/vmc-less/ionicons.min.css';
import vmc from 'packages'

Vue.config.productionTip = false



Vue.use(vmc)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
