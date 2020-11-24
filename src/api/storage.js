// 仓库管理地址
import request from '@/utils/request'
// 获取仓库清单
export function fetchWarehouseList(query) {
  return request({
    url: '/logistics/api/warehouse/list',
    method: 'get',
    params: query
  })
}
// 删除仓库
export function deleteWarehouseList(warehouseId) {
  return request({
    url: '/logistics/api/warehouse/delete-warehouse',
    method: 'get',
    params: warehouseId
  })
}
// 新建仓库
export function createWarehouse(query) {
  return request({
    url: '/logistics/api/warehouse/create-warehouse',
    method: 'post',
    params: query
  })
}
// 仓库详情
export function fetchWarehouse(warehouseId) {
  return request({
    url: '/logistics/api/warehouse/warehouse-detail',
    method: 'get',
    params: warehouseId
  })
}
// 库存明细
export function fetchStorageEntry(query) {
  return request({
    url: '/logistics/api/warehouse/inventory-details',
    method: 'get',
    params: query
  })
}
// 出入库申请
export function fetchAccessRequisition(query) {
  return request({
    url: '/logistics/api/access/getAccessRequisition',
    method: 'get',
    params: query
  })
}

// 调拨申请列表
export function fetchAllotRequisition(query) {
  return request({
    url: '/logistics/api/allotRequisition/getAllotRequisitionList',
    method: 'get',
    params: query
  })
}
