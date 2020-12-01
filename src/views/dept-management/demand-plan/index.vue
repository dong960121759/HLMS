// 科室需求计划
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
      <DemandDetailed v-if="isOpenDetailed" ref="isOpenDetailed" :row-data="rowData" />
    </el-dialog>
  </div>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchDeptDemandPlanList } from '@/api/dept'
import DemandDetailed from './demand-plan-detailed'
export default {
  components: {
    NewTablePage,
    DemandDetailed
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
          label: '新增',
          icon: 'el-icon-plus',
          type: '',
          plain: true,
          click: this.create

        },
        {
          label: '查询',
          icon: 'el-icon-search',
          type: 'warning',
          plain: true,
          click: this.getList

        },
        {
          label: '删除',
          icon: 'el-icon-close',
          type: 'danger',
          plain: true,
          click: this.delete

        },
        {
          label: '保存',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          disabled: false,
          click: this.save

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '需求计划号' },
          { prop: 'dept', label: '请购部门' },
          { prop: 'name', label: '请购人员' },
          { prop: 'payDate', label: '计划年月', is: 'dateMonth' },
          { prop: 'date', label: '日期', is: 'date' }

        ],
        data: {
          id: '',
          dept: '',
          name: '',
          payDate: undefined,
          date: undefined
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
          { prop: 'whether', name: '是否紧急', type: 'Enum', Enum: { name: 'whether' }, attrs: { align: 'center' }},
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
      console.log(this.configPage.listQuery.query)
      fetchDeptDemandPlanList(this.configPage.listQuery).then(response => {
        console.log(response)
        this.configTable.tableData = response
      })
    },
    // 刷新
    refresh() {
      this.reload() // 局部刷新
    },
    // 新增
    create() {
      console.log('create')
      this.rowData = null
      this.isOpenDetailed = true
    },
    delete() {
      console.log('delete')
    },
    // 保存
    save() {
      console.log('save')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 150, align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
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
