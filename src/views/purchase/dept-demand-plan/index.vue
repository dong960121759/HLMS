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
      <SupplierSelection v-if="isOpenDetailed" ref="isOpenDetailed" :row-data="rowData" @closeCreateDialog="closeCreateDialog" />
    </el-dialog>
    <el-dialog
      :key="refreshval"
      title="生成订单计划"
      width="90%"
      center
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="isCreateOrderPlan"
    >
      <CreateOrderPlan v-if="isCreateOrderPlan" ref="isCreateOrderPlan" :select-materials="selectMaterials" />
    </el-dialog>
  </div>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import { fetchDemandPlanPaidList } from '@/api/purchase'
import SupplierSelection from './supplier-selection'
import CreateOrderPlan from './create-order-plan'
export default {
  components: {
    NewTablePage,
    SupplierSelection,
    CreateOrderPlan
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
          label: '生成订单计划',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          click: this.createOrderPlan

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
          { prop: 'number2', name: '数量', attrs: { width: 200, align: 'center' }},
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
      isOpenDetailed: false,
      isCreateOrderPlan: false,
      refreshval: 0,
      selectMaterials: []
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
        // const items = response
        // this.configTable.tableData = items.map(v => {
        //   this.$set(v, 'isnumber2', false) // https://vuejs.org/v2/guide/reactivity.html
        //   v.originalVal = v.number2 //  will be used when user click the cancel botton
        //   return v
        // })
        this.configTable.tableData = response
      })
    },
    // 刷新
    refresh() {
      this.reload() // 局部刷新
    },

    // 生成订单计划
    createOrderPlan() {
      console.log('createOrderPlan')
      console.log(this)
      this.selectMaterials = this.$children[0].$children[2].getChecked()
      this.isCreateOrderPlan = true
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 150, align: 'center' }, value: [
        { label: '查看', attrs: { title: '查看详情' }, click: data => {
          console.log('查看')
          this.rowData = data
          this.isOpenDetailed = true
        } }
        // { label: '编辑', attrs: { title: '编辑数量', type: 'primary' }, click: data => {
        //   data.isnumber2 = true
        // } }
      ] }
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
      this.rowData = checked
      this.isOpenDetailed = true
    },
    closeCreateDialog(val) {
      this.isOpenMaterialDetailed = val
    }
  }
}
</script>
