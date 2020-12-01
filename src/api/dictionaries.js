// 字典请求地址
import request from '@/utils/request'
// 获取已付款项目列表
export function fetchDnMaterialList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}
// 获取已付款项目列表
export function fetchDnSupplierList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}
