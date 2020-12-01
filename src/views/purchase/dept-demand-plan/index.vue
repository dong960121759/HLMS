// 科室需求计划汇总
<template>
  <div>
    <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
    <el-dialog
      title="新增需求材料"
      width="80%"
      center
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <SupplierSelection v-if="isOpenDetailed" ref="isOpenDetailed" :row-data="materialData" @closeCreateDialog="closeCreateDialog" />
    </el-dialog>
  </div>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchDemandPlanPaidList } from '@/api/purchase'
import SupplierSelection from './supplier-selection'
export default {
  components: {
    NewTablePage,
    SupplierSelection
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
          label: '',
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
          label: '生成订单计划',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          click: this.examinePass

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
          { prop: 'id', name: '材料编号', attrs: { width: 150, align: 'center' }},
          { prop: 'name', name: '材料名称', attrs: { align: 'center' }},
          { prop: 'string1', name: '型号规格', attrs: { align: 'center' }},
          { prop: 'string2', name: '计量单位', attrs: { width: 150, align: 'center' }},
          { prop: 'number2', name: '数量', type: 'InlineEdit', attrs: { align: 'center' }},
          { prop: 'whether', name: '本币单价', type: 'Enum', Enum: { name: 'whether' }, attrs: { width: 50, align: 'center' }},
          { prop: 'date', name: '本币税价合剂', type: 'Date', format: 'yyyy-MM-DD', attrs: { align: 'center' }},
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
      rowData: null,
      isOpenDetailed: false
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
      fetchDemandPlanPaidList(this.configPage.listQuery).then(response => {
        const items = response
        this.configTable.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.number //  will be used when user click the cancel botton
          return v
        })
        console.log(this.configTable.tableData)
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
          this.rowData = data
          this.isOpenDetailed = true
        } },
        { id: '1', label: '编辑', attrs: { display: "(1 === 1) ? 'none' : 'inline-block'", align: 'center', color: '#0055ff' }, click: data => {
          console.log('编辑')
        } }
      ] }
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
      this.rowData = checked
      this.isOpenDetailed = true
    }
  }
}
</script>
