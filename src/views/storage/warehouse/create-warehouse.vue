<template>
  <div class="app-container">
    <el-form ref="warehouseForm" :model="warehouseForm" size="mini" :label-position="'right'" label-width="30%" class="demo-dynamic">
      <el-form-item
        class="width-input"
        prop="name"
        label="仓库名称:"
        :rules="[
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ]"
      >
        <el-input v-model="warehouseForm.name" />
      </el-form-item>

      <el-form-item
        class="width-input"
        prop="description"
        label="描述:"
      >
        <el-input v-model="warehouseForm.description" />
      </el-form-item>

      <el-form-item
        class="width-input"
        prop="admin"
        label="管理员:"
        :rules="[
          { required: true, message: '管理员不能为空', trigger: 'blur' }
        ]"
      >
        <el-select
          v-model="warehouseForm.admin"
          multiple
          filterable
          remote
          style="width: 100%"
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
          :trigger-on-focus="true"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="(inventory, index) in warehouseForm.inventories"
        :key="inventory.key"
        class="width-input"
        :label="'存库' + index + ':'"
        :prop="'inventories.' + index + '.name'"
        :rules="{
          required: true, message: '不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="inventory.name" class="width-input-1" placeholder="请输入库存名称" />
        <el-input v-model="inventory.description" class="width-input-2" placeholder="请输入描述" />
        <el-button @click.prevent="removeDomain(inventory)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('warehouseForm')">提交</el-button>
        <el-button @click="addDomain">新增库存</el-button>
        <el-button @click="resetForm('warehouseForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>
<script>
import { getUsers } from '@/api/article'
import { createWarehouse } from '@/api/storage'

export default {
  data() {
    return {
      warehouseForm: {
        inventories: [{
          name: '',
          description: ''
        }],
        name: '',
        description: '',
        admin: []
      },
      loading: false,
      options: [],
      list: [],
      states: []
    }
  },
  mounted() {
    this.getAdmin()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert(formName)
          console.log(this.warehouseForm)
          createWarehouse(formName).then(response => {
            this.list = response
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.warehouseForm.inventories.indexOf(item)
      if (this.warehouseForm.inventories.length > 1) {
        if (index !== -1) {
          this.warehouseForm.inventories.splice(index, 1)
        }
      } else {
        this.$message({
          message: '至少要有一个库存',
          type: 'warning'
        })
      }
    },
    addDomain() {
      this.warehouseForm.inventories.push({
        value: '',
        key: Date.now()
      })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = this.list
      }
    },
    getAdmin() {
      getUsers().then(response => {
        console.log(response)
        this.states = response.admins
        this.list = this.states.map(item => {
          return { value: `${item.id}`, label: `${item.id},` + `${item.name}` }
        })
        this.options = this.list
      })
    }

  }
}
</script>
<style scoped>
.width-input{
  width: 80%;
}
.width-input-1{
  width: 20%;
}
.width-input-2{
  width: 68%;
}
</style>
