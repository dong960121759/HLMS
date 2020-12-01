//生成订单计划
<template>
  <div>
    <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
    <el-dialog
      title="新增需求材料"
      width="80%"
      center
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="isOpenMaterialDetailed"
    >
      <CreateDemand v-if="isOpenMaterialDetailed" ref="isOpenMaterialDetailed" :row-data="materialData" @closeCreateDialog="closeCreateDialog" />
    </el-dialog>
  </div>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
import CreateDemand from './create-demand'
import { fetchDeptDemandPlanList } from '@/api/dept'

export default {
  components: {
    NewTablePage,
    CreateDemand
  },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
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
          label: '删除',
          icon: 'el-icon-close',
          type: 'danger',
          plain: true,
          click: this.delete

        }
      ],
      configForm: {
        columns: [
          { prop: 'id', label: '订单计划号' },
          { prop: 'string1', label: '请购部门', oninput: "value=value.replace(/[^\d]/g,'')" },
          { prop: 'name', label: '请购人员' },
          { prop: 'dateMonth', label: '计划年月', is: 'dateMonth' },
          { prop: 'date', label: '日期', is: 'date' },
          { prop: 'type', label: '采购类型' }

        ],
        data: {
          id: '',
          string1: '',
          name: '',
          dateMonth: undefined,
          date: undefined,
          type: ''
        },
        rowSize: 3,
        submitname: '',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '材料编号', attrs: { width: 150, align: 'center' }},
          { prop: 'string1', name: '材料名称', attrs: { align: 'center' }},
          { prop: 'name', name: '型号规格', attrs: { align: 'center' }},
          { prop: 'dateMonth', name: '计价单位', attrs: { align: 'center' }},
          { prop: 'enum1', name: '数量', attrs: { align: 'center' }},
          { prop: 'number1', name: '本币单价', type: 'Enum', Enum: { name: 'whether' }, attrs: { align: 'center' }},
          { prop: 'date', name: '需求日期', type: 'Date', format: 'yyyy-MM-DD', attrs: { align: 'center' }},
          { prop: 'whether', name: '是否紧急', type: 'Enum', Enum: { name: 'whether' }, attrs: { align: 'center' }},
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

      },
      isOpenMaterialDetailed: false,
      materialData: null

    }
  },
  created() {
    if (this.rowData !== null) {
      this.configForm.data = JSON.parse(JSON.stringify(this.rowData))
      this.getList()
    }
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
      // 使用:key改变重新加载dialog实现刷新
      this.$parent.$parent.refreshval += 1
    },
    create() {
      console.log('create')
      this.materialData = null
      this.isOpenMaterialDetailed = true
    },
    // 删除
    delete() {
      console.log('delete')
      if (this.$children[0].$refs.table.getChecked().length === 0) {
        this.$message({
          message: '请选择要删除的内容',
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将删除所选, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.$children[0].$refs.table.getChecked())
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 提交
    submit() {
      console.log('submit')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 150, align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log('查看')
          this.isOpenMaterialDetailed = true
          this.materialData = data
        } }
      ] }
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
      this.isOpenMaterialDetailed = true
      this.materialData = checked
    },
    closeCreateDialog(val) {
      this.isOpenMaterialDetailed = val
    }
  }
}
</script>
