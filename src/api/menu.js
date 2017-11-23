import fetch from '@/libs/fetch'

export function getMenu() {
  return fetch({
    url: '/main/menu',
    method: 'get'
  })
}
