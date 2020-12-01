// 科室需求计划审核
<template>
  <div>
    <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
    <el-dialog
      :key="refreshval"
      title="需求计划详情"
      width="80%"
      top="3%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <DemandExamine v-if="isOpenDetailed" ref="isOpenDetailed" :row-data="rowData" />
    </el-dialog>
  </div>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchDemandExamineList } from '@/api/purchase'
import DemandExamine from './demand-examine'
export default {
  components: {
    NewTablePage,
    DemandExamine
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
        submitname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '需求计划号', attrs: { width: 150, align: 'center' }},
          { prop: 'string1', name: '请购部门', attrs: { align: 'center' }},
          { prop: 'name', name: '请购人员', attrs: { align: 'center' }},
          { prop: 'dateMonth', name: '计划年月', type: 'Date', format: 'yyyy-MM', attrs: { width: 150, align: 'center' }},
          { prop: 'enum1', name: '状态', attrs: { align: 'center' }},
          { prop: 'whether', name: '是否紧急', type: 'Enum', Enum: { name: 'whether' }, attrs: { width: 50, align: 'center' }},
          { prop: 'date', name: '需求日期', type: 'Date', format: 'yyyy-MM-DD', attrs: { align: 'center' }},
          { prop: 'string3', name: '备注', type: 'Popover', attrs: { align: 'center' }},
          { prop: 'string4', name: '审核意见', type: 'Popover', attrs: { align: 'center' }}

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
      refreshval: 0,
      rowData: null
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
    // 审核通过
    examinePass() {
      console.log('examinePass')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 120, align: 'center' }, value: [
        { id: '1', label: '查看详情', click: data => {
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
