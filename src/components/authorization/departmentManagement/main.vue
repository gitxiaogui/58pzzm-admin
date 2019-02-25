<template>
  <el-row class="depart-main">
    <el-row>
      <departmentList></departmentList>
    </el-row>
  </el-row>
</template>

<script>
  import departmentList from './departmentList.vue'
  export default {
    components: {
      departmentList
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
