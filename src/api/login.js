import fetch from '@/libs/fetch'

export function login(username, password) {
  return fetch({
    url: '/login',
    method: 'get',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return fetch({
    url: '/logout',
    method: 'get'
  })
}

export function unlock(password) {
  return fetch({
    url: '/unlock',
    method: 'get',
    data: {
      password
    }
  })
}