const state = () => ({
  user: {},
});

const getters = {};

const actions = {
  setUser({ commit }, data) {
    commit('SET_USER', data);
  },
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
