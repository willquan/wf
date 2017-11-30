import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const scroll = {
    state: {
        singlePageHeight: ''
    },
    mutations: {
        ADD_HEIGHT: (state, singlePageHeight) => {
            state.singlePageHeight = singlePageHeight - 32 - 16
        }
    }
};

export default scroll;