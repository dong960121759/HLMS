<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 300px; margin-right:20px; margin-bottom: 0px; " class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom: 0px; " @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-select v-model="citys" multiple placeholder="出入库类型" style="margin-left:30px; width: 300px; " :change="selected(citys)">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" style="margin-bottom: 0px; margin-left:30px;" @click="handleDownload">
        申请入库
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
    <el-dialog
      title="入库申请单"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isInStorage"
    >
      <in-storage v-if="isInStorage" ref="inStorage" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchAccessStorageRequisition } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DataTable from '@/components/MyComponents/DataTable.vue'
import AccessDetailed from './access-detailed.vue'
import InStorage from './in-storage.vue'
export default {
  name: 'AccessStorageRequisition',
  components: { Pagination, DataTable, AccessDetailed, InStorage },
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
      isAccessDetailed: false,
      isInStorage: false,
      citys: [],
      cities: [
        { value: '0', label: '调拨入库' },
        { value: '1', label: '调拨出库' },
        { value: '2', label: '科室领用' }
      ]
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchAccessStorageRequisition(this.listQuery).then(response => {
        this.config.tableData = response.data.items
        console.log('response.data.items')
        this.total = response.data.total
        this.loading = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.isInStorage = true
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log(data)
          this.isAccessDetailed = true
        } }
      ] }
    },
    selected(citys) {
      console.log('This is ....' + citys)
    },
    tableDbEdit(e) {
      console.log('aaaaaaaaaaaaaaaaaaaa')
      this.isAccessDetailed = true
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
