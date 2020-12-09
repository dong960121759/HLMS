<template>
  <el-table
    :data="config.tableData"
    style="width: 100%"
    v-bind="cfg.attrs"
    :row-click="getTableEvents"
    highlight-current-row
    v-on="cfg.on"
    @current-change="handleCurrentChange"
    @row-dblclick="config.tableDbEdit"
  >
    <el-table-column v-if="cfg.hasCheckbox" type="selection" width="40" label="xx" />
    <el-table-column v-if="cfg.hasIndex" type="index" width="50" align="center" label="序号" />
    <el-table-column v-for="n in cfg.headers" :key="n.prop" :prop="n.prop" :label="n.name" v-bind="{...columnAttrs, ...n.attrs}">
      <template slot-scope="{row}">
        <Cell :config="n" :data="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Cell from './cell'

export default {
  name: 'DataTable',
  components: {
    Cell
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return null
      } }
  },
  data() {
    return {
      columnAttrs: {
        align: 'left',
        resizable: false
      },
      cfg: {
        on: this.getTableEvents(),
        attrs: {
          border: true,
          stripe: true
        },
        ...this.config
      },
      checked: []
    }
  },
  methods: {
    getTableEvents() {
      const { hasCheckbox = false } = this.config; const events = {}; const _this = this
      if (hasCheckbox) {
        // 绑定事件
        Object.assign(events, {
          'selection-change'(v) {
            _this.checked = v
          }
        })
      }

      return events
    },
    getChecked() {
      return this.checked
    },

    handleCurrentChange(val) {
      this.$emit(`handleCurrentChange`, val)
    }
  }
}
</script>
<style lang="scss">
.btn2{
    padding: 7px 10px;
    min-width: 60px;
    margin-left: 10px;
    color: #FFFFFF;
    background-color: #ff4949;
    border-color: #ff4949;
}
.btnTrue{
  display: none;
}

// 解决纵向边框错位问题
.el-table th.gutter{
    display: table-cell!important;
}
</style>
