<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 300px; margin-right:20px; margin-bottom: 0px; " class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom: 0px; " @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <DataTable ref="table" :config="config" @tableDbEdit="tableDbEdit" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog
      title="出入库申请单详情"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isAccessDetailed"
    >
      <access-detailed v-if="isAccessDetailed" ref="accessDetailed" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchStorageEntry } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DataTable from '../../../components/MyComponents/DataTable.vue'
import AccessDetailed from './storage-entry-detailed.vue'
export default {
  name: 'StorageEntry',
  components: { Pagination, DataTable, AccessDetailed },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      config: {
        headers: [
          { prop: 'materialId', name: '物资ID', attrs: { width: 200, align: 'center' }},
          { prop: 'materialName', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'totalNumber', name: '库存数量', attrs: { align: 'center' }},
          { prop: 'unlockedNumber', name: '未锁定库存', attrs: { align: 'center' }},
          { prop: 'lastInBound', name: '最近一次入库时间', type: 'Date', attrs: { align: 'center' }},
          { prop: 'lastOutBound', name: '最近一次出库时间', type: 'Date', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: true
      },

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        warehouseId: 24124124,
        inventoryId: 34148724
      },
      loading: false,
      multipleSelection: [],
      switchRoles: 'in',
      dateValue1: '',
      isAccessDetailed: false,
      isInStorage: false
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchStorageEntry(this.listQuery).then(response => {
        this.config.tableData = response.data.items
        console.log(this.config.tableData)
        this.total = response.data.total
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleUpdate(row) {
    },
    handleDownload() {
      this.isInStorage = true
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    selectdate() {
      console.log('This is ....')
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { label: '查看', click: data => {
          console.log(data)
          this.isAccessDetailed = true
        } }
      ] }
    },
    tableDbEdit(e) {
      console.log('aaaaaaaaaaaaaaaaaaaa')
      this.isAccessDetailed = true
    }
  }
}
</script>
<style>

.filter-item1{
  display: inline-block;
  margin-bottom: 10px;
  margin-right:20px;
}

</style>
