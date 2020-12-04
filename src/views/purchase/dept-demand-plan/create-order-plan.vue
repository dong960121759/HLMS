//生成订单计划
<template>
  <div>
    <NewTablePage :buttons="buttons" :config-form="configForm" :config-table="configTable" :config-page="configPage" />
    <!-- <el-dialog
      title="新增需求材料"
      width="80%"
      center
      append-to-body
      :close-on-click-modal="false"
      :visible.sync="isOpenMaterialDetailed"
    >
      <CreateDemand v-if="isOpenMaterialDetailed" ref="isOpenMaterialDetailed" :row-data="materialData" @closeCreateDialog="closeCreateDialog" />
    </el-dialog> -->
  </div>
</template>
<script>
import NewTablePage from '@/components/MyComponents/NewTablePage'
const statusLlist = [
  { label: '供应商1', value: '0' },
  { label: '供应商2', value: '1' },
  { label: '供应商3', value: '2' }
]

export default {
  components: {
    NewTablePage
  },
  props: {
    selectMaterials: {
      type: Array,
      default: () => {
        return []
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
          label: '新增材料',
          icon: 'el-icon-plus',
          type: '',
          plain: true,
          click: this.addMaterial

        },
        {
          label: '确定订单计划',
          icon: 'el-icon-check',
          type: 'success',
          plain: true,
          click: this.fixOrderPlan

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
          { prop: 'enum1', label: '供应商', is: 'select', list: statusLlist }
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
          { prop: 'number2', name: '数量', type: 'InlineEdit', attrs: { width: 200, align: 'center' }},
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
    console.log(this.selectMaterials)
    if (this.selectMaterials.length > 0) {
      this.configTable.tableData = this.selectMaterials.map(v => {
        this.$set(v, 'isnumber2', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalVal = v.number2 //  will be used when user click the cancel botton
        return v
      })
      // this.getList()
    }
  },
  methods: {
    getList() {
      console.log('getList')
    },
    // 刷新
    refresh() {
      // 使用:key改变重新加载dialog实现刷新
      this.$parent.$parent.refreshval += 1
    },
    addMaterial() {
      console.log('addMaterial')
      this.materialData = null
      // this.isOpenMaterialDetailed = true
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
    // 确定订单计划
    fixOrderPlan() {
      console.log('fixOrderPlan')
    },
    getAction() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { width: 150, align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log('查看')
          this.isOpenMaterialDetailed = true
          this.materialData = data
        } },
        { label: '编辑', attrs: { title: '编辑数量', type: 'primary' }, click: data => {
          data.isnumber2 = true
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
