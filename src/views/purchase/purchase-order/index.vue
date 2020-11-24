<template>
  <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
export default {
  components: {
    NewTablePage
  },
  inject: ['reload'], // 注入
  data() {
    return {
      buttons: [
        {
          label: '刷新',
          icon: 'el-icon-refresh',
          type: '',
          plain: true,
          click: this.refresh
        },
        {
          label: '查询',
          icon: 'el-icon-search',
          type: 'warning',
          plain: true,
          click: this.getList

        },
        {
          label: '提交',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          click: this.getAction

        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          plain: true,
          click: this.getList

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '申请单号', disabled: true },
          { prop: 'planData', label: '计划年月', is: 'dateMonth' },
          { prop: 'planData', label: '计划年月', is: 'dateMonth' },
          { prop: 'planData', label: '计划年月', is: 'dateMonth' },
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
        tableData: [{ id: '1', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '2', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '3', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '4', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '5', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '6', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '7', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '8', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '9', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '10', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '11', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '12', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '13', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '14', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '15', name: 'aaaaaa', standards: 'vsfafa' },
          { id: '16', name: 'aaaaaa', standards: 'vsfafa' }

        ],
        hasCheckbox: true,
        hasIndex: false,
        tableDbEdit: this.tableDbEdit
      },
      configPage: {
        total: 16,
        listQuery: {
          page: 1,
          limit: 10
        },
        getList: this.getList

      }

    }
  },
  methods: {
    getList() {
      console.log('getList')
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
        } }
      ] }
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
    },
    refresh() {
      this.reload() // 局部刷新
    }
  }
}
</script>
