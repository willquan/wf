import axios from 'axios'
import iView from 'iview';
import store from '../store'
import { getToken } from '@/libs/auth'
import env from '../config/env';

const ajaxUrl = env === 'development' ? 'http://localhost:3000' :
                env === 'production' ? 'https://www.url.com' : 'https://debug.url.com';

// 创建axios实例
const service = axios.create({
  baseURL: ajaxUrl, // api的base_url
  timeout: 15000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 1) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        iView.Modal.confirm({
          title: '登录已失效',
          content: '你已被登出，可以取消继续留在该页面，或者重新登录',
          onOk: () => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          }
        });
      } else if(res.code == 0) {
        iView.Message.error(res.message);
      }
      return Promise.reject(res.message);
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    iView.Message.error("网络连接失败：" + error);
    return Promise.reject(error)
  }
)
export default service
