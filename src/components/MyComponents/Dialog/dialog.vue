<template>
  <el-dialog
    top="20vh"
    class="el-dialog-cus"
    v-bind="attributes"
    :visible="visible"
    :before-close="beClose"
    append-to-body
    :close-on-click-modal="false"
  >
    <slot v-if="visible" />
    <div slot="footer">
      <el-button plain @click="cancel">{{ btnTxt[0] }}</el-button>
      <el-button v-if="btnTxt[1]" type="primary" @click="confirm">{{ btnTxt[1] }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      default: () => ({
        width: '420px',
        title: '提示',
        center: true,
        btnTxt: ['取消', '确定']
      })
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    const { config } = this; const { btnTxt } = config
    return {
      visible: false,
      attributes: config,
      btnTxt
    }
  },
  methods: {
    open(ok) {
      this.ok = ok
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    confirm() {
      const cancel = () => this.cancel()
      this.ok(cancel)
      this.autoClose && cancel()
    },
    beClose(done) {
      done()
      this.beforeClose()
      this.cancel()
    }
  }
}
</script>

<style lang="scss">
.el-dialog-cus {
  .el-dialog {
    padding: 8px;
  }
  .el-dialog__title {
    font-weight: bold;
  }
  .el-dialog__header {
    padding: 20px 0 12px;
  }
  .el-dialog__headerbtn {
    top: 8px;
    right: 8px;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0 24px;
    text-align: center;
  }
  .el-dialog__footer {
    padding: 20px;
    .el-button {
      padding: 8px 20px;
      & + .el-button {
        margin-left: 40px;
      }
    }
  }
}
</style>
