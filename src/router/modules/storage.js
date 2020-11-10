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
      path: 'storage-entry',
      component: () => import('@/views/storage/storage-entry/storage-entry'),
      name: 'StorageEntry',
      meta: { title: 'storageEntry' }
    },
    {
      path: 'in-application',
      component: () => import('@/views/storage/in-application'),
      name: 'InApplication',
      meta: { title: 'inApplication' }
    },
    {
      path: 'alarm-value',
      component: () => import('@/views/storage/alarm-value'),
      name: 'AlarmValue',
      meta: { title: 'alarmValue' }
    },
    {
      path: 'print',
      component: () => import('@/views/storage/print/TablePageDetailed'),
      name: 'Print',
      meta: { title: 'print' }
    }
  ]
}
export default storageRouter
