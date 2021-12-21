import request from '@/utils/request'

export function getHospitals(params) {
  return request({
    url: '/vue-admin-template/hospital/list',
    method: 'get',
    params,
  })
}
