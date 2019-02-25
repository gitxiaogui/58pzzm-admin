<template>
    <el-card class="review-main">
      <el-row>
        <reviewRepayment></reviewRepayment>
      </el-row>
      <el-row>
        <reviewAbatement></reviewAbatement>
      </el-row>
      <el-row>
        <assignManagement></assignManagement>
      </el-row>
      <el-row>
        <reviewRevocation></reviewRevocation>
      </el-row>
      <el-row>
        <reviewWaive></reviewWaive>
      </el-row>
    </el-card>
</template>

<script>
  import reviewRepayment from './reviewRepayment.vue'
  import reviewAbatement from './reviewAbatement.vue'
  import assignManagement from './assignManagement.vue'
  import reviewRevocation from './reviewRevocation.vue'
  import reviewWaive from './reviewWaive.vue'
  export default {
    components: {
      reviewAbatement,
      assignManagement,
      reviewRepayment,
      reviewRevocation,
      reviewWaive
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin-bottom: 10px;
  }
</style>
