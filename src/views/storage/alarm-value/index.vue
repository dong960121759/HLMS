<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
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
          { prop: 'materialId', name: '物资ID', attrs: { width: 200, align: 'center' }},
          { prop: 'materialName', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'totalNumber', name: '规格型号', attrs: { align: 'center' }},
          { prop: 'unlockedNumber', name: '上限', attrs: { align: 'center' }},
          { prop: 'lastInBound', name: '下限', type: 'Date', attrs: { align: 'center' }}
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
        isHasDelete: false,
        optionName: '新建警戒值'
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
        { id: '2', label: '删除', click: data => {
          this.$confirm('是否删除' + data.name, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
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
