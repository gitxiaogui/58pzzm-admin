<template>
  <div class="history">
    <h3>历史操作事件</h3>
    <el-table
      :data="currentList"
      border
      style="width: 100%">
      <el-table-column
        label="操作类型"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          {{ collectionEventType[scope.row.eventType] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="操作内容"
        label-class-name="table-header-bold"
        header-align="center"
        min-width="300">
      </el-table-column>
      <el-table-column
        label="催收员"
        label-class-name="table-header-bold"
        header-align="center"
        width="200">
        <template scope="scope">
          {{ scope.row.collectorName }}
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        label-class-name="table-header-bold"
        align="center"
        width="250">
        <template scope="scope">
          {{ dateFormat(new Date(scope.row.createTime), 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="nowPage"
        :total="listTotalNumber"
        layout="prev, pager, next">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import { collectGetEvent } from '@/api/api'
  import { collectionOptionMixin } from '@/common/mixin.js'
  import { dateFormat } from '@/common/util.js'
  import { collectionEventType } from '@/common/formRules.js'
  export default {
    mixins: [collectionOptionMixin],
    data() {
      return {
        nowPage: 1,
        listTotalNumber: 0,
        currentList: [],
        collectionEventType
      }
    },
    activated() {
      // this.getList()
    },
    watch: {
      collectionCaseInfo: function (val) {
        this.getList()
      }
    },
    methods: {
      dateFormat,
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      getList(index = 1) {
        collectGetEvent(
          {
            page: index,
            size: 10,
            sortBy: 'createTime',
            sortOrder: 'desc',
            caseId: this.collectionCaseInfo.id
          }
        ).then((res) => {
          console.log(res)
          this.nowPage = res.pageNum;
          this.listTotalNumber = res.total;
          this.currentList = res.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history{
    .el-table {
      margin-bottom: 10px;
    }
  }
</style>
