const state = () => ({
  groups: [],
});

const getters = {
  getGroups(state) {
    return state.groups;
  },
};

const actions = {
  setGroups({ commit }, data) {
    commit('SET_GROUPS', data);
  },
};

const mutations = {
  SET_GROUPS(state, payload) {
    state.groups = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
