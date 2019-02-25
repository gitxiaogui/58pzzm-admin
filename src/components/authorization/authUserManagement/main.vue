<template>
  <el-row class="user-main" :gutter="20">
    <el-col :span="6">
      <departmentSelect parentVUE="userMain"></departmentSelect>
    </el-col>
    <el-col :span="18">
      <authUserList></authUserList>
    </el-col>
  </el-row>
</template>

<script>
  import departmentSelect from './departmentSelect.vue'
  import authUserList from './authUserList.vue'
  import Bus from '@/eventBus'
  export default {
    components: {
      departmentSelect,
      authUserList
    },
    data() {
      return {
      }
    },
    methods: {
    },
    watch: {
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .user-main{
    .el-row{
      margin-bottom: 15px;
      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
</style>
