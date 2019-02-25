<template>
  <el-row class="in-query-list">
    <el-row class="in-query-list">
      <el-table
        class="list-table"
        :data="currentData"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          label="入账时间">
          <template scope="scope">
            <span style="margin-left: 10px">{{ dateFormat(new Date(scope.row.incomeTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="finaceItemCode"
          label="财务科目编号">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
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
  import { dateFormat } from '@/common/util.js'
  import { prodInQuery } from '@/api/api'
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
        this.getList(pageNum)
      },
      getList(index = 1) {
        prodInQuery(
          {
            page: index,
            rows: 10
          }
        ).then((res)=>{
          console.log(res)
          this.currentData = res.prodInFinaceRecordList.list
          this.totalNum = res.prodInFinaceRecordList.total
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .in-query-list{

  }
</style>
