<template>
  <el-dialog
    :title="出入库申请单详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="form" :model="form" label-width="600px">
      <el-form-item label="名字" />
      <el-input v-model="form.name" /> </el-form>
  </el-dialog>
</template>
<script>
import { date } from 'jszip/lib/defaults'

export default {
  name: 'AccessDetailed',
  data() {
    return {
      visible: false,
      form: Object
    }
  },
  methods: {
    inits(data) {
      this.form = date
      this.visible = true
    }
  }
}
</script>
