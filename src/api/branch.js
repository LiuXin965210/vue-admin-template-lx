import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/vue-admin-template/branch/findAll',
    method: 'get',
    params,
  })
}

export function deleteById(params) {
  return request({
    url: '/vue-admin-template/branch/deleteById',
    method: 'get',
    params,
  })
}

export function create(data) {
  return request({
    url: '/vue-admin-template/branch/create',
    method: 'post',
    data,
  })
}

export function updateById(data) {
  return request({
    url: '/vue-admin-template/branch/updateById',
    method: 'post',
    data,
  })
}
