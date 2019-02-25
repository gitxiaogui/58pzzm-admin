<template>
  <el-row class="received-statistics">
    <paymentBatch></paymentBatch>
  </el-row>
</template>

<script>
  import paymentBatch  from './paymentbatch.vue'
  export default {
    components: {
       paymentBatch
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