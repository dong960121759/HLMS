<template>
  <div class="app-container" style="padding-top: 0px;">
    <EditForm ref="form" :config="config" @submit="getList" />
  </div>
</template>
<script>
import EditForm from '@/components/MyComponents/EditForm/EditForm'
export default {
  name: 'AllotDetailed',
  components: { EditForm },
  props: {
    rowData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      config: {
        columns: [
          { prop: 'id', label: '调拨单号', is: 'auto', fetchSuggestions: this.querySearch, disabled: true },
          { prop: 'warehouseOut', label: '调出仓库', rules: [{ required: true, message: '调出仓库不能为空' }] },
          { prop: 'warehouseIn', label: '调入仓库', rules: [{ required: true, message: '调入仓库不能为空' }] },
          { prop: 'applicant', label: '申请人' },
          { prop: 'applicantTime', label: '申请时间', is: 'date' }
        ],
        data: JSON.parse(JSON.stringify(this.rowData)),
        rowSize: 3, // 一行可以展示几列表单，默认为3列
        submitname: '提交',
        footer: true
      }
    }
  },
  created() {
    // this.config.data = this.rowData
  },
  methods: {
    getList(res) {
      console.log(res)
    }
  }
}
</script>
<style lang="scss">

</style>
