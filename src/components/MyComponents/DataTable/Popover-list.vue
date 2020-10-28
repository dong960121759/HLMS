<template functional>
  <el-popover trigger="focus" placement="top">
    <el-table
      :data="props.value"
      stripe
      border
      class="table"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="150"
        align="center"
      />
      <el-table-column
        label="姓名"
        width="150"
        prop="name"
        align="center"
      />
    </el-table>
    <div slot="reference" class="name-wrapper">
      <span slot="reference" class="popover-txt">{{ props.value[0].name }}</span>
      <span v-if="props.value.length > 1" slot="reference" class="popover-txt">, {{ props.value[1].name }}</span>
      <span v-if="props.value.length > 2" slot="reference" class="popover-txt">...</span>
    </div>
  </el-popover>

</template>

<style scoped>
.popover-txt{
  width: 45%;
 overflow:hidden;
 text-overflow:ellipsis;
 white-space:nowrap;
 cursor: pointer;
}
</style>
