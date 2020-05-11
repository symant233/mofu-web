import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

// new Vue({
//   components: { App },
//   router,
//   template: '<App/>'
// }).$mount('#app');

new Vue({
  render: h => h(App)
}).$mount('#app');
