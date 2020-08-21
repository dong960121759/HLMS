<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane :key="'first'" label="调拨申请" name="first">
        <keep-alive>
          <Child1 v-if="isChildUpdate1" />
        </keep-alive>

      </el-tab-pane>
      <el-tab-pane :key="'second'" label="调拨清单" name="second">
        <keep-alive>
          <Child2 v-if="isChildUpdate2" />
        </keep-alive>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AllotRequisition from './allot-requisition'
import AllotRequisitionInventory from './allot-requisition-inventory'
export default {
  name: 'Tab',
  components: {
    Child1: AllotRequisition,
    Child2: AllotRequisitionInventory
  },
  data() {
    return {
      activeName: 'first',
      createdTimes: 0,
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
      if (val === 'first') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
      } else if (val === 'second') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    handleClick(tab) {
      if (tab.name === 'first') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
      } else if (tab.name === 'second') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
