import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/vue-admin-template/branch/findAll',
    method: 'get',
  })
}

export function deleteById(branchId) {
  return request({
    url: '/vue-admin-template/branch/deleteById',
    method: 'delete',
    data: { branchId },
  })
}

export function deleteByIds(branchIds) {
  return request({
    url: '/vue-admin-template/branch/deleteByIds',
    method: 'delete',
    data: { branchIds },
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
    method: 'put',
    data,
  })
}
