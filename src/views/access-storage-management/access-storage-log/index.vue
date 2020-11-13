<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
    <el-dialog
      title="出入库申请单详情"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <access-detailed v-if="isOpenDetailed" ref="accessDetailed" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchAccessRequisition, deleteWarehouseList } from '@/api/storage'
import TablePage from '@/components/MyComponents/TablePage'
import AccessDetailed from './access-log-detailed.vue'
export default {
  name: '',
  components: { TablePage, AccessDetailed },
  data() {
    return {
      config: {
        headers: [
          { prop: 'id', name: '申请单号', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '出入库类型', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'timestamp', name: '申请时间', type: 'Date', attrs: { align: 'center' }},
          { prop: 'author', name: '申请人', attrs: { align: 'center' }},
          { prop: 'title', name: '申请科室', type: 'Popover', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: false
      },
      pageConfig: {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        dateValue1: '',
        isOpenCreate: false,
        isLog: false,
        isHasDate: false,
        isHasDelete: true,
        optionName: '新建入库申请单'
      },
      isOpenDetailed: false,
      isOpenCreate: false,
      warehouseId: '',
      currentRow: null
    }
  },
  created() {
  },

  methods: {
    getListFat(listQuery) {
      fetchAccessRequisition(listQuery).then(response => {
        response.forEach((item, i) => {
          item.authorities = item.authorities.join(',  ')
        })
        this.config.tableData = response
      })
    },
    handleDownload() {
      this.isOpenCreate = true
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          this.isOpenDetailed = true
          this.warehouseId = data.id
          console.log(this.pageConfig.isOpenDetailed)
        } }
      ] }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    deleteSelect(e) {
      console.log(e[0].id)
      deleteWarehouseList(e[0].id).then(response => {
        this.getListFat(this.listQuery)
      })
    }
  }
}
</script>
<style>
 @import "../../../styles/tablebtn.scss";
.filter-item1{
  display: inline-block;
  margin-bottom: 10px;
  margin-right:20px;
}

</style>
