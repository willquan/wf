import iView from 'iview';
import Vue from 'vue';
import Util from './libs/util';
import {router} from './router/router.js';
import CookiesUtil from '@/libs/CookiesUtil.js'
import 'iview/dist/styles/iview.css';

Vue.use(iView);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    //手动输入地址时，from.name为null
    if (CookiesUtil.User.isLocking() && to.name !== 'locking') {  // 如果当前是锁定状态，不管访问哪个路由，都跳转到锁屏界面
        next(false);
        router.replace({
            name: 'locking'
        });
    } else if(!CookiesUtil.User.isLocking() && to.name === 'locking') {
        next(false);
    } else {
        if (!CookiesUtil.User.getUserName() && to.name !== 'login') {  // 没有登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (CookiesUtil.User.getUserName() && to.name === 'login') {  // 已经登录且前往的是登录页，自动登录到主页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            // if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access !== undefined) {  // 判断用户是否有权限访问当前页
            //     if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access === parseInt(Cookies.get('access'))) {
            //         Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);  // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
            //     } else {
            //         router.replace({
            //             name: 'error_401'
            //         });
            //         next();
            //     }
            // } else {
            //     Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
            // }
            next();
        }
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});