/** 采购管理 When your routing purchase is too long, you can split it into small modules **/

import Layout from '@/layout'

const purchaseRouter = {
  path: '/purchase',
  component: Layout,
  redirect: '/purchase/dept-demand-plan',
  name: 'Purchase',
  meta: {
    title: 'Purchase',
    icon: 'el-icon-s-claim'
  },
  children: [
    {
      path: 'dept-demand-plan',
      component: () => import('@/views/purchase/dept-demand-plan'),
      name: 'DeptDemandPlan',
      meta: { title: 'deptDemandPlan' }
    },
    {
      path: 'allot-log',
      component: () => import('@/views/purchase/purchase-plan'),
      name: 'PurchasePlan',
      meta: { title: 'purchasePlan' }
    }
  ]
}
export default purchaseRouter
