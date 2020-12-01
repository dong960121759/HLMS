<template>
  <EditForm ref="form" :config="config" @submit="determine" />
</template>
<script>
import EditForm from '@/components/MyComponents/EditForm/EditForm'
export default {
  components: {
    EditForm
  },
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
          { prop: 'types', label: '材料类别' },
          { prop: 'id', label: '材料编号' },
          { prop: 'name', label: '材料名称' },
          { prop: 'supplier', label: '供应商' },
          { prop: 'standards', label: '规格型号' },
          { prop: 'chargeUnit', label: '计价单位' },
          { prop: 'number', label: '数量' },
          { prop: 'unitPrice', label: '本币单价' },
          { prop: 'unitPriceTotal', label: '本币税价合计' },
          { prop: 'taxRate', label: '税率' },
          { prop: 'whetherboolen', label: '是否紧急', is: 'checkbox' },
          { prop: 'date', label: '日期', is: 'date' },
          { prop: 'remarks', label: '备注', type: 'textarea' }
        ],
        data: {
          types: '',
          id: '',
          name: '',
          standards: '',
          chargeUnit: '',
          number: '',
          unitPrice: '',
          unitPriceTotal: '',
          taxRate: '',
          whetherboolen: false,
          date: undefined,
          remarks: ''
        },
        rowSize: 2,
        submitname: '确定',
        footer: true
      }
    }
  },
  created() {
    if (this.rowData !== null) {
      this.config.data = JSON.parse(JSON.stringify(this.rowData))
    }
  },
  methods: {
    determine(res) {
      this.$emit('closeCreateDialog', false)
    }
  }
}
</script>
