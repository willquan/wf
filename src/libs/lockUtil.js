import Cookies from 'js-cookie';
const lockUtil = {
    lock(pageName) {
        Cookies.set('locking', '1');
        Cookies.set('pageBeforeLock', pageName);
    },
    unlock() {
        Cookies.set('locking', '0');
        Cookies.set('pageBeforeLock', '');
    },
    isLocking() {
        return Cookies.get("locking") == '1';
    },
    getPageBeforeLock() {
        return Cookies.get("pageBeforeLock") == undefined ? '' : Cookies.get("pageBeforeLock");
    }
}
export default lockUtil;