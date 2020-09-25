/** When your routing recipients-management is too long, you can split it into small modules **/

import Layout from '@/layout'

const recipientsRouter = {
  path: '/recipients-management',
  component: Layout,
  redirect: '/recipients-management/recipients-requisition',
  name: 'RecipientsManagement',
  meta: {
    title: 'RecipientsManagement',
    icon: 'el-icon-s-order'
  },
  children: [
    {
      path: 'recipients-requisition',
      component: () => import('@/views/recipients-management/recipients-requisition/recipients-requisition'),
      name: 'RecipientsRequisition',
      meta: { title: 'recipientsRequisition' }
    },
    {
      path: 'recipients-log',
      component: () => import('@/views/recipients-management/recipients-log/recipients-log'),
      name: 'recipientsLog',
      meta: { title: 'recipientsLog' }
    }
  ]
}
export default recipientsRouter
