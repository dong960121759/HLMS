<template>
  <div class="app-container bar-btn" style="padding-top: 5px;">
    <div class="bar-container">
      <BarBtn :buttons="buttons" />
    </div>
    <el-divider />
    <div class="bar-container">
      <EditForm ref="form" :config="config" />
    </div>
    <el-divider />
    <DataTable ref="table" :config="configTable" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" aria-setsize="mini" @pagination="getList" />
  </div>
</template>
<script>
import EditForm from '@/components/MyComponents/EditForm/EditForm'
import BarBtn from '@/components/MyComponents/BarBtn'
import DataTable from '@/components/MyComponents/DataTable'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: { EditForm, BarBtn, Pagination, DataTable },
  data() {
    return {
      buttons: [
        {
          label: '新建',
          icon: 'el-icon-circle-plus-outline',
          type: '',
          click: this.create

        },
        {
          label: '历史计划',
          icon: 'el-icon-tickets',
          type: '',
          click: this.create

        },
        {
          label: '提交申请',
          icon: 'el-icon-folder-checked',
          type: '',
          click: this.create

        },
        {
          label: '删除',
          icon: 'el-icon-folder-checked',
          type: 'danger',
          click: this.create

        }
      ],
      config: {
        columns: [
          { prop: 'id', label: '需求申请单号', is: 'auto', fetchSuggestions: this.querySearch, disabled: true },
          { prop: 'warehouseOut', label: '申请科室', rules: [{ required: true, message: '调出仓库不能为空' }] },
          { prop: 'warehouseIn', label: '仓库', rules: [{ required: true, message: '调入仓库不能为空' }] },
          { prop: 'planData', label: '计划年月', is: 'dateMonth' },
          { prop: 'applicant', label: '申请人' }
        ],
        data: {
          id: undefined,
          warehouseOut: undefined,
          warehouseIn: undefined,
          applicant: undefined,
          applicantTime: undefined,
          state: undefined,
          planData: undefined
        },
        rowSize: 3, // 一行可以展示几列表单，默认为3列
        submitname: '提交',
        footer: false
      },
      configTable: {
        headers: [
          { prop: 'id', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '物资代码', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'author', name: '规格', attrs: { align: 'center' }},
          { prop: 'title', name: '实际数量', type: 'Popover', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: true,
        hasIndex: false,
        tableDbEdit: this.tableDbEdit
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        type: undefined,
        oid: this.oid,
        sort: '+id'
      }

    }
  },
  methods: {
    create() {
      console.log(this.config.data)
    },
    getList() {

    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log(data)
          this.isOpenDetailed = true
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
<style lang="scss">
.bar-btn{
   .el-divider--horizontal {
    display: block;
    height: 2px;
    width: 100%;
    margin: 5px 0;
   }
}
</style>
