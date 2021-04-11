/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mofu-auth',
      component: require('@/pages/TryAuth').default,
    },
    {
      path: '/login',
      name: 'mofu-login',
      component: require('@/pages/Login').default,
    },
    {
      path: '/register',
      name: 'mofu-register',
      component: require('@/pages/Register').default,
    },
    {
      path: '/chats/:channel',
      name: 'mofu-chat',
      component: require('@/pages/Chat').default,
    },
    {
      path: '/audit',
      name: 'mofu-audit',
      component: require('@/pages/Audit').default,
    },
    {
      path: '*',
      name: 'mofu-not-found',
      component: require('@/pages/NotFound').default,
    },
  ],
});
