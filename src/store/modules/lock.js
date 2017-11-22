import Vue from 'vue';
import Vuex from 'vuex';
import lockUtil from '@/libs/lockUtil'
Vue.use(Vuex);

const lock = {
    state: {
        isLocking: lockUtil.isLocking(),
        pageBeforeLock: lockUtil.getPageBeforeLock()
    },
    mutations: {
        lock(state, page) {
            state.isLocking = 1;
            lockUtil.lock(page)
        },
        unlock(state) {
            state.isLocking = 0;
            lockUtil.unlock();
        }
    }
};

export default lock;