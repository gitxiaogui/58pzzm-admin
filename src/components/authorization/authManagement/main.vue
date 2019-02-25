<template>
  <el-row class="auth-main">
    <el-row>
      <authList></authList>
    </el-row>
  </el-row>
</template>

<script>
  import authList from './authList.vue'
  export default {
    components: {
      authList
    },
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
    },
    computed: {
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  .el-row{
    margin-bottom: 10px;
    &:last-child{
      margin-bottom: 0px;
    }
  }
</style>
