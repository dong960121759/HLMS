<template functional>
  <span>{{ props.value | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
</template>
