<template>
  <el-button-group>
    <el-button
      v-for="(btn,index) in buttons"
      :key="index"
      :type="btn.type ? btn.type:'primary'"
      :icon="btn.icon"
      :size="btn.size?btn.size:'mini'"
      @click="btn.click"
    >{{ btn.label }}</el-button>
  </el-button-group>
</template>

<script>
export default {
  name: 'BarBtn', // 注意这里的name命名，就是你以后封装好后使用的组件名
  props: {
    buttons: {
      type: Array,
      required: true
    }
  }
}
</script>
