<template>
  <div class="app-container" style="padding-top: 0px;">
    <EditForm ref="form" :config="config" @submit="getList" />
    <div class="filter-container" style="padding-top: 0px;">
      <DataTable ref="table" :config="tableConfig" />

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" aria-setsize="mini" @pagination="getMaterialsList" />
    </div>
  </div>
</template>
<script>
import EditForm from '@/components/MyComponents/EditForm/EditForm'
import DataTable from '@/components/MyComponents/DataTable'
import Pagination from '@/components/Pagination'

export default {
  name: 'AllotDetailed',
  components: { EditForm, DataTable, Pagination },
  props: {

  },
  data() {
    return {
      config: {
        columns: [
          // { prop: 'id', label: '调拨单号', is: 'auto', fetchSuggestions: this.querySearch, disabled: true },
          { prop: 'warehouseOut', label: '申请科室', rules: [{ required: true, message: '调出仓库不能为空' }] },
          { prop: 'warehouseIn', label: '仓库', rules: [{ required: true, message: '调入仓库不能为空' }] },
          { prop: 'applicant', label: '申请人' }
        ],
        data: {
          id: undefined,
          warehouseOut: undefined,
          warehouseIn: undefined,
          applicant: undefined,
          applicantTime: undefined,
          state: undefined
        },
        rowSize: 3, // 一行可以展示几列表单，默认为3列
        submitname: '提交',
        footer: false
      },
      tableConfig: {
        headers: [
          { prop: 'id', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '物资代码', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'author', name: '规格', attrs: { align: 'center' }},
          { prop: 'title', name: '调拨数量', type: 'Popover', attrs: { align: 'center' }}
        ],
        tableData: [],
        hasCheckbox: true
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
  },
  methods: {
    getList(res) {
      console.log(res)
    },
    statusChange(r) {
      console.log(r)
    },
    getMaterialsList() {
      console.log('news')
    }
  }
}
</script>
<style lang="scss">

</style>
