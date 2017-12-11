import fetch from '@/libs/fetch'

export default function createApi(res) {
    let api = {}
    const baseUrl = '/' + res
    api.res = res;
    /*===================增=========================*/
    api.create = function create(item) {
      const _url = baseUrl;
      return fetch.post(_url, item)
    }
    /*===================删=========================*/
    api.deleteByIds = function (ids) {
      const _url = baseUrl;
      return fetch.delete(_url);
    }
    
    api.delete = function (id) {
      const _url = baseUrl;
      return fetch.delete(_url + '/' + id);
    }
    
    /*===================改=========================*/
    api.update = function (item) {
      const _url = baseUrl + '/' + item.id;
      return fetch.put(_url, item);
    }
    
    /*===================查=========================*/
    api.query = function (id) {
      const _url = baseUrl + '/' + id;
      return fetch.get(_url);
    }
    
    api.queryList = function (_params) {
        if(!_params) _params = {}
        let _url = baseUrl
        if(res == 'users') _url = baseUrl + '?_expand=department&_expand=role&_expand=position'
        return fetch.get(_url, {
            params: {
              ..._params
            }
        });
    }
    
    api.queryListTotal = function (_params) {
        if(!_params) _params = {}
        const _url = baseUrl + '/total'
        return fetch.get(_url, {
            params: {
                // ..._params
            }
        });
    }
    return api
}