// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faInfoCircle,
  faComment,
  faAddressBook,
  faEnvelope,
  faKey,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import App from './App';
import router from './router';
import store from './store';
import { SENTRY_DSN, TOAST } from './core/constants';
import './core/mixin';

library.add(faInfoCircle, faComment, faAddressBook, faEnvelope, faKey, faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
const ENV = process.env.NODE_ENV;

if (ENV === 'production') {
  // 生产环境启用 Sentry
  Sentry.init({
    Vue,
    dsn: SENTRY_DSN,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

Vue.directive('focus', {
  // 自定义指令 v-focus
  inserted(el) {
    // 当被绑定的元素插入到 DOM 中时
    el.focus(); // 聚焦元素
  },
});

Vue.use(Toast, TOAST);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
