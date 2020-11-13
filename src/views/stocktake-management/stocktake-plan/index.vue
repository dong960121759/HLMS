<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
    <el-dialog
      title="新建盘点"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenCreate"
    >
      <CreateWarehouse v-if="isOpenCreate" ref="isOpenCreate" />
    </el-dialog>
    <el-dialog
      title="盘点详情"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <WarehouseDetailed v-if="isOpenDetailed" ref="isOpenDetailed" :row-data="rowData" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchWarehouseList, deleteWarehouseList } from '@/api/storage'
import TablePage from '@/components/MyComponents/TablePage'

export default {
  name: '',
  components: { TablePage },
  data() {
    return {
      config: {
        headers: [
          { prop: 'id', name: '盘点计划号', attrs: { width: 200, align: 'center' }},
          { prop: 'name', name: '盘点时间', attrs: { align: 'center' }},
          { prop: 'admins', name: '申请人', type: 'PopoverList', attrs: { align: 'center' }},
          { prop: 'authorities', name: '申请时间', type: 'Popover', attrs: { align: 'center' }}
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
        isLog: true,
        isHasDate: false,
        isHasDelete: true,
        optionName: '新建盘点计划'
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
      fetchWarehouseList(listQuery).then(response => {
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
