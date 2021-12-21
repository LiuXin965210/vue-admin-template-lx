import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/vue-admin-template/role/list',
    method: 'get',
    params,
  })
}
