import request from '@/utils/request'

export function getDocs(params) {
  return request({
    url: '/vue-admin-template/querydoc/list',
    method: 'get',
    params,
  })
}
