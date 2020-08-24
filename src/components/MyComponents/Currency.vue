<template functional>
  <span>{{ props.value | currency }}</span>
</template>
<script>
export default {
  name: 'ComplexTable',
  filters: {
    currency(value) {
      if (!value) return value
      const str = value.split('.')
      const re = /\d{1,3}(?=(\d{3})+$)/g
      const n1 = str[0].replace(re, '$&,')
      return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`
    }
  }
}
</script>
