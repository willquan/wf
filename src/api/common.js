import fetch from '@/libs/fetch'

export default function createApi(res) {
    let api = {}
    const baseUrl = '/' + res
    api.res = res;
    /*===================增=========================*/
    api.create = function create(item) {
      const _url = baseUrl + '/create';
      return fetch.post(_url, item)
    }
    /*===================删=========================*/
    api.deleteByIds = function (ids) {
      const _url = baseUrl + '/deletes';
      return fetch.delete(_url);
    }
    
    api.delete = function (id) {
      const _url = baseUrl + '/delete';
      return fetch.delete(_url + '/' + id);
    }
    
    /*===================改=========================*/
    api.update = function (item) {
      const _url = baseUrl + '/update/' + item.id;
      return fetch.put(_url, item);
    }
    
    /*===================查=========================*/
    api.query = function (id) {
      const _url = baseUrl + '/query/' + id;
      return fetch.get(_url);
    }
    
    api.queryList = function (_params) {
        if(!_params) _params = {}
        let _url = baseUrl + '/query'
        if(res == 'users') _url = baseUrl + '?_expand=department&_expand=position'
        if(res == 'faults') _url = baseUrl + '?_expand=team&_expand=major&_expand=group&_expand=user&_expand=flevel&_expand=kks'
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