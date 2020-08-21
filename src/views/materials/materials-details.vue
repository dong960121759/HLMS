<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header">
        <span class="field-title">物资详情: </span>

      </div>
      <div class="box-item">
        <span class="field-label">药品名称: </span>
        <span class="svg-container">药品名称</span>
        <span class="field-label">{{ $t('theme.change') }} : </span>
        <span class="svg-container">药品编码</span>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Materials',
  data() {
    return {

    }
  },
  watch: {
  }
}
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}
</style>
