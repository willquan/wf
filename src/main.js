import Vue from 'vue';
import App from './app.vue';
import store from './store';
import {router} from './router/router.js';
import '@/permission' // 权限

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {
        this.$store.commit('updateMenulist');
    }
});