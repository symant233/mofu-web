const state = () => ({
  groups: {},
  groupList: [],
});

const getters = {};

const actions = {};

const mutations = {
  setGroups(state, payload) {
    state.groups = payload;
  },
  setGroupList(state, payload) {
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
