import Main from './views/main/Main.vue';

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['./views/login/login.vue'], resolve); }
};
export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['./views/error_page/404.vue'], resolve); }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => { require(['./views/error_page/401.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => { require(['./views/error_page/500.vue'], resolve); }
};

const appRouter = [
    {
        path: '/',
        name: 'home_index',
        component: Main,
        children: [
            { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['./views/home/home.vue'], resolve); } },
        ]
    }
];
const routers = [
    loginRouter,
    ...appRouter,
    page500,
    page401,
    page404
];
export default routers;