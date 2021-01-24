const state = () => ({
  groups: {},
});

const getters = {};

const actions = {};

const mutations = {
  setGroups(state, payload) {
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
