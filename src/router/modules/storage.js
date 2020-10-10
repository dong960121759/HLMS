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
      path: 'requisition-management',
      component: () => import('@/views/storage/requisition-management'),
      name: 'RequisitionManagement',
      meta: { title: 'requisitionManagement' }
    },
    {
      path: 'allot-requisition',
      component: () => import('@/views/storage/allot-requisition'),
      name: 'AllotRequisition',
      meta: { title: 'allotRequisition' }
    },
    {
      path: 'warehouse-inout-application',
      component: () => import('@/views/storage/warehouse-inout-application'),
      name: 'WarehouseInOut',
      meta: { title: 'warehouseInOut' }
    },
    {
      path: 'stocktake-no-id',
      component: () => import('@/views/storage/requisition-management'),
      name: 'StocktakeNoID',
      meta: { title: 'stocktakeNoID' }
    },
    {
      path: 'stocktake-is-id',
      component: () => import('@/views/storage/requisition-management'),
      name: 'StocktakeIsID',
      meta: { title: 'stocktakeIsID' }
    }
  ]
}
export default storageRouter
