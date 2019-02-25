<template>
  <el-row class="collection-main">
    <el-row>
      <collectionList></collectionList>
    </el-row>
  </el-row>
</template>

<script>
  import collectionList from './collectionList.vue'
  export default {
    components: {
      collectionList
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
