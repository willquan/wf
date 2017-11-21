import iView from 'iview';
import Vue from 'vue';
import store from './store'
import Util from './libs/util';
import { router } from './router/router.js';
import 'iview/dist/styles/iview.css';
import { getToken } from '@/libs/auth' // 验权

Vue.use(iView);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    const isLocking = store.state.isLocking;
    
    if(isLocking && to.name !== 'locking') { // 如果当前是锁定状态，不管访问哪个路由，都跳转到锁屏界面
        next(false);
        router.replace({
            name: 'locking'
        });
    } else if (!isLocking && to.name === 'locking') {//如果没有锁屏，不允许手动跳转到锁屏界面
        next(false);
    } else if(getToken()) {
        if (to.name === 'login') {
            next({name: 'home_index'});
            iView.LoadingBar.finish();
        } else {
            if (store.getters.roles.length === 0) { //获取角色信息
                store.dispatch('GetInfo').then(res => {
                    const roles = res.data.role
                    store.dispatch('GenerateRoutes', {
                        roles
                    }).then(() => {
                        router.addRoutes(store.getters.addRouters)
                        next({ ...to })
                    })
                })
            } else { //如果已经存在用户信息则直接跳转
                next()
            }
        }
    } else { //没有授权的直接跳转到登录页面
        if(to.name === 'login') next();
        else next({name: 'login'})
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});