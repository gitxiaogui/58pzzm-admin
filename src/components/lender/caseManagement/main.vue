<template>
  <el-row class="case-main">
    <el-row>
      <caseList></caseList>
    </el-row>
  </el-row>
</template>

<script>
  import caseList from './caseList.vue'
  import { lenderCaseRecordInfo } from '@/api/api.js'
  export default {
    components: {
      caseList
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .case-main{

  }
</style>
