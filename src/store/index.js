import user from './modules/user';
import menu from './modules/menu';
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'
import lock from './modules/lock'
import scroll from './modules/scroll'

Vue.use(Vuex);

const store = new Vuex.Store({
    getters,
    actions: {
    },
    modules: {
        user,
        menu,
        lock,
        scroll
    }
});

export default store