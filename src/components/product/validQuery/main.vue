<template>
  <el-row class="valid-query">
    <validList></validList>
  </el-row>
</template>

<script>
  import validList from './validList.vue'
  export default {
    components: {
      validList
    }
  }
</script>

<style lang="scss" scoped>
  .valid-query {

  }
</style>
