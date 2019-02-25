<template>
  <el-row class="renewal-list">
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
        prop="lenderAmount"
        label="借款金额">
      </el-table-column>
      <el-table-column
        prop="overdueDayCount"
        label="逾期天数">
      </el-table-column>
      <el-table-column
        prop="renewalCount"
        label="逾期次数">
      </el-table-column>
    </el-table>
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
  import { splitArray } from '@/common/util.js'
  export default {
    props: ['dataToChild'],
    data() {
      return {
        nowPage: 1,
        totalNum: 0,
        currentData: []
      }
    },
    methods: {
      handlePageChange(pageNum) {
        this.nowPage = pageNum
      }
    },
    watch: {
      dataToChild: function () {
        console.log(this.dataToChild)
        this.totalNum = this.dataToChild.length;
        this.currentData = splitArray(this.dataToChild, 10)
      }
    }
  }
</script>

<style lang="scss">
  .renewal-list{

  }
</style>
