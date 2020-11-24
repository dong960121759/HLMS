<template>
  <div class="app-container bar-btn" style="padding-top: 5px;">
    <div class="bar-container">
      <EditForm ref="form" :config="configForm" />
    </div>
    <el-divider />
    <div class="bar-container">
      <BarBtn :buttons="buttons" />
    </div>
    <el-divider />
    <DataTable ref="table" :config="configTable" />
    <pagination v-show="configPage.total>0" :total="configPage.total" :page.sync="configPage.listQuery.page" :limit.sync="configPage.listQuery.limit" aria-setsize="mini" @pagination="configPage.getList" />
  </div>
</template>
<script>
import EditForm from '@/components/MyComponents/EditForm/EditForm'
import BarBtn from '@/components/MyComponents/BarBtn'
import DataTable from '@/components/MyComponents/DataTable'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'NewTablePage',
  components: { EditForm, BarBtn, Pagination, DataTable },
  props: {
    buttons: {
      type: Array,
      default: () => {
        return []
      }
    },
    configForm: {
      type: Object,
      default: () => {
        return null
      }
    },
    configTable: {
      type: Object,
      default: () => {
        return null
      }
    },
    configPage: {
      type: Object,
      default: () => {
        return null
      }
    }

  },
  data() {
    return {

    }
  },
  methods: {
    getList() {

    }

  }
}
</script>
<style lang="scss">
.bar-btn{
   .el-divider--horizontal {
    display: block;
    height: 2px;
    width: 100%;
    margin: 5px 0;
   }
}
</style>
