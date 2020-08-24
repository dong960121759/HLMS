<template>
  <div class="app-container">
    <DataTable :columns="columns" :table-data="tableData" :list-loading="listLoading" @add="add" @edit="edit">
      <template slot="id" slot-scope="scope">
        <a href="#">{{ scope.row.id }}</a>
      </template>
    </DataTable>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import DataTable from '../../components/MyComponents/table.vue'
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'List',
  components: { DataTable, Pagination },
  data() {
    return {
      columns: [
        { prop: 'id', title: '领用申请单号', slot: true },
        { prop: 'author', title: '领用人' },
        { prop: 'timestamp', title: '领用时间' },
        { action: true, title: '操作', actions: [{ fnName: 'add', title: '新增' }, { fnName: 'edit', title: '编辑' }] }
      ],
      tableData: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: undefined,
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
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        this.loading = false
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    add(e) {
      console.log('新增：' + e.name)
    },
    edit(e) {
      console.log('编辑：' + e.name)
    }
  }
}
</script>
