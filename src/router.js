/* eslint-disable global-require */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mofu-auth',
      component: require('@/pages/TryAuth').default,
      meta: { title: 'redirecting...' },
    },
    {
      path: '/login',
      name: 'mofu-login',
      component: require('@/pages/Login').default,
      meta: { title: '登录' },
    },
    {
      path: '/register',
      name: 'mofu-register',
      component: require('@/pages/Register').default,
      meta: { title: '注册' },
    },
    {
      path: '/chats/:channel',
      name: 'mofu-chat',
      component: require('@/pages/Chat').default,
      meta: { title: 'mofu-chat' },
    },
    {
      path: '/audit',
      name: 'mofu-audit',
      component: require('@/pages/Audit').default,
      meta: { title: 'mofu-audit' },
    },
    {
      path: '*',
      name: 'mofu-not-found',
      component: require('@/pages/NotFound').default,
      meta: { title: 'mofu not found' },
    },
  ],
});

router.afterEach((to, from) => {
  document.title = to.meta.title ? to.meta.title : 'mofu-web';
});

export default router;
