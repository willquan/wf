import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menuList: [{
            path: '/component',
            icon: 'social-buffer',
            name: 'component',
            title: '组件',
            children: [{
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
        }],
        menuTheme: 'dark'
    },
    getters: {

    },
    mutations: {
        lock(state) {
            Cookies.set('locking', '1');
        },
        unlock(state) {
            Cookies.set('locking', '0');
        }
    },
    actions: {

    }
});