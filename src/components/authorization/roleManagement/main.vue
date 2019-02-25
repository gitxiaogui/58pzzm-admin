<template>
  <el-row class="role-main">
    <el-row>
      <roleList></roleList>
    </el-row>
  </el-row>
</template>

<script>
  import roleList from './roleList.vue'
  export default {
    components: {
      roleList
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
