const state = () => ({
  groups: {},
  groupList: [],
});

const getters = {};

const actions = {
  setGroups({ commit }, data) {
    commit('SET_GROUPS', data);
  },
  setGroupList({ commit }, data) {
    commit('SET_GROUP_LIST', data);
  },
};

const mutations = {
  SET_GROUPS(state, payload) {
    state.groups = payload;
  },
  SET_GROUP_LIST(state, payload) {
    state.groupList = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
