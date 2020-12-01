// 采购请求地址
import request from '@/utils/request'
// 获取采购订单列表
export function fetchpurchaseOrderList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}
// 订单计划列表
export function fetchOrderPlanList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}

// 科室需求计划列表
export function fetchDemandPlanPaidList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}

// 科室需求审核列表
export function fetchDemandExamineList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}

