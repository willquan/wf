import fetch from '@/libs/fetch'

export function addEmployee(employee) {
  return fetch({
    url: '/users',
    method: 'post',
    data: employee
  })
}

export function modifyEmployee(employee) {
  return fetch({
    url: '/users/' + employee.id,
    method: 'put',
    data: employee
  })
}

export function getDepartments() {
  return fetch({
    url: '/departments',
    method: 'get'
  })
}

export function getPositions() {
  return fetch({
    url: '/positions',
    method: 'get'
  })
}

export function getRoles() {
  return fetch({
    url: '/roles',
    method: 'get'
  })
}

export function getEmployeeList() {
  return fetch({
    url: '/users?_expand=department&_expand=role&_expand=position',
    method: 'get'
  })
}

export function getEmployeeById(id) {
  return fetch({
    url: '/users/' + id,
    method: 'get'
  })
}

