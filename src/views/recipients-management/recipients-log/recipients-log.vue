<template>
  <div class="app-container">
    <TablePage :page-config="pageConfig" :config="config" />
  </div>
</template>
<script>
import { fetchRecipientsLog, deleteRecipientsLog } from '@/api/article'
import TablePage from '@/components/MyComponents/TablePage'

export default {
  name: '',
  components: { TablePage },
  data() {
    return {
      config: {
        headers: [
          { prop: 'id', name: '领用申请单号', attrs: { width: 200, align: 'center' }},
          { prop: 'title', name: '仓库', type: 'Popover', attrs: { align: 'center' }},
          { prop: 'status', name: '状态', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'author', name: '申请人', attrs: { align: 'center' }},
          { prop: 'timestamp', name: '申请时间', type: 'Date', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [],
        hasCheckbox: true
      },
      pageConfig: {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        dateValue1: '',
        isInStorage: false,
        isLog: false,
        optionName: '新建领用申请'
      },
      isAccessDetailed: false

    }
  },
  created() {
  },

  methods: {
    getListFat(listQuery) {
      fetchRecipientsLog(listQuery).then(response => {
        this.config.tableData = response.data.items
        console.log('response.data.items')
        this.pageConfig.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDownload() {
      this.isInStorage = true
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          console.log(data)
          this.isAccessDetailed = true
          console.log(this.pageConfig.isAccessDetailed)
        } }
      ] }
    },
    deleteSelect(e) {
      console.log(e)
      deleteRecipientsLog(e).then(response => {
        this.config.tableData = response.data.items
        console.log('response.data.items')
        this.pageConfig.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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
