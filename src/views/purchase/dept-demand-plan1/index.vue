<template>
  <el-tabs v-model="tabsName" type="border-card">
    <el-tab-pane name="demand">
      <span slot="label"><i class="el-icon-date" /> 需求计划</span>
      <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
    </el-tab-pane>
    <el-tab-pane name="summary">
      <span slot="label"><i class="el-icon-document-copy" /> 汇总结果</span>
      汇总结果
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchDemandExamineList } from '@/api/purchase'
export default {
  components: {
    NewTablePage
  },
  data() {
    return {
      tabsName: 'demand',
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
          label: '汇总',
          icon: 'el-icon-files',
          type: 'success',
          plain: true,
          click: this.summary

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '材料编号' },
          { prop: 'string1', label: '材料名称' },
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
        rowSize: 2,
        submitname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '需求计划号', attrs: { width: 150, align: 'center' }},
          { prop: 'name', name: '申请部门', attrs: { align: 'center' }},
          { prop: 'string1', name: '申请人', attrs: { align: 'center' }},
          { prop: 'date', name: '申请时间', attrs: { width: 150, align: 'center' }}

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

      },
      isOpenDetailed: false,
      isSummary: false,
      summaryData: null
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
      fetchDemandExamineList(this.configPage.listQuery).then(response => {
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
    // 汇总
    summary() {
      console.log('summary')
      this.tabsName = 'summary'
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 120, align: 'center' }, value: [
        { label: '查看详情', click: data => {
          console.log('查看')
          this.isOpenDetailed = true
          this.rowData = data
        } }
      ] }
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
      this.isOpenDetailed = true
      this.rowData = checked
    }
  }
}
</script>
