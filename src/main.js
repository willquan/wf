import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);



// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {
        menuList: [
            {
                path: '/component',
                icon: 'social-buffer',
                name: 'component',
                title: '组件',
                children: [
                    {
                        path: 'text-editor',
                        icon: 'compose',
                        name: 'text-editor',
                        title: '富文本编辑器',
                    },
                    {
                        path: 'md-editor',
                        icon: 'pound',
                        name: 'md-editor',
                        title: 'Markdown编辑器',
                    },
                    {
                        path: 'image-editor',
                        icon: 'crop',
                        name: 'image-editor',
                        title: '图片预览编辑',
                    },
                    {
                        path: 'draggable-list',
                        icon: 'arrow-move',
                        name: 'draggable-list',
                        title: '可拖拽列表',
                    },
                    {
                        path: 'area-linkage',
                        icon: 'ios-more',
                        name: 'area-linkage',
                        title: '城市级联',
                    },
                    {
                        path: 'file-upload',
                        icon: 'android-upload',
                        name: 'file-upload',
                        title: '文件上传',
                    },
                    {
                        path: 'count-to',
                        icon: 'arrow-graph-up-right',
                        name: 'count-to',
                        title: '数字渐变',
                    }
                ]
            }
        ],
        menuTheme: 'dark'
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});