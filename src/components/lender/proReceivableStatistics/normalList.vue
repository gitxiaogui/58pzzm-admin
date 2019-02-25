<template>
  <el-row class="in-query-list">
    <el-row class="in-query-list">
      <el-table
        class="list-table"
        :data="currentData[nowPage - 1]"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          prop="beginTime"
          label="起始时间">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="截止日期">
        </el-table-column>
        <el-table-column
          prop="normalAmountReport"
          label="正常应收费用">
        </el-table-column>
        <el-table-column
          prop="id"
          label="借款id">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="nowPage"
        layout="prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
  import { dateFormat, splitArray } from '@/common/util.js'
  export default {
    data() {
      return {
        totalNum: 0,
        nowPage: 1,
        currentData: []
      }
    },
    activated() {
      this.totalNum = 0;
      this.nowPage = 1;
      this.currentData = []
      this.getList()
    },
    mounted() {
      this.getList()
    },
    methods: {
      dateFormat,
      handlePageChange(pageNum) {
        this.nowPage = pageNum
      },
      getList(index = 1) {
        let list = this.$store.state.productInList.normalProdDateRecordVos;
        if(!list) {
          this.$router.push('/product-in');
          return;
        }
        this.totalNum = list.length;
        this.currentData = splitArray(list, 10);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .in-query-list{

  }
</style>
