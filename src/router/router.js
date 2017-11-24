import Main from '@/views/page/main/Main.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/page/login/login.vue'], resolve); }
};
export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/page/locking-page.vue'], resolve); }
};
export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error_page/404.vue'], resolve); }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => { require(['@/views/error_page/401.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => { require(['@/views/error_page/500.vue'], resolve); }
};
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: {name: 'home_index'},
    component: Main,
    children: [
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/page/own-space/own-space.vue'], resolve); } },
    ]
};
export const appRouter = [
    {
        path: '/home',
        redirect: {name: 'home_index'},
        icon: 'home',
        name: 'home',
        meta: {title: '首页'},
        component: Main,
        children: [
            { path: 'index', meta:{title: '首页'}, name: 'home_index', component: resolve => { require(['@/views/page/home/home.vue'], resolve); } },
        ]
    },
    {
        path: '/manager',
        redirect: {name: 'home_index'},
        icon: 'briefcase',
        name: 'manager',
        meta: {title: '系统管理'},
        component: Main,
        children: [
            { path: 'access', meta:{title: '权限管理'}, name: 'access', component: resolve => { require(['@/views/page/access/access.vue'], resolve); } },
            { path: 'department', meta:{title: '部门管理'}, name: 'department', component: resolve => { require(['@/views/page/department/department.vue'], resolve); } },
            { path: 'role', meta:{title: '角色管理'}, name: 'role', component: resolve => { require(['@/views/page/access/access.vue'], resolve); } },
            { path: 'job', meta:{title: '岗位管理'}, name: 'job', component: resolve => { require(['@/views/page/access/access.vue'], resolve); } },
            { path: 'employee', meta:{title: '人员管理'}, name: 'employee', component: resolve => { require(['@/views/page/employee/employee.vue'], resolve); } },
        ]
    }
];
export const routerMap = [
    loginRouter,
    otherRouter,
    ...appRouter,
    locking,
    page500,
    page401,
    page404
];

// 路由配置
export const routersConfig = {
    mode: 'history',
    routes: routerMap
};
export const router = new VueRouter(routersConfig);

