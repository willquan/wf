import iView from 'iview';
import Vue from 'vue';
import store from './store'
import Util from './libs/util';
import { router } from './router/router.js';
import 'iview/dist/styles/iview.css';
import { getToken } from '@/libs/auth' // 验权

Vue.use(iView);

function nextStep(to, from, next) {
    const isLocking = store.state.lock.isLocking;
    if (to.name === 'login') {  //免登录，自动跳转到主页面
        next({name: 'home_index'});
        iView.LoadingBar.finish();
    } else if (isLocking && to.name == 'locking') {
        next();
    } else if(isLocking && to.name !== 'locking') {
        next(false);
        iView.LoadingBar.finish();
    } else if (!isLocking && to.name === 'locking') {
        //如果没有锁屏，不允许手动跳转到锁屏界面
        // 如果当前是锁定状态，访问非锁屏路由，不跳转
        next({name: 'home_index'});
        iView.LoadingBar.finish();
    } else {
        next();
    }
}

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if(getToken()) {
        const userInfoLoaded = store.getters.roles.length != 0;
        if(!userInfoLoaded) {
            store.dispatch('GetInfo').then(res => {
               nextStep(to, from, next); 
            })
        } else {
            nextStep(to, from, next);
        }
    } else { //没有登录，或者退出登录
        if(to.name === 'login') next();
        else next({name: 'login'});
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});