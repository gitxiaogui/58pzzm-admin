<template>
  <el-row class="loan-statistics">
    <loanChart></loanChart>
  </el-row>
</template>

<script>
  import loanChart from './loanChart.vue'
  export default {
    components: {
      loanChart
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
  .loan-statistics {

  }
</style>
