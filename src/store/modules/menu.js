import Cookies from 'js-cookie';
import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store'

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