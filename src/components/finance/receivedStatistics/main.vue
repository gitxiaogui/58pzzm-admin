<template>
  <el-row class="received-statistics">
    <receivedChart></receivedChart>
  </el-row>
</template>

<script>
  import receivedChart from './receivedChart.vue'
  export default {
    components: {
      receivedChart
    },
    data() {
      return {

      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .received-statistics {

  }
</style>
