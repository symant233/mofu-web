import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import group from './group';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    common,
    group,
  },
  strict: debug,
});

/**
 * 应用层级的状态应该集中到单个 store 对象中
 * mutation 是更改状态的唯一方法，并且这个过程是同步的
 * 异步逻辑都应该封装到 action 里面
 */
