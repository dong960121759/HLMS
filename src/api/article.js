import request from '@/utils/request'

// 获得管理员列表
export function getUsers() {
  return request({
    url: '/logistics/api/logistics/api/warehouse/getUsers',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
// 出入库申请列表
export function fetchAccessStorageRequisition(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

// 库存列表
export function fetchStorageEntry(query) {
  return request({
    url: 'logistics/warehouse/inventory-details',
    method: 'get',
    params: query
  })
}

// 删除出入库存列表
export function deleteAccessDetailed(selected) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: selected
  })
}

// 查询领用日志
export function fetchRecipientsLog(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
// 删除所选领用日志
export function deleteRecipientsLog(selected) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: selected
  })
}
// 查询领用申请
export function fetchRecipientsRequisition(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

// 删除所选领用申请
export function deleteRecipientsRequisition(selected) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: selected
  })
}
