<template>
  <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
export default {
  components: {
    NewTablePage
  },
  data() {
    return {
      buttons: [
        {
          label: '新建',
          icon: '',
          type: '',
          click: this.create

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '申请单号', disabled: true },
          { prop: 'planData', label: '计划年月', is: 'dateMonth' }
        ],
        data: {
          id: '',
          planData: undefined
        },
        rowSize: 3,
        subimtname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '材料号', attrs: { width: 200, align: 'center' }},
          { prop: 'name', name: '材料名称', attrs: { align: 'center' }},
          { prop: 'standards', name: '规格', attrs: { align: 'center' }}
        ].concat(this.getAction()),
        tableData: [{ id: '11111', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '11111', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '11111', name: 'aaaaaa', standards: 'vsfafa' }

        ],
        hasCheckbox: true
      },
      configPage: {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        getList: this.getLists

      }

    }
  },
  methods: {
    getLists() {

    },
    create() {
      console.log('create')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log('查看')
        } },
        { id: '2', label: '删除', click: data => {
          console.log('删除')
        } },
        { id: '3', label: '警告', type: 'warning', click: data => {
          console.log('警告')
        } }
      ] }
    }
  }
}
</script>
