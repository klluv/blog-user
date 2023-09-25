import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    content: null,
  },
  mutations: {
    setContent(state, content) {
      state.content = content;
    },
  },
  actions: {
    
  }
});

export default store;