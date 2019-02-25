<template>
  <el-row class="received-statistics">
      <paymentConfirm></paymentConfirm>
  </el-row>
</template>

<script>
  import paymentConfirm  from './paymentconfirm.vue'
  export default {
    components: {
       paymentConfirm 
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