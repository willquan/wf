import fetch from '@/libs/fetch'

export function login(username, password) {
  let _url = '/login';
  return fetch.get(_url, {
    params: {
      username: username,
      password: password
    }
  });
}

export function getInfo() {
  let _url = '/info';
  return fetch.get(_url);
}

export function logout() {
  let _url = '/logout';
  return fetch.get(_url);
}

export function unlock(password) {
  let _url = '/unlock';
  return fetch.get(_url, {
    params: {
      password: password
    }
  });
}