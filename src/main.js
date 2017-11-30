import Vue from 'vue';
import App from './app.vue';
import store from './store';
import {router} from './router/router';
import '@/permission'; // 权限

Vue.directive('fix-height', function (el, binding) {
    el.style.overflow = 'auto'
    el.style.paddingRight = '10px'
    el.style.paddingLeft = '10px'
    el.style.paddingBottom = '50px'
    el.style.height = store.getters.singlePageHeight + 'px'
})

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {
    }
});