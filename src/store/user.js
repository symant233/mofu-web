const state = () => ({
  user: {},
});

const getters = {};

const actions = {};

const mutations = {
  setUser(state, payload) {
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
