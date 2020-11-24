<template>
  <div>
    <div id="printMe" ref="printContent" class="printMe1">
      <EditForm ref="form" :config="config" @submit="getList" />
    </div>
    <el-button type="primary" @click="toImg">转图片打印</el-button>
    <el-button v-print="printObj" type="primary">直接打印</el-button>
    <img style="margin-top:20px;" :src="img" alt="">
  </div>

</template>
<script>
import EditForm from '../EditForm/EditForm'

const statusLlist = [
  { label: '未提交', value: '0' },
  { label: '待审批', value: '1' },
  { label: '已通过', value: '2', disabled: true }
]

export default {
  components: {
    EditForm
  },
  data() {
    const confimPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.$refs.form.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      img: '',
      aa: [1, 2, 3],
      printObj: {
        id: 'printMe',
        popTitle: '打印',
        endCallback: (e) => {
          console.log(e, 5555)
        }
        // extraCss: 'https://www.google.com,https://www.google.com',
        // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      textarea: '轻轻的我走了，',
      config: {
        columns: [
          { prop: 'name', label: '借款名称', is: 'auto', fetchSuggestions: this.querySearch },
          { prop: 'certificateId', label: '代码', rules: [{ required: true, message: '请输入统一信用代码' }] },
          { prop: 'daterange', label: '日期范围', is: 'daterange' },
          { prop: 'date', label: '日期', is: 'date' },
          { prop: 'status', label: '状态', is: 'select', list: statusLlist, callback: r => this.statusChange(r) },
          { prop: 'password', label: '密码', type: 'password' },
          { prop: 'confimPass', label: '确认密码', type: 'password', rules: [{ validator: confimPass }] },
          { prop: 'remark', label: '备注', type: 'textarea' },
          { prop: 'email', label: '邮箱', rules: [{ required: true, message: '请输入邮箱地址' }, { type: 'email', message: '请输入正确的邮箱地址' }] },
          { prop: 'remember', label: '记住密码', is: 'checkbox' },
          { prop: 'gender', label: '性别', is: 'radioGroup', list: [{ label: 'male', value: '男' }, { label: 'famale', value: '女', disabled: true }] },
          { prop: 'love', label: '爱好', is: 'checkboxGroup', list: [{ label: '篮球', value: '0' }, { label: '排球', value: '1' }, { label: '足球', value: '2', disabled: true }] },
          { prop: 'delivery', label: '即时配送', is: 'switch' }
        ],
        data: {
          name: '小坏',
          certificateId: '222',
          status: '0',
          love: ['0']
        },
        rowSize: 3 // 一行可以展示几列表单，默认为3列
      }
    }
  },
  methods: {
    querySearch(q, cb) {
      if (!q) { cb(this.aa); return }
    },
    getList(res) {
      console.log(res)
    },
    statusChange(r) {
      console.log(r)
    },
    toImg() {
      // html2canvas(this.$refs.printContent, {
      //   backgroundColor: null,
      //   useCORS: true,
      //   windowHeight: document.body.scrollHeight
      // }).then((canvas) => {
      //   // let url = canvas.toDataURL('image/jpeg', 1.0)
      //   const url = canvas.toDataURL()
      //   this.img = url
      //   printJS({
      //     printable: url,
      //     type: 'image',
      //     documentTitle: '打印图片'
      //   })
      //   // console.log(url)
      // })
    }
  }
}
</script>
<style lang="scss">
.printMe1{
.content {
  width: 300px;
  border: 1px solid #000;
  text-align: center;
  margin-bottom: 200px;
  padding-top: 20px;
}
.content li {
  padding: 10px 0;
}
}
</style>
