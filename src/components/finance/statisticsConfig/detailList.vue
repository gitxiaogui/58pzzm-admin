<template>
  <el-row class="detail-list">
    <el-row>
      <el-col :span="6">
        <el-button icon="plus" type="info" @click="addCode()">新增统计详情</el-button>
      </el-col>
    </el-row>
    <el-table
      class="list-table"
      :data="currentData"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        label="统计详情编号">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="statisticsId"
        label="统计列编号">
      </el-table-column>
      <el-table-column
        prop="finaceItemCode"
        label="财务科目编号">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template scope="scope">
          <span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-col>
            <el-button
              size="mini"
              type="warning"
              @click="changeCode(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteCode(scope.row)">删除</el-button>
          </el-col>
        </template>
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
    <el-dialog size="small" :close-on-click-modal="true" v-if="addCodeVisible" :modal-append-to-body="false" title="新增统计详情" :visible.sync="addCodeVisible">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-cascader
            v-model="addForm.dtlCode"
            :options="addForm.dtlAddCode"
            :show-all-levels="false"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-button
          @click="saveAdd()"
          type="success"
        >
          保存
        </el-button>
      </el-row>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="changeCodeVisible" :modal-append-to-body="false" title="修改统计详情" :visible.sync="changeCodeVisible">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-cascader
            v-model="changeForm.dtlCode"
            :options="options"
            :show-all-levels="false"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-button
          @click="saveChange()"
          type="success"
        >
          保存
        </el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import { financeDtlList, financeDtlAdd, financeDtlModify, financeDtlDelete, financeDtlGet, financeDtlCodeList } from '@/api/api'
  import { dateFormat, deleteNullAttr } from '@/common/util.js'
  export default {
    props: ['dataToChild'],
    data() {
      return {
        currentData: [],
        totalNum: 0,
        nowPage: 1,
        addCodeVisible: false,
        changeCodeVisible: false,
        options: [],
        addForm: {
          dtlCode: [],
          dtlAddCode: []
        },
        changeForm: {
          dtlName: '',
          dtlNumber: '',
          dtlCode: []
        }
      }
    },
    watch: {
      'dataToChild' : function () {
        console.log(this.dataToChild)
        this.getList()
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      dateFormat,
      deleteCode(row) {
        financeDtlDelete(
          {
            id: row.id
          }
        ).then((res) => {
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getList()
          }/* else {
            this.$message.error(res.message);
          }*/
        })
      },
      saveChange() {
        financeDtlModify(
          {
            cid: this.dataToChild.id,
            id: this.changeForm.dtlNumber,
            finaceItemCode: this.changeForm.dtlCode[this.changeForm.dtlCode.length - 1],
          }
        ).then((res) => {
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.changeCodeVisible = false;
            this.getList()
          } /*else {
            this.$message.error(res.message);
          }*/
        })
      },
      changeCode(row) {
        console.log(row)
        this.changeCodeVisible = true;
        this.changeForm.dtlNumber = row.id;
        financeDtlGet(
          {
            id: row.id
          }
        ).then((res) => {
          console.log(res)
          this.options = deleteNullAttr(res.financeItemInfos.financeItems);
          this.changeForm.dtlCode = res.financeItemInfos.financeItemPerious.reverse()
        })
      },
      saveAdd() {
        financeDtlAdd(
          {
            cid: this.dataToChild.id,
            finaceItemCode: this.addForm.dtlCode[this.addForm.dtlCode.length - 1]
          }
        ).then((res) => {
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.addCodeVisible = false;
            this.getList()
          } /*else {
            this.$message.error(res.message);
          }*/
        })
      },
      addCode() {
        this.addCodeVisible = true;
        this.addForm = {
          dtlCode: [],
          dtlAddCode: []
        }
        financeDtlCodeList({}).then((res) => {
          console.log(res)
          this.addForm.dtlAddCode = deleteNullAttr(res.financeItems)
        })
      },
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      getList(index = 1) {
        console.log(this.dataToChild)
        financeDtlList(
          {
            page: index,
            rows: 10,
            cid: this.dataToChild.id
          }
        ).then((res) => {
          console.log(res)
          this.currentData = res.statisticsDetailList.list;
          this.totalNum = res.statisticsDetailList.total;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-list {
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .list-table {
      margin-bottom: 10px;
    }
  }
</style>
