<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
    <el-dialog
      title="新建仓库"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenCreate"
    >
      <CreateWarehouse v-if="isOpenCreate" ref="isOpenCreate" />
    </el-dialog>
    <el-dialog
      title="仓库详情"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <WarehouseDetailed v-if="isOpenDetailed" ref="isOpenDetailed" :warehouse-id="warehouseId" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchWarehouseList, deleteWarehouseList } from '@/api/storage'
import TablePage from '@/components/MyComponents/TablePage'
import CreateWarehouse from './create-warehouse'
import WarehouseDetailed from './updata-warehouse'
export default {
  name: '',
  components: { TablePage, CreateWarehouse, WarehouseDetailed },
  data() {
    return {
      config: {
        headers: [
          { prop: 'id', name: '仓库Id', attrs: { width: 200, align: 'center' }},
          { prop: 'name', name: '仓库名称', attrs: { align: 'center' }},
          { prop: 'admins', name: '管理员', type: 'PopoverList', attrs: { align: 'center' }},
          { prop: 'authorities', name: '所需权限列表', type: 'Popover', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: false,
        hasIndex: false,
        tableDbEdit: this.tableDbEdit
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
        optionName: '新建仓库'
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
      fetchWarehouseList(listQuery).then(response => {
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
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
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
