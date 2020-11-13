<template>
  <div class="">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-row :gutter="20">
        <el-col :span="4"> <el-input v-model="listQuery.oid" size="mini" :placeholder="elinputText" style=" margin-right:20px; margin-bottom: 0px; " class="filter-item" @keyup.enter.native="handleFilter" /></el-col>
        <el-col :span="8"> <el-date-picker
          v-if="isHasDate"
          v-model="listQuery.dateValue"
          type="daterange"
          unlink-panels
          size="mini"
          class="filter-item"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :change="selectdate"
        /></el-col>
        <el-col :span="2"><el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-bottom: 0px; " @click="handleFilter">
          {{ $t('table.search') }}
        </el-button></el-col>
        <el-col :span="2"><el-button v-if="pageConfig.isHasDelete" v-waves class="filter-item" size="mini" type="danger" icon="el-icon-delete" style="margin-bottom: 0px; " @click="deleteSelect">
          删除所选
        </el-button></el-col>
        <el-col :span="4" :offset="2" style="float: right;"> <el-button v-if="isLog" v-waves class="filter-item" size="mini" type="primary" icon="el-icon-plus" style="margin-bottom: 0px; margin-left:30px;" @click="handleDownload">
          {{ pageConfig.optionName }}
        </el-button></el-col>
      </el-row>
    </div>
    <DataTable ref="table" :config="config" @tableDbEdit="tableDbEdit" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DataTable from '../DataTable'

export default {
  name: 'TablePage',
  components: { Pagination, DataTable },
  directives: { waves },
  filters: {
  },
  props: {
    pageConfig: {
      type: Object,
      default: () => {
        return null
      }
    },
    config: {
      type: Object,
      default: () => {
        return null
      } }
  },
  data() {
    return {
      total: this.pageConfig.total,
      listQuery: this.pageConfig.listQuery,
      dateValue1: this.pageConfig.dateValue1,
      materialCode: '',
      isLog: this.pageConfig.isLog,
      isHasDate: this.pageConfig.isHasDate,
      currentRow: null
    }
  },
  computed: {
    elinputText() {
      console.log(this.config.headers)
      return '请输入' + this.config.headers[0].name
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$parent.getListFat(this.listQuery)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.$parent.handleDownload()
    },
    getActions() {
      this.$parent.getActions()
    },
    tableDbEdit(e) {
      this.$parent.isOpenDetailed = true
    },
    handleCurrentChange(val) {
      console.log('111111111111111111111')
      this.currentRow = val
      console.log(this.currentRow)
    },
    deleteSelect() {
      console.log(this.config.hasCheckbox)
      if (this.config.hasCheckbox) {
        if (this.$refs.table.getChecked().length === 0) {
          this.$message({
            message: '请选择要删除的内容',
            type: 'warning'
          })
        } else {
          this.$confirm('此操作将删除所选, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(this.$refs.table.getChecked())
            this.$parent.deleteSelect(this.$refs.table.getChecked())
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
        }
      } else {
        console.log(this.currentRow)
        if (this.currentRow === null) {
          this.$message({
            message: '请选择要删除的内容',
            type: 'warning'
          })
        } else {
          this.$confirm('此操作将删除所选, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$parent.deleteSelect(this.currentRow)
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
        }
      }
    },
    selectdate() {
      console.log('This is ....')
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
