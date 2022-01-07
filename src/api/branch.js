import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/vue-admin-template/branch/findAll',
    method: 'get',
    params,
  })
}
