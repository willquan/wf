import user from './modules/user';
import menu from './modules/menu';
import Vue from 'vue';
import Vuex from 'vuex';
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
       isLocking: false
    },
    getters,
    mutations: {
       
    },
    actions: {

    },
    modules: {
        user,
        menu,
        permission
    }
});

export default store