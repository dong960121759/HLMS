<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
    <el-dialog
      title="申请领用详情"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenDetailed"
    >
      <TablePageDetailed v-if="isOpenDetailed" ref="tablePageDetailed" :oid="oid" />
    </el-dialog>
    <el-dialog
      title="申请领用"
      width="80%"
      center
      :close-on-click-modal="false"
      :visible.sync="isOpenCreate"
    >
      <CreateRequition v-if="isOpenCreate" ref="CreateRequition" />
    </el-dialog>
  </div>
</template>
<script>
import { fetchRecipientsRequisition, deleteRecipientsRequisition } from '@/api/article'
import TablePage from '@/components/MyComponents/TablePage'
import TablePageDetailed from './requisition-recipients-detailed'
import CreateRequition from './create-requestion'
export default {
  name: '',
  components: { TablePage, TablePageDetailed, CreateRequition },
  data() {
    return {
      config: {
        headers: [
          { prop: 'id', name: '领用申请单号', attrs: { width: 200, align: 'center' }},
          { prop: 'warehouse', name: '仓库', type: 'Popover', attrs: { align: 'center' }},
          { prop: 'status', name: '状态', attrs: { align: 'center' }},
          { prop: 'applicant', name: '申请人', attrs: { align: 'center' }},
          { prop: 'applicantTime', name: '申请时间', type: 'Date', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: true,
        hasIndex: false,
        tableDbEdit: this.tableDbEdit
      },
      pageConfig: {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          type: undefined,
          sort: '+id',
          oid: undefined,
          dateValue: undefined
        },
        dateValue1: '',
        isLog: true,
        isHasDate: true,
        isHasDelete: true,
        optionName: '新建领用申请'
      },
      isOpenCreate: false,
      isOpenDetailed: false,
      oid: 0
    }
  },
  created() {
  },

  methods: {
    getListFat(listQuery) {
      fetchRecipientsRequisition(listQuery).then(response => {
        this.config.tableData = response
      })
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log(data)
          this.isOpenDetailed = true
        } }
      ] }
    },
    handleDownload() {
      this.isOpenCreate = true
    },
    // 删除所选
    deleteSelect(e) {
      console.log(e)
      deleteRecipientsRequisition(e).then(response => {
        this.config.tableData = response.data.items
        console.log('response.data.items')
        this.pageConfig.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 双击效果
    tableDbEdit(checked) {
      console.log('tableDbEdit')
      console.log(checked)
    }
  }
}
</script>
<style>
 @import "../../../styles/tablebtn.scss";
.filter-item1{
  display: inline-block;
  margin-bottom: 10px;
  margin-right:20px;
}

</style>
