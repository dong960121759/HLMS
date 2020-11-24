<template functional>
  <!-- <span>{{ props.value | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
  <span>{{ props.value | dateFormat(props.format) }}</span>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Dateformat',
  filters: {
    dateFormat(value, format) {
      if (value === undefined) {
        return ''
      }
      return moment(value).format(format)
    }
  }
}
</script>
