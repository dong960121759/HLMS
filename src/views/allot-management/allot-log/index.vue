<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
    <el-dialog
      title="调拨详情"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <AllotDetailed v-if="isOpenDetailed" ref="isOpenDetailed" :row-data="rowData" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchAllotRequisition, deleteWarehouseList } from '@/api/storage'
import TablePage from '@/components/MyComponents/TablePage'
// import CreateWarehouse from './create-allot'
import AllotDetailed from './allot-log-detailed'
export default {
  name: '',
  components: { TablePage, AllotDetailed },
  data() {
    return {
      config: {
        headers: [
          { prop: 'id', name: '调拨申请单号', attrs: { width: 200, align: 'center' }},
          { prop: 'state', name: '状态', type: 'Enum', Enum: { name: 'allot' }, attrs: { width: 100, align: 'center' }},
          { prop: 'warehouseOut', name: '调出仓库', attrs: { align: 'center' }},
          { prop: 'warehouseIn', name: '调入仓库', attrs: { align: 'center' }},
          { prop: 'applicant', name: '申请人', attrs: { align: 'center' }},
          { prop: 'applicantTime', name: '申请时间', attrs: { align: 'center' }}
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
        isHasDate: true,
        isHasDelete: true,
        optionName: '新建调拨申请'
      },
      isOpenDetailed: false,
      isOpenCreate: false,
      rowData: null,
      currentRow: null
    }
  },
  created() {
  },

  methods: {
    getListFat(listQuery) {
      fetchAllotRequisition(listQuery).then(response => {
        this.config.tableData = response
      })
    },
    handleDownload() {
      console.log('1111111')
      this.isOpenCreate = true
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          this.isOpenDetailed = true
          this.rowData = data
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
