// 订单计划
<template>
  <NewTablePage :buttons="buttons" :config-table="configTable" :config-form="configForm" :config-page="configPage" />
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchOrderPlanList } from '@/api/purchase'

const statusLlist = [
  { label: '未提交', value: '0' },
  { label: '待审批', value: '1' },
  { label: '已通过', value: '2', disabled: true }
]
export default {
  components: {
    NewTablePage
  },
  inject: ['reload'],
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
          click: this.submit
        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '材料编号' },
          { prop: 'name', label: '材料名称' },
          { prop: 'state', label: '审核状态', is: 'select', list: statusLlist },
          { prop: 'date', label: '提交日期', is: 'daterange' },
          { prop: 'weh', label: '紧急', is: 'checkbox' }
        ],
        data: {
          id: '',
          name: '',
          state: null,
          date: undefined,
          weh: undefined
        },
        rowSize: 3,
        submitname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '订单计划号', attrs: { width: 120, align: 'center' }},
          { prop: 'id2', name: '材料号', attrs: { width: 120, align: 'center' }},
          { prop: 'string1', name: '材料名称', attrs: { align: 'center' }},
          { prop: 'number1', name: '应付金额', attrs: { align: 'center' }},
          { prop: 'string2', name: '供应商', attrs: { align: 'center' }},
          { prop: 'enum1', name: '状态', attrs: { align: 'center' }},
          { prop: 'date', name: '提交日期', type: 'Date', format: 'yyyy-MM-DD', attrs: { align: 'center' }},
          { prop: 'string3', name: '备注', type: 'Popover', attrs: { align: 'center' }}
        ].concat(this.getAction()),
        tableData: [],
        hasCheckbox: true,
        hasIndex: true,
        tableDbEdit: this.tableDbEdit
      },
      configPage: {
        total: 16,
        listQuery: {
          page: 1,
          limit: 10,
          query: null
        },
        getList: this.getList

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    refresh() {
      this.reload()
    },
    // 提交
    submit() {
      console.log('submit')
    },
    getList() {
      console.log('getList')
      if (this.configForm.data !== null) {
        this.configPage.listQuery.query = this.configForm.data
      }
      fetchOrderPlanList(this.configPage.listQuery).then(response => {
        console.log(response)
        this.configTable.tableData = response
      })
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 120, align: 'center' }, value: [
        { id: '1', label: '查看详情', click: data => {
          console.log('查看')
        } }
      ] }
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
    }
  }
}
</script>
