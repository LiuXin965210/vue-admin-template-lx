import request from '@/utils/request'

export function getDocs(params) {
  return request({
    url: '/vue-admin-template/doc/list',
    method: 'get',
    params,
  })
}
