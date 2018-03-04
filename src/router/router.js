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
        path: '/fault',
        redirect: {name: 'home_index'},
        icon: 'bug',
        name: 'fault',
        meta: {title: '缺陷管理'},
        component: Main,
        children: [
            { path: 'manage', meta:{title: '缺陷办理'}, name: 'manage', component: resolve => { require(['@/views/page/fault/page.vue'], resolve); } },
        ]
    },
    {
        path: '/operateManage',
        redirect: {name: 'home_index'},
        icon: 'bug',
        name: 'operateManage',
        meta: {title: '操作票管理'},
        component: Main,
        children: [
            { path: 'operateTicket', meta:{title: '操作票列表'}, name: 'operateTicket', component: resolve => { require(['@/views/page/operateTicket/page.vue'], resolve); } },
            { path: 'typicalTicket', meta:{title: '典型票管理'}, name: 'typicalTicket', component: resolve => { require(['@/views/page/operateTicket/page.vue'], resolve); } },
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
            { path: 'employee', meta:{title: '人员管理'}, name: 'employee', component: resolve => { require(['@/views/page/employee/page.vue'], resolve); } },
            { path: 'kks', meta:{title: 'KKS管理'}, name: 'kks', component: resolve => { require(['@/views/page/kks/page.vue'], resolve); } },
            { path: 'dep', meta:{title: '部门架构'}, name: 'dep', component: resolve => { require(['@/views/page/dep/page.vue'], resolve); } },
            { path: 'equipment', meta:{title: '单元管理'}, name: 'equipment', component: resolve => { require(['@/views/page/equipment/page.vue'], resolve); } },
            { path: 'brole', meta:{title: '业务角色'}, name: 'brole', component: resolve => { require(['@/views/page/brole/page.vue'], resolve); } },
            { path: 'role', meta:{title: '系统角色'}, name: 'role', component: resolve => { require(['@/views/page/role/page.vue'], resolve); } },
        ]
    },
    {
        path: '/state',
        redirect: {name: 'home_index'},
        icon: 'star',
        name: 'state',
        meta: {title: '状态管理'},
        component: Main,
        children: [
            { path: 'fstate', meta:{title: '缺陷状态'}, name: 'fstate', component: resolve => { require(['@/views/page/fstate/page.vue'], resolve); } },
            { path: 'workTicketState', meta:{title: '工作票状态'}, name: 'workTicketState', component: resolve => { require(['@/views/page/workTicketState/page.vue'], resolve); } },
            { path: 'operateTicketState', meta:{title: '操作票状态'}, name: 'operateTicketState', component: resolve => { require(['@/views/page/operateTicketState/page.vue'], resolve); } }
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

