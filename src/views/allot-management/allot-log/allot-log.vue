<template>
  <div class="app-container">
    <el-button v-if="excelExport" type="primary" @click="download">获取勾选的表格数据</el-button>
    <DataTable ref="table" :config="config" />
  </div>
</template>

<script>
import DataTable from '@/components/MyComponents/DataTable'
export default {
  components: {
    DataTable
  },
  data() {
    return {
      config: {
        headers: [
          { prop: 'contractCode', name: '调拨申请单号', attrs: { width: 200, align: 'center' }},
          { prop: 'status', name: '状态', type: 'Enum', Enum: { name: 'order' }, attrs: { align: 'center' }},
          { prop: 'payeeAcctName', name: '调出仓库', attrs: { align: 'center' }},
          { prop: 'tradeAmt', name: '调入仓库', attrs: { align: 'center' }},
          { prop: 'reason', name: '申请人', type: 'Popover', attrs: { align: 'center' }},
          { prop: 'payTime', name: '申请时间', type: 'Date', attrs: { align: 'center' }}
        ].concat(this.getActions()),
        tableData: [
          { id: 1, contractCode: '', payeeAcctName: '中国银行上海分行', tradeAmt: '503869', status: '00', payTime: 1593585652530,
            statistic: [
              { level: 3, total: 5 },
              { level: 2, total: 7 },
              { level: 1, total: 20 },
              { level: 0, total: 0 }
            ]
          },
          { id: 2, contractCode: 'GLP-YG-B3-1111', payeeAcctName: '中国邮政上海分行', tradeAmt: '78956.85', status: 'CREATED', payTime: 1593416718317,
            reason: 'Popover的属性与Tooltip很类似，它们都是基于Vue-popper开发的，因此对于重复属性，请参考Tooltip的文档，在此文档中不做详尽解释。'
          },
          { id: 3, contractCode: 'HT1592985730310', payeeAcctName: '招商银行上海支行', tradeAmt: '963587123', status: 'PASS', payTime: 1593420950772, monitorStatus: '01' },
          { id: 4, contractCode: 'pi239', payeeAcctName: '广州物流有限公司', tradeAmt: '875123966', status: 'REJECT', payTime: 1593496609363 },
          { id: 5, contractCode: '0701001', payeeAcctName: '建设银行上海分账', tradeAmt: '125879125', status: 'REFUSE', payTime: 1593585489177 }
        ],
        hasCheckbox: true
      },
      status: '01',
      permission: ['handle', 'pass', 'refuse', 'reApply', 'export']
    }
  },
  computed: {
    handle() {
      return this.permission.some(n => n === 'handle')
    },
    pass() {
      return this.permission.some(n => n === 'pass')
    },
    reject() {
      return this.permission.some(n => n === 'reject')
    },
    refuse() {
      return this.permission.some(n => n === 'refuse')
    },
    excelExport() {
      return this.permission.some(n => n === 'handle') && this.permission.some(n => n === 'export')
    }
  },
  methods: {
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { label: '查看', click: data => {
          console.log(data)
        } }
      ] }
    },
    download() {
      console.log(this.$refs.table.getChecked())
    }
  }
}
</script>
<style>
.action span{margin-right:10px;color:#359C67;cursor: pointer;}
.action {text-align: center;}
</style>
