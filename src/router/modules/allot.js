/** 调拨管理 When your routing allot-management is too long, you can split it into small modules **/

import Layout from '@/layout'

const allotRouter = {
  path: '/allot-management',
  component: Layout,
  redirect: '/allot-management/allot-requisition/allot-requisition',
  name: 'AllotManagement',
  meta: {
    title: 'AllotManagement',
    icon: 'el-icon-s-claim'
  },
  children: [
    {
      path: 'allot-requisition',
      component: () => import('@/views/allot-management/allot-requisition/allot-requisition'),
      name: 'AllotRequisition',
      meta: { title: 'allotRequisition' }
    },
    {
      path: 'allot-log',
      component: () => import('@/views/allot-management/allot-log/allot-log'),
      name: 'AllotLog',
      meta: { title: 'allotLog' }
    }
  ]
}
export default allotRouter
