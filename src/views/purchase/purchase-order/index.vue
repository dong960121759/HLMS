<template>
  <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchpurchaseOrderList } from '@/api/purchase'
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
          label: '确认收货',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          click: this.confirmReceipt

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '申请单号', disabled: true },
          { prop: 'planData', label: '单据日期', is: 'daterange' }

        ],
        data: {
          id: '',
          planData: undefined
        },
        rowSize: 3,
        submitname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '单据编号', attrs: { width: 150, align: 'center' }},
          { prop: 'string4', name: '订单计划号', attrs: { align: 'center' }},
          { prop: 'string1', name: '应收款单位', attrs: { align: 'center' }},
          { prop: 'string2', name: '合计金额', attrs: { width: 150, align: 'center' }},
          { prop: 'date', name: '单据时间', type: 'Date', format: 'yyyy-MM-DD', attrs: { align: 'center' }},
          { prop: 'name', name: '操作员', attrs: { align: 'center' }},
          { prop: 'enum1', name: '状态', attrs: { align: 'center' }},
          { prop: 'string3', name: '备注', type: 'Popover', attrs: { align: 'center' }}

        ].concat(this.getAction()),
        tableData: [],
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log('getList')
      if (this.configForm.data !== null) {
        this.configPage.listQuery.query = this.configForm.data
      }
      console.log(this.configPage.listQuery.query)
      fetchpurchaseOrderList(this.configPage.listQuery).then(response => {
        console.log(response)
        this.configTable.tableData = response
      })
    },
    confirmReceipt() {
      console.log('confirmReceipt')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log('查看')
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
