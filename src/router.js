/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'mofu-login',
      component: require('@/components/Login').default,
    },
    {
      path: '/register',
      name: 'mofu-register',
      component: require('@/components/Register').default,
    },
    {
      path: '/app',
      name: 'mofu-chat',
      component: require('@/components/Chat').default,
    },
  ],
});
