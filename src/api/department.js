import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/vue-admin-template/department/findAll',
    method: 'get',
  })
}

export function deleteById(deptId) {
  return request({
    url: '/vue-admin-template/department/deleteById',
    method: 'delete',
    data: { deptId },
  })
}

export function deleteByIds(deptIds) {
  return request({
    url: '/vue-admin-template/department/deleteByIds',
    method: 'delete',
    data: { deptIds },
  })
}

export function create(data) {
  return request({
    url: '/vue-admin-template/department/create',
    method: 'post',
    data,
  })
}

export function updateById(data) {
  return request({
    url: '/vue-admin-template/department/updateById',
    method: 'put',
    data,
  })
}
