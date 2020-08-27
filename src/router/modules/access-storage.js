/** 出入库管理When your routing recipients-management is too long, you can split it into small modules **/

import Layout from '@/layout'

const accessStorageRouter = {
  path: '/access-storage-management',
  component: Layout,
  redirect: '/access-storage-management/access-storage-requisition/access-storage-requisition',
  name: 'AccessStorageManagement',
  meta: {
    title: 'AccessStorageManagement',
    icon: 'el-icon-s-fold'
  },
  children: [
    {
      path: 'access-storage-requisition',
      component: () => import('@/views/access-storage-management/access-storage-requisition/access-storage-requisition'),
      name: 'AccessStorageRequisition',
      meta: { title: 'accessStorageRequisition' }
    },
    {
      path: 'recipients-log',
      component: () => import('@/views/access-storage-management/access-storage-log/access-storage-log'),
      name: 'AccessStorageLog',
      meta: { title: 'accessStorageLog' }
    }
  ]
}
export default accessStorageRouter
