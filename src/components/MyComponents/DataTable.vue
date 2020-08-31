<template>
  <el-table :data="config.tableData" style="width: 100%" v-bind="cfg.attrs" :row-click="getTableEvents" v-on="cfg.on" @row-dblclick="tableDbEdit">
    <el-table-column v-if="cfg.hasCheckbox" type="selection" width="55" label="xx" />
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
    tableDbEdit() {
      this.$emit(`tableDbEdit`, this.checked)
    }
  }
}
</script>
