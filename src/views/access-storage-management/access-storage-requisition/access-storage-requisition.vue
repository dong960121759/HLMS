<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 300px; margin-right:20px; " class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="dateValue1"
        type="daterange"
        style="margin-right:20px; "
        unlink-panels
        class="filter-item"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :change="selectdate"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleDownload">
        新建调拨申请
      </el-button>
    </div>
    <DataTable ref="table" :config="config" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <AccessDetailed v-if="isAccessDetailed" />
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DataTable from '../../../components/MyComponents/DataTable.vue'
import AccessDetailed from './access-detailed.vue'
export default {
  name: 'Child2',
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
          { prop: 'id', name: '申请单号', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '出入库类型', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'timestamp', name: '申请时间', type: 'Date', attrs: { align: 'center' }},
          { prop: 'author', name: '申请人', attrs: { align: 'center' }},
          { prop: 'title', name: '申请科室', type: 'Popover', attrs: { align: 'center' }}
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
        limit: 10,
        type: undefined,
        sort: '+id'
      },
      loading: false,
      multipleSelection: [],
      switchRoles: 'in',
      dateValue1: '',
      isAccessDetailed: true
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.config.tableData = response.data.items
        console.log('response.data.items')
        this.total = response.data.total
        this.loading = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
      console.log('This is ....' + this.dateValue1)
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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
        } }
      ] }
    }
  }
}
</script>
<style>
.action span{margin-right:10px;color:#359C67;cursor: pointer;}
.action {text-align: center;}
</style>
