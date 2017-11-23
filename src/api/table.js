import fetch from '@/libs/fetch'

export function getList(params) {
  return fetch({
    url: '/table/list',
    method: 'get',
    params
  })
}
