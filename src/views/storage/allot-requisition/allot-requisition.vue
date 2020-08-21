<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
      <el-radio-group v-model="switchRoles" style="width: 200px; margin-left: 30px;" class="filter-item" @change="handleAllotOutIn">
        <el-radio-button label="in">调入</el-radio-button>
        <el-radio-button label="out">调出</el-radio-button>
      </el-radio-group>
    </div>
    <div class="filter-container">
      <el-checkbox-group v-model="checkList" class="filter-item" style="width: 100%; margin-left: 30px;">
        <el-checkbox label="1">日用品</el-checkbox>
        <el-checkbox label="2">办公用品</el-checkbox>
        <el-checkbox label="3">设备配件</el-checkbox>
        <el-checkbox label="4">电脑耗材</el-checkbox>
        <el-checkbox label="5">其他各种类型耗材</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column
        v-loading="loading"
        align="center"
        label="物资"
        width="110px"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="规格">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="存货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'Child1',
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
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      multipleSelection: [],
      switchRoles: 'in',
      checkList: []
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
        this.list = response.data.items
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectAllot() {

    },
    handleAllotOutIn(switchRoles) {

    }
  }
}
</script>

