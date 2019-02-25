<template>
  <el-row class="pro-receivable-statistics">
    <productReceivable></productReceivable>
  </el-row>
</template>

<script>
  import productReceivable from './proReceivable.vue'
  export default {
    components: {
      productReceivable
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
  .pro-receivable-statistics {

  }
</style>
