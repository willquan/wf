import fetch from '@/libs/fetch'

export function getMenu() {
  return fetch({
    url: '/menu',
    method: 'get'
  })
}
