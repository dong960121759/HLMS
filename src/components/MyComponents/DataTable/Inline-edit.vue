<template functional>
  <div>
    <template v-if="props.edit">
      <el-input v-model="props.value" class="edit-input" size="small" />
      <el-button
        class="cancel-btn"
        size="small"
        icon="el-icon-refresh"
        type="warning"
        circle
        @click="cancelEdit(props)"
      />
    </template>
    <span v-else>{{ props.value }}</span>
  </div>
</template>
<script>
export default {
  methods: {
    cancelEdit(row) {
      console.log('row')
      console.log(row)
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: '已恢复原值',
        type: 'warning'
      })
    }
  }
}
</script>
