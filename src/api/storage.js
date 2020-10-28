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

