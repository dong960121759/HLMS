<template>
  <el-table
    :key="tableKey"
    v-loading="listLoading"
    :data="tableData"
    border
    fit
    highlight-current-row
    style="width: 100%;"
    @sort-change="sortChange"
  >
    <template v-for="column in columns">
      <el-table-column v-if="!column.action" :key="column.title" :prop="column.prop" :label="column.title" align="center">
        <template slot-scope="scope">
          <slot v-if="column.slot" :name="column.prop" :row="scope.row" />
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-else :key="column.title" :label="column.title" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <template v-for="(fn,index) in column.actions">
            <el-button :key="index" type="primary" size="mini" @click="handleClick(scope.row,fn.fnName)">{{ fn.title }}</el-button>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>

export default {
  name: '',
  components: { },
  props: {
    columns: {
      required: true, type: Array, default: () => {
        return []
      }
    },

    tableData: {
      required: true,
      type: Array,
      default: () => {
        return []
      }
    },
    listLoading: {
      required: true,
      type: Boolean,
      default: () => {
        return false
      }
    }
  },

  methods: {
    handleClick(row, fnName) {
      this.$emit(`${fnName}`, row)
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }
  }
}
</script>
