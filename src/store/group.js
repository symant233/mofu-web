const state = () => ({
  groups: [],
});

const getters = {
  getGroups(state) {
    return state.groups;
  },
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
