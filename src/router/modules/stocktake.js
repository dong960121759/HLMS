/** When your routing stocktake-management is too long, you can split it into small modules **/

import Layout from '@/layout'

const stocktakeRouter = {
  path: '/stocktake-management',
  component: Layout,
  redirect: '/stocktake-management/stocktake-plan',
  name: 'StocktakeManagement',
  meta: {
    title: 'StocktakeManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'stocktake-plan',
      component: () => import('@/views/stocktake-management/stocktake-plan'),
      name: 'StocktakePlan',
      meta: { title: 'stocktakePlan' }
    },
    {
      path: 'stocktake-log',
      component: () => import('@/views/stocktake-management/stocktake-log'),
      name: 'StocktakeLog',
      meta: { title: 'stocktakeLog' }
    }
  ]
}
export default stocktakeRouter
