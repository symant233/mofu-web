import Vue from 'vue';

const state = () => ({
  groups: {},
});

const getters = {};

const actions = {};

const mutations = {
  setGroups(state, payload) {
    state.groups = payload;
  },
  addGroup(state, group) {
    Vue.set(state.groups, group.id, group);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
