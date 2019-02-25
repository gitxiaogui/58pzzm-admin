<template>
  <el-row class="finance-code-main">
    <codeNav :dataToChild="navData"></codeNav>
    <statisticsList v-if="showVisible === 1"></statisticsList>
    <columnList :dataToChild="columnData" v-if="showVisible === 2"></columnList>
    <detailList :dataToChild="detailData" v-if="showVisible === 3"></detailList>
  </el-row>
</template>

<script>
  import statisticsList from './statisticsList.vue'
  import columnList from './columnList.vue'
  import detailList from './detailList.vue'
  import codeNav from './codeNav.vue'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        showVisible: 1,
        navData: [],
        columnData: {},
        detailData: {}
      }
    },
    components: {
      statisticsList,
      columnList,
      detailList,
      codeNav
    },
    activated() {
      this.showVisible = 1;
      this.navData = []
      this.columnData = {}
      this.detailData = {}
    },
    created() {
      Bus.$on('financeCodeMain', (message) => {
        if(message.level === 1) {
          this.showVisible = 2;
          this.columnData = message.data;
        } else if (message.level === 2) {
          this.showVisible = 3;
          this.detailData = message.data;
        }
        this.navData.unshift(message)
      })
      Bus.$on('codeNav-codeMain', (nav) => {
        console.log(nav)
        this.showVisible = nav.level + 1;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .finance-code-main {
    .back {
      a {
        color: #314257;
      }
    }
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
</style>
