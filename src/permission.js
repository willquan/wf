import iView from 'iview';
import Vue from 'vue';
import store from './store'
import Util from './libs/util';
import { router } from './router/router.js';
import 'iview/dist/styles/iview.css';
import { getToken } from '@/libs/auth' // 验权

Vue.use(iView);

function nextStep(to, from, next) {
    const isLocking = store.state.lock.isLocking == 1;
    if (isLocking && to.name == 'locking') {
        next();
    } else if(isLocking && to.name !== 'locking') {
        next(false);
        router.replace({name: 'locking'});
    } else if (!isLocking && to.name === 'locking') {
        next(false);
        router.replace({name: 'home_index'});
    } else if (to.name === 'login') {  //免登录，自动跳转到主页面
        next(false);
        router.replace({name: 'home_index'});
    } else {
        next();
    }
}

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if(getToken()) {
        const userInfoLoaded = store.getters.name.length != 0;
        if(!userInfoLoaded) {
            store.dispatch('GetInfo').then(res => {
               nextStep(to, from, next); 
            })
        } else {
            nextStep(to, from, next);
        }
    } else { //没有登录，或者退出登录
        if(to.name === 'login') next();
        else {
            next(false);
            router.replace({name: 'login'});
            iView.LoadingBar.finish();
        }
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});