<template>
  <div class="app-container in-container">
    <el-select
      v-model="value"
      filterable
      remote
      size="mini"
      style="select-kucun"
      reserve-keyword
      placeholder=""
      :trigger-on-focus="true"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-divider />
    <TablePage :page-config="pageConfig" :config="config" />
  </div>
</template>
<script>
import { fetchStorageEntry } from '@/api/storage'
import TablePage from '@/components/MyComponents/TablePage'

export default {
  name: '',
  components: { TablePage },
  data() {
    return {
      config: {
        headers: [
          { prop: 'materialId', name: '物资ID', attrs: { width: 200, align: 'center' }},
          { prop: 'materialName', name: '物资名称', attrs: { width: 200, align: 'center' }},
          { prop: 'totalNumber', name: '库存数量', attrs: { align: 'center' }},
          { prop: 'unlockedNumber', name: '未锁定库存', attrs: { align: 'center' }},
          { prop: 'lastInBound', name: '最近一次入库时间', attrs: { align: 'center' }},
          { prop: 'lastOutBound', name: '最近一次出库时间', attrs: { align: 'center' }}
        ],
        tableData: [],
        hasCheckbox: false
      },
      pageConfig: {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          warehouseId: 24124124,
          inventoryId: 34148724
        },
        dateValue1: '',
        isOpenCreate: false,
        isLog: false,
        isHasDate: false,
        isHasDelete: false,
        optionName: ''
      },
      isOpenDetailed: false,
      isOpenCreate: false,
      warehouseId: '',
      currentRow: null,
      options: [{
        value: '选项1',
        label: '库存1'
      }, {
        value: '选项2',
        label: '库存2'
      }],
      value: ''
    }
  },
  created() {
  },

  methods: {
    getListFat(listQuery) {
      fetchStorageEntry(listQuery).then(response => {
        console.log(response)
        this.pageConfig.total = 10
        this.config.tableData = response.materials
      })
    },
    handleDownload() {
      this.isOpenCreate = true
    },
    getActions() {
      return { prop: 'action', name: '操作', type: 'Action', attrs: { align: 'center' }, value: [
        { id: '1', label: '查看', click: data => {
          this.isOpenDetailed = true
          this.warehouseId = data.id
          console.log(this.pageConfig.isOpenDetailed)
        } }
      ] }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    deleteSelect(e) {

    }
  }
}
</script>
<style lang="scss">
 @import "../../../styles/tablebtn.scss";
 .in-container{
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
}
.filter-item1{
  display: inline-block;
  margin-bottom: 10px;
  margin-right:20px;
}
.select-kucun{
  display: inline;
}
 }
</style>
