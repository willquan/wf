import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const menu = {
    state: {
        menuList: [],
        menuTheme: 'dark'
    },
    mutations: {
        updateMenulist(state) {
            state.menuList = [];
        }
    }
};

export default menu;