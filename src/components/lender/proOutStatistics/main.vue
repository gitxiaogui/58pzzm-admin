<template>
  <el-row class="pro-out-statistics">
    <productOutChart></productOutChart>
  </el-row>
</template>

<script>
  import productOutChart from './proOutChart.vue'
  export default {
    components: {
      productOutChart
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
  .pro-out-statistics {

  }
</style>
