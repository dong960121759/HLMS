/** 调拨管理 When your routing allot-management is too long, you can split it into small modules **/

import Layout from '@/layout'

const deptManagementRouter = {
  path: '/dept-management',
  component: Layout,
  redirect: '/allot-management/requisition-recipients',
  name: 'DeptManagement',
  meta: {
    title: 'DeptManagement',
    icon: 'el-icon-s-claim'
  },
  children: [
    {
      path: 'requisition-recipients',
      component: () => import('@/views/dept-management/requisition-recipients'),
      name: 'RequisitionRecipients',
      meta: { title: 'requisitionRecipients' }
    },
    {
      path: 'demand-plan',
      component: () => import('@/views/dept-management/demand-plan'),
      name: 'DemandPlan',
      meta: { title: 'demandPlan' }
    },
    {
      path: 'user-management',
      component: () => import('@/views/dept-management/user-management'),
      name: 'userManagement',
      meta: { title: 'userManagement' }
    }

  ]
}
export default deptManagementRouter
