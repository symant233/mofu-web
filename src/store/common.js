const state = () => ({
  warnMessage: '',
});

const getters = {
  getWarn(state) {
    return state.warnMessage;
  },
};

const actions = {
  setWarn({ commit }, msg) {
    commit('SET_WARN', msg);
  },
};

const mutations = {
  SET_WARN(state, payload) {
    state.warnMessage = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
