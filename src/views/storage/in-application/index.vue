<template>
  <div class="app-container" style="padding-top: 10px;">
    <div class="filter-container" style="padding: 0px;">
      <el-form ref="material" :inline="true" :model="material" :rules="rules" size="mini" label-width="100px" class="demo-form-inline">
        <div class="in-application">
          <el-form-item label="入库类型：" prop="inType">
            <el-select v-model="inType" placeholder="入库类型" size="mini" @change="selectType(inType)">
              <el-option
                v-for="item in options"
                :key="item.value"
                size="mini"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请人：" prop="name">
            <el-input v-model="material.name" style="width: 100px" />
          </el-form-item>
          <el-form-item label="申请科室：" prop="date1">
            <el-input v-model="material.date1" style="width: 100px" />
          </el-form-item>
          <el-form-item style="float: right; margin-right:100px">
            <el-button waves type="success" @click="submitForm('material')">提交</el-button>
            <el-button waves @click="resetForm('material')">重置</el-button>
          </el-form-item>
          <el-divider style="margin: 0 0 10px 0;" />
        </div>
        <div class="filter-container" style="padding-top: 0px;">
          <PurchaseIn v-if="inType === 'purchase'" :material="material" />
          <AllotIn v-if="inType === 'transferIn'" :material="material" />
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
import waves from '@/directive/waves' // waves directive
import PurchaseIn from './purchase-in'
import AllotIn from './allot-in'
export default {
  name: 'InApplication',
  components: { PurchaseIn, AllotIn },
  directives: { waves },
  data() {
    return {
      material: {
        name: '',
        region: '',
        date1: '',
        supplier: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '申请人不能为空', trigger: 'blur' }
        ]
      },

      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        type: undefined,
        sort: '+id'
      },
      options: [{
        value: 'purchase',
        label: '采购入库'
      }, {
        value: 'receiveIn',
        label: '领用入库'
      }, {
        value: 'recycle',
        label: '回收入库'
      }, {
        value: 'transferIn',
        label: '调拨入库'
      }],
      inType: '',
      materialCode: '',
      remarks: ''
    }
  },
  created() {
  },
  methods: {
    selectType(inType) {

    },
    handleFilter() {

    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.material)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$confirm('是否重置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].resetFields()
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.in-application{
  .el-form-item{
    margin-bottom: 10px;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 0 0 10px 0;
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
  .el-form-item__label {
    float: none;
    display: inline-block;
    line-height: 28px;
    text-align: right;
    vertical-align: middle;
    margin-top: 8px;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
}
</style>
