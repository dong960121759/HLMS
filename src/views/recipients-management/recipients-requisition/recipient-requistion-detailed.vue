<template>
  <div class="filter-container" style="padding-top: 0px;">
    <EditForm1 ref="form" :config="config" @submit="getList" />
    <DataTable ref="table" :config="configTable" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" aria-setsize="mini" @pagination="getList" />
  </div>
</template>

<script>
import { fetchAccessStorageRequisition } from '@/api/article'
import EditForm1 from '@/components/MyComponents/EditForm/EditForm'
import DataTable from '@/components/MyComponents/DataTable.vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const statusLlist = [
  { label: '未提交', value: '0' },
  { label: '待审批', value: '1' },
  { label: '已通过', value: '2', disabled: true }
]

export default {
  components: {
    EditForm1,
    DataTable,
    Pagination
  },
  props: {
    oid: {
      type: String,
      default: () => {
        return null
      } }
  },
  data() {
    return {
      config: {
        columns: [
          { prop: 'oid', label: '领用申请单号', is: 'auto', fetchSuggestions: this.querySearch, disabled: true },
          { prop: 'certificateId', label: '仓库', rules: [{ required: true, message: '请输入统一信用代码' }] },
          { prop: 'name', label: '申请人', rules: [{ required: true, message: '请输入仓库' }] },
          { prop: 'status', label: '状态', is: 'select', list: statusLlist, callback: r => this.statusChange(r) },
          { prop: 'date', label: '日期', is: 'date' }
        ],
        data: {
          oid: '11100112',
          certificateId: '222',
          name: '东',
          status: '0'
        },
        rowSize: 3 // 一行可以展示几列表单，默认为3列
      },
      configTable: {
        headers: [
          { prop: 'id', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '物资代码', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'author', name: '规格', attrs: { align: 'center' }},
          { prop: 'title', name: '实际数量', type: 'Popover', attrs: { align: 'center' }}
        ],
        tableData: [],
        hasCheckbox: true
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchAccessStorageRequisition(this.listQuery).then(response => {
        this.configTable.tableData = response.data.items
        console.log(response.data.items)
        this.total = response.data.total
        this.loading = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    querySearch(q, cb) {
      if (!q) { cb([]); return }
    },
    statusChange(r) {
      console.log(r)
    }
  }
}
</script>
