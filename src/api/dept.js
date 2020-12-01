// 科室管理
import request from '@/utils/request'

// 获取科室需求计划列表
export function fetchDeptDemandPlanList(query) {
  return request({
    url: '/logistics/api/public/mock',
    method: 'get',
    params: query
  })
}
