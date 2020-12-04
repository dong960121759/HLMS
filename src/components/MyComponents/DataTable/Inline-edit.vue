<template>
  <div>
    <template v-if="data['is' + `${prop}`]">
      <el-input v-model="inputVal" class="edit-input" size="mini" />
      <el-button
        class="cancel-btn"
        size="mini"
        icon="el-icon-refresh"
        type="warning"
        title="恢复原值"
        circle
        @click="cancelEdit(data)"
      />
      <el-button
        class="ok-btn"
        size="mini"
        icon="el-icon-check"
        type="success"
        title="确定"
        circle
        @click="okEdit(data)"
      />
    </template>
    <span v-else>{{ inputVal }}</span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: () => {
        return -1
      }
    },
    prop: {
      type: String,
      default: () => {
        return null
      }
    },
    data: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      inputVal: this.value
    }
  },
  created() {
    console.log('11111111111')
    console.log(this.data)
  },
  methods: {
    cancelEdit(data) {
      this.inputVal = this.value
      data['is' + `${this.prop}`] = false
      this.$message({
        message: '已恢复原值',
        type: 'warning'
      })
    },
    okEdit(data) {
      this.$confirm('是否修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        data[`${this.prop}`] = Number(this.inputVal)
        data['is' + `${this.prop}`] = false
        this.$message({
          message: '已修改',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    }
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 35%;
}
.cancel-btn {
  position: absolute;
  right: 35px;
}
.ok-btn {
  position: absolute;
  right: 2px;
}
</style>
