import Cookies from 'js-cookie';
import Vue from 'vue';
import Vuex from 'vuex';
import { appRouter } from '@/router/router.js';

Vue.use(Vuex);

const menu = {
    state: {
        menuList: [],
        menuTheme: 'dark'
    },
    mutations: {
        updateMenulist(state) {
            state.menuList = appRouter;
        }
    }
};

export default menu;