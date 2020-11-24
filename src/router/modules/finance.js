/** 财务管理 When your routing purchase is too long, you can split it into small modules **/

import Layout from '@/layout'

const financeRouter = {
  path: '/finance-management',
  component: Layout,
  redirect: '/finance-management/dept-demand-plan',
  name: 'FinanceManagement',
  meta: {
    title: 'FinanceManagement',
    icon: 'el-icon-s-claim'
  },
  children: [
    {
      path: 'paid-items',
      component: () => import('@/views/finance-management/paid-items'),
      name: 'PaidItems',
      meta: { title: 'paidItems' }
    },
    {
      path: 'payable-items',
      component: () => import('@/views/finance-management/payable-items'),
      name: 'PayableItems',
      meta: { title: 'payableItems' }
    }
  ]
}
export default financeRouter
