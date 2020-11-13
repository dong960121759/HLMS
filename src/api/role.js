import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/logistics/api/role/getRoutes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/logistics/api/permission/getRoles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
