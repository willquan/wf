import Cookies from 'js-cookie';

const CookiesUtil = {
    User: {
        getUserName() {
            return Cookies.get('user');
        },
        getPassword() {
            return Cookies.get('password');
        },
        hasAccess() {
            return Cookies.get('access');
        },
        getAvator() {
            return Cookies.get('avator');
        },
        getPageBeforeLock() {
            return Cookies.get('pageBeforeLock');
        },
        isLocking() {
            return Cookies.get('locking') === '1';
        }, 
        setPageBeforeLock(pageName) {
            Cookies.set('pageBeforeLock', pageName);
        },
        lock(pageName) {
            Cookies.set('locking', '1');
        },
        unlock() {
            Cookies.set('locking', '0');
        },
        saveUserName(username) {
            Cookies.set('user', username);
        },
        savePassword(pwd) {
            Cookies.set('password', pwd);
        },
        saveAccess(access) {
            Cookies.set('access', access);
        },
        setAvator(path) {
            Cookies.set('avator', path);
        },
        clearUserCache() {
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            localStorage.clear();
        }
    }
}
export default CookiesUtil;