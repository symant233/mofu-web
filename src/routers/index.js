import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/landing'
    },
    {
      path: '/landing',
      name: 'hello-world',
      component: HelloWorld
    }
  ]
});
