<template>
  <div class="app-container">
    <div class="filter-container" style="padding-top: 0px;">
      <el-input v-model="materialCode" size="mini" placeholder="输入物资代码" style="width: 150px; margin-right:20px; margin-bottom: 0px; " class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-bottom: 0px; " @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves class="filter-item" size="mini" type="danger" icon="el-icon-delete" style="margin-bottom: 0px; " @click="deleteSelect">
        删除所选
      </el-button>
      <el-form-item label="订单号：" prop="OrderId">
        <el-input v-model="material.OrderId" style="width: 150px" />
      </el-form-item>
      <el-form-item label="供应商：" prop="supplier">
        <el-input v-model="material.supplier" style="width: 150px" />
      </el-form-item>
    </div>

    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="物资名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="物资编码">
        <template slot-scope="{row}">
          <span>{{ row.materialId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="规格">
        <template slot-scope="{row}">
          <span>{{ row.standards }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际入库数量">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.number" class="edit-input" size="mini" />
            <el-button
              class="cancel-btn"
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchWarehouseList } from '@/api/storage'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'InlineEditTable',
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
    material: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      materialCode: null,
      tableData: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    handleFilter() {

    },
    async getList() {
      this.listLoading = true
      fetchWarehouseList(this.listQuery).then(response => {
        const items = response
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalNumber = v.number //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.number = row.originalNumber
      row.edit = false
      this.$message({
        message: '已恢复原值',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalNumber = row.number
      this.$message({
        message: '入库数量已被修改',
        type: 'success'
      })
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
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
