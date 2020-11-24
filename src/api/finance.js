// 财务请求地址
import request from '@/utils/request'
// 获取已付款项目列表
export function fetchPaidList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}
// 获取已付款项目列表
export function fetchPayableList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}
