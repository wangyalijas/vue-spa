import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/index'
import 'element-ui/lib/theme-chalk/index.css';
import TableHelperMixin from './mixins/table_helper';

Vue.use(api)
Vue.mixin(TableHelperMixin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
