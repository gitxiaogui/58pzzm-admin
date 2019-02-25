<template>
  <el-card class="contact-with">
    <h3>联系本人</h3>
    <p>
      <el-row>
        <!--<el-select placeholder="选择号码">-->
        <!--</el-select>-->
        <el-button type="primary" icon="edit">拨打电话</el-button>
      </el-row>
      <el-row>
        <!--<el-select v-model="tel" placeholder="选择号码">-->
        <!--</el-select>-->
        <el-button type="primary" icon="edit">发送信息</el-button>
      </el-row>
    </p>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        tel: ''
      }
    }
  }
</script>

<style lang="scss">
  .contact-with{

  }
</style>
