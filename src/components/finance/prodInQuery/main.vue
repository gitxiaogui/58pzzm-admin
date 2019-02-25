<template>
  <el-row class="prod-in-query">
    <inQueryList></inQueryList>
  </el-row>
</template>

<script>
  import inQueryList from './inQueryList.vue'
  export default {
    components: {
      inQueryList
    }
  }
</script>

<style lang="scss" scoped>
  .prod-in-query {

  }
</style>
