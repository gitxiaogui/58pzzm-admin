<template>
  <el-row class="loan-main">
    <el-row>
      <loanList></loanList>
    </el-row>
  </el-row>
</template>

<script>
  import loanList from './loanList.vue'
  export default {
    components: {
      loanList
    },
    data() {
      return {
        loanSearchName: ''
      }
    },
    mounted() {

    },
    methods: {
      loanSearchClick() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .loan-main{

  }
</style>
