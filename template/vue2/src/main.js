import Vue from 'vue'
import { Button, Select, Message } from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Button.name, Button)
Vue.use(Select.name, Select)
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
