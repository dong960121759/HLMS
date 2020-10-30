<template>
  <div class="app-container">
    <div class="filter-container" style="padding: 0px;">
      <div class="filter-container" style="padding-top: 0px;">
        <el-row :gutter="20">
          <el-col :span="6"> <el-input v-model="materialCode" size="mini" placeholder="输入物资代码" style="width: 300px; margin-right:20px; margin-bottom: 0px; " class="filter-item" @keyup.enter.native="handleFilter" /></el-col>
          <el-col :span="6"><el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-bottom: 0px; " @click="handleFilter">
            {{ $t('table.search') }}
          </el-button></el-col>
          <el-col :span="6"><el-button v-waves class="filter-item" size="mini" type="danger" icon="el-icon-delete" style="margin-bottom: 0px; " @click="deleteSelect">
            删除所选
          </el-button></el-col>
          <el-col :span="36"><div class="grid-content bg-purple" /></el-col>
        </el-row>
        <el-divider style="margin: 10px 0;" />
      </div>
      <div class="filter-container" style="padding-top: 0px;">
        <DataTable ref="table" :config="config" @tableDbEdit="tableDbEdit" />

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" aria-setsize="mini" @pagination="getList" />
      </div>
    </div>
  </div>
</template>
<script>
import { fetchAccessStorageRequisition } from '@/api/article'
import DataTable from '@/components/MyComponents/DataTable'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AccessStorageLog',
  components: { DataTable, Pagination },
  directives: { waves },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      config: {
        headers: [
          { prop: 'id', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '物资代码', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'author', name: '规格', attrs: { align: 'center' }},
          { prop: 'title', name: '实际数量', type: 'Popover', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: true
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        type: undefined,
        sort: '+id'
      },
      options: [{
        value: '选项1',
        label: '采购入库'
      }, {
        value: '选项2',
        label: '领用入库'
      }, {
        value: '选项3',
        label: '回收入库'
      }],
      value: '',
      inStorage: [],
      materialCode: '',
      remarks: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectType(value) {
      this.$alert('这是一段内容:' + value, '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    handleFilter() {

    },
    deleteSelect() {
      this.$confirm('此操作将删除所选, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.$refs.table.getChecked())
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
    },
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
    tableDbEdit(e) {
      console.log('aaaaaaaaaaaaaaaaaaaa')
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { label: '查看', click: data => {
          console.log(data)
          this.isOpenDetailed = true
        }
        },
        { label: '删除', click: data => {
          this.$confirm('此操作将删除所选, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(this.$refs.table.getChecked())
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
    }
  }
}
</script>
<style lang="scss">
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
}
.pagination-container {
    margin-top: 0px;
}
.el-select {
    display: inline-block;
    position: relative;
    width: 120px;
}
.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    margin-left: 10px;
}
.pagination-container[data-v-72233bcd] {
    background: #fff;
    padding: 32px 32px 0px 16px;
}
</style>
