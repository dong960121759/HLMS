/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  redirect: '/storage/requisition-management',
  name: 'Storage',
  meta: {
    title: 'Storage',
    icon: 'el-icon-s-home'
  },
  children: [
    {
      path: 'create-warehouse',
      component: () => import('@/views/storage/warehouse/create-warehouse'),
      name: 'CreateWarehouse',
      meta: { title: 'createWarehouse' }
    },
    {
      path: 'warehouse',
      component: () => import('@/views/storage/warehouse/warehouse'),
      name: 'Warehouse',
      meta: { title: 'warehouse' }
    },
    {
      path: 'print',
      component: () => import('@/views/storage/print/TablePageDetailed'),
      name: 'print',
      meta: { title: 'print' }
    },
    {
      path: 'storage-entry',
      component: () => import('@/views/storage/storage-entry/storage-entry'),
      name: 'StorageEntry',
      meta: { title: 'storageEntry' }
    },
    {
      path: 'allot-requisition',
      component: () => import('@/views/storage/allot-requisition'),
      name: 'AllotRequisition',
      meta: { title: 'allotRequisition' }
    },
    {
      path: 'in-application',
      component: () => import('@/views/storage/in-application'),
      name: 'InApplication',
      meta: { title: 'inApplication' }
    }
  ]
}
export default storageRouter
