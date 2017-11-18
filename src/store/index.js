import user from './modules/user';
import menu from './modules/menu';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
       
    },
    getters: {
        
    },
    mutations: {
       
    },
    actions: {

    },
    modules: {
        user,
        menu
    }
});

export default store