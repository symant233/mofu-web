// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import App from './App';
import router from './router';
import store from './store';
import { SENTRY_DSN } from './core/constants';

Vue.config.productionTip = false;

Sentry.init({
  Vue,
  dsn: SENTRY_DSN,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

Vue.directive('focus', {
  // 自定义指令 v-focus
  inserted(el) {
    // 当被绑定的元素插入到 DOM 中时
    el.focus(); // 聚焦元素
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
