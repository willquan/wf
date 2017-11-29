import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const scroll = {
    state: {
        currentScroll: 0,
        scrolls: {}
    },
    mutations: {
        ADD_SCROLL: (state, scroll) => {
            state.scroll = scroll
        }
    }
};

export default scroll;