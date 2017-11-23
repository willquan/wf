import fetch from '@/libs/fetch'

export function postEmployee(employee) {
  return fetch({
    url: '/manager/employee/add',
    method: 'post',
    data: employee
  })
}
