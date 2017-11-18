<template>
    <div style="width: 100%;height: 100%;background: #667aa6">
        <div class="unlock-con">
            <unlock :show-unlock="showUnlock" @on-unlock="handleUnlock" :avatorPath="avatorPath"></unlock>
        </div>
    </div>
</template>

<script>
import unlock from './unlock.vue';
import CookiesUtil from '@/libs/CookiesUtil.js'

export default {
    components: {
        unlock
    },
    data () {
        return {
            showUnlock: false,
            avatorPath: CookiesUtil.User.getAvator()
        };
    },
    methods: {
        handleUnlock () {
            let lockScreenBack = document.getElementById('lock_screen_back');
            this.showUnlock = false;
            lockScreenBack.style.zIndex = -1;
            lockScreenBack.style.boxShadow = '0 0 0 0 #667aa6 inset';
            this.$router.replace({
                name: CookiesUtil.User.getPageBeforeLock()  // 解锁之后跳转到锁屏之前的页面
            });
        }
    },
    mounted () {
        this.showUnlock = true;
        let lockScreenBack = document.getElementById('lock_screen_back');
        lockScreenBack.style.zIndex = -1;
    }
};
</script>
