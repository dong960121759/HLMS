<template>

  <el-form ref="form" :model="form" label-width="600px">
    <el-form-item label="名字" />
    <el-input v-model="form.name" /> </el-form>

</template>
<script>

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
      this.form = data
      this.visible = true
      this.$nextTick(() => {
        console.log('111111111111111111' + data)
      })
    }
  }
}
</script>
