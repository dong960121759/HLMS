/** 字典管理 When your routing purchase is too long, you can split it into small modules **/

import Layout from '@/layout'

const dictionariesRouter = {
  path: '/dictionaries',
  component: Layout,
  redirect: '/dictionaries/dn-material',
  name: 'Dictionaries',
  meta: {
    title: 'Dictionaries',
    icon: 'el-icon-s-claim',
    roles: ['admin']
  },
  children: [
    {
      path: 'dn-material',
      component: () => import('@/views/dictionaries/dn-material'),
      name: 'DnMaterial',
      meta: { title: 'dnMaterial' }
    },
    {
      path: 'dn-supplier',
      component: () => import('@/views/dictionaries/dn-supplier'),
      name: 'DnSupplier',
      meta: { title: 'dnSupplier' }
    }
  ]
}
export default dictionariesRouter
