// 科室需求计划审核
<template>
  <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchPaidList } from '@/api/finance'
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
          label: '驳回申请',
          icon: 'el-icon-check',
          type: 'danger',
          plain: true,
          click: this.reject

        },
        {
          label: '查询',
          icon: 'el-icon-search',
          type: 'warning',
          plain: true,
          click: this.getList

        },
        {
          label: '审核通过',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          click: this.examinePass

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '需求计划号' },
          { prop: 'string1', label: '请购部门' },
          { prop: 'string2', label: '请购人员' },
          { prop: 'date', label: '计划年月', is: 'dateMonth' },
          { prop: 'whetherboolen', label: '是否紧急', is: 'checkbox' }
        ],
        data: {
          id: '',
          string1: '',
          string2: '',
          date: undefined,
          whetherboolen: false
        },
        rowSize: 3,
        subimtname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '票据编号', attrs: { width: 150, align: 'center' }},
          { prop: 'id2', name: '订单计划号', attrs: { width: 150, align: 'center' }},
          { prop: 'string1', name: '收款单位', attrs: { align: 'center' }},
          { prop: 'number1', name: '合计金额', type: 'Currency', attrs: { align: 'center' }},
          { prop: 'dateTime', name: '单据时间', type: 'Date', attrs: { width: 150, align: 'center' }},
          { prop: 'name', name: '付款人', attrs: { align: 'center' }},
          { prop: 'string2', name: '付款方式', attrs: { align: 'center' }},
          { prop: 'enum1', name: '付款状态', attrs: { align: 'center' }},
          { prop: 'string3', name: '备注', attrs: { align: 'center' }}

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
    getList() {
      console.log('getList')
      if (this.configForm.data !== null) {
        this.configPage.listQuery.query = this.configForm.data
      }
      console.log(this.configPage.listQuery.query)
      fetchPaidList(this.configPage.listQuery).then(response => {
        console.log(response)
        this.configTable.tableData = response
      })
    },
    // 刷新
    refresh() {
      this.reload() // 局部刷新
    },
    // 驳回
    reject() {
      console.log('reject')
    },
    // 审核通过
    examinePass() {
      console.log('examinePass')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
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
