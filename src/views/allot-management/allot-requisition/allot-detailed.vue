<template>
  <div class="app-container" style="padding-top: 0px;">
    <div class="filter-container" style="padding: 0px;">
      <el-form ref="ruleForm" :inline="true" :model="ruleForm" :rules="rules" size="mini" label-width="100px" class="demo-form-inline">
        <el-form-item label="入库类型：" prop="name">
          <el-select v-model="value" placeholder="入库类型" size="mini" @change="selectType(value)">
            <el-option
              v-for="item in options"
              :key="item.value"
              size="mini"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请单号：" prop="name">
          <el-input v-model="ruleForm.name" style="width: 150px" />
        </el-form-item>
        <el-form-item label="申请人：" prop="region">
          <el-input v-model="ruleForm.region" style="width: 100px" />
        </el-form-item>
        <el-form-item label="申请科室：" prop="date1">
          <el-input v-model="ruleForm.date1" style="width: 100px" />
        </el-form-item>

        <el-divider style="margin: 10px 0;" />
        <div class="filter-container" style="padding-top: 0px;">
          <el-input v-model="materialCode" size="mini" placeholder="输入物资代码" style="width: 300px; margin-right:20px; margin-bottom: 0px; " class="filter-item" @keyup.enter.native="handleFilter" />
          <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-bottom: 0px; " @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
          <el-button v-waves class="filter-item" size="mini" type="danger" icon="el-icon-delete" style="margin-bottom: 0px; " @click="deleteSelect">
            删除所选
          </el-button>
          <el-form-item style=" margin-left:200px;">
            <el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
        <div class="filter-container" style="padding-top: 0px;">
          <DataTable ref="table" :config="config" />

          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" aria-setsize="mini" @pagination="getList" />
        </div>
        <el-divider style="margin: 10px 0;" />
        <el-form-item label="备注：">
          <div class="filter-container" style="padding-top: 0px;">
            <el-input
              v-model="remarks"
              type="textarea"
              maxlength="100"
              show-word-limit
              size="medium"
              style="width: 600px;"
              :autosize="{ minRows: 2, maxRows: 5}"
              placeholder="请输入内容"
            />
          </div>
        </el-form-item>
      </el-form></div>
  </div>
</template>
<script>
import { fetchAccessStorageRequisition } from '@/api/article'
import DataTable from '@/components/MyComponents/DataTable'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'AllotDetailed',
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
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      config: {
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
        sort: '+id'
      },
      options: [{
        value: '0',
        label: '采购入库'
      }, {
        value: '1',
        label: '领用入库'
      }, {
        value: '2',
        label: '回收入库'
      }, {
        value: '3',
        label: '调拨入库'
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

    },
    handleFilter() {

    },
    deleteSelect() {
      this.$confirm('此操作将删除所选, 是否继续?', '提示', {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.config.tableData = []
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
