<template>
  <el-row class="statistics-list">
    <el-row>
      <el-col :span="6">
        <el-button icon="plus" type="info" @click="addCode()">新增统计</el-button>
      </el-col>
    </el-row>
    <el-table
      class="list-table"
      :data="currentData"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        label="统计编号">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="统计名称">
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
              type="info"
              @click="openColumnCode(scope.row)">统计列</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="changeItemName(scope.row)">修改</el-button>
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
    <el-dialog size="small" :close-on-click-modal="true" v-if="addCodeVisible" :modal-append-to-body="false" title="新增统计" :visible.sync="addCodeVisible">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            v-model="addForm.stcsNumber"
            placeholder="统计编号"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="addForm.stcsName"
            placeholder="统计名称"
          ></el-input>
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
    <el-dialog size="small" :close-on-click-modal="true" v-if="changeCodeVisible" :modal-append-to-body="false" title="修改统计" :visible.sync="changeCodeVisible">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            v-model="changeForm.stcsNumber"
            placeholder="统计编号"
            disabled
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="changeForm.stcsName"
            placeholder="统计名称"
          ></el-input>
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
  import { dateFormat } from '@/common/util.js'
  import { financeStcsList, financeStcsAdd, financeStcsModify, financeStcsDelete, collectAbatement } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        addCodeVisible: false,
        changeCodeVisible: false,
        currentData: [],
        totalNum: 0,
        nowPage: 1,
        addForm: {
          stcsNumber: '',
          stcsName: ''
        },
        changeForm: {
          stcsNumber: '',
          stcsName: ''
        }
      }
    },
    methods: {
      dateFormat,
      openColumnCode(row) {
        Bus.$emit('financeCodeMain',
          {
            data: row,
            level: 1
          }
        )
      },
      deleteCode(row) {
        financeStcsDelete(
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
          } /*else {
            this.$message.error(res.message);
          }*/
        })
      },
      saveChange() {
        financeStcsModify(
          {
            id: this.changeForm.stcsNumber,
            name: this.changeForm.stcsName
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
      changeItemName(row) {
        this.changeCodeVisible = true
        this.changeForm.stcsNumber = row.id;
        this.changeForm.stcsName = row.name;
      },
      saveAdd() {
        financeStcsAdd(
          {
            id: this.addForm.stcsNumber,
            name: this.addForm.stcsName
          }
        ).then((res)=> {
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
        this.addCodeVisible = true
        this.addForm = {
          stcsNumber: '',
          stcsName: ''
        }
      },
      handlePageChange(pageNum) {

      },
      getList(index = 1) {
        console.log(this.$route)
        financeStcsList(
          {
            page: index,
            rows: 10
          }
        ).then((res) => {
          console.log(res)
          this.currentData = res.statisticsList.list
          this.totalNum = res.statisticsList.total
        })
        collectAbatement(
          {
            page: 1,
            size: 10
          },
          'GET'
        ).then((res) => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .statistics-list {
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
