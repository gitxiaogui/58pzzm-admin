<template>
  <el-row class="top-list">
    <el-row ><!--v-if="checkPermission('200001002')"-->
      <el-col :span="6">
        <el-button icon="plus" type="info" @click="addTopCode()">新增财务科目编号</el-button>
      </el-col>
    </el-row>
    <el-table
      class="list-table"
      :data="currentData"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        label="名称"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.itemName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="finaceItemCode"
        label="财务科目编号"
        label-class-name="table-header-bold"
        header-align="center">
      </el-table-column>
      <el-table-column
        label="更新时间"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.updateTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        label-class-name="table-header-bold"
        align="center">
        <template scope="scope"><!-- v-if="checkPermission('200001003')"-->
          <el-col>
            <el-button
              size="mini"
              type="warning"
              @click="changeItemName(scope.row)">修改</el-button>
            <el-button
              v-if="checkPermission('200001003')"
              size="mini"
              :type="`${ scope.row.isPublish ? 'danger' : 'success' }`"
              @click="itemOnOrOff(scope.row)">{{ scope.row.isPublish ? '下架' : '上架' }}</el-button>
            <el-button
              size="mini"
              type="info"
              @click="openChildCode(scope.row)">子科目</el-button><!--v-if="checkPermission('200001004')"-->
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
    <el-dialog size="small" :close-on-click-modal="true" v-if="changeNameVisible" :modal-append-to-body="false" title="修改名称" :visible.sync="changeNameVisible">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            ref="changeNameValue"
            :value="currentItem.itemName"
            placeholder="名称"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button
            type="success"
            @click="saveChangeName()"
          >保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="openChildCodeVisible" :modal-append-to-body="false" :title="`${currentItem.itemName} 子科目`" :visible.sync="openChildCodeVisible">
      <subList :dataToChild="currentItem"></subList>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="configCodeVisible" :modal-append-to-body="false" title="配置财务科目" :visible.sync="configCodeVisible">
      <configCode :dataToChild="currentItem"></configCode>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="addTopCodeVisible" :modal-append-to-body="false" title="新增顶级财务科目编号" :visible.sync="addTopCodeVisible">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            v-model="addTopForm.finaceItemCode"
            placeholder="财务科目编号"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="addTopForm.itemName"
            placeholder="科目名称"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button @click="saveAddTopCode()" type="success">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import { dateFormat } from '@/common/util.js'
  import { financeCodeTopList, financeCodeChangeName, financeCodeAddTop, financeCodeOnOrOff, financeCodeDelete } from '@/api/api'
  import Bus from '@/eventBus'
  import subList from './subList.vue'
  import configCode from './configCode.vue'
  export default {
    components: {
      subList,
      configCode
    },
    data() {
      return {
        currentData: [],
        totalNum: 0,
        nowPage: 1,
        changeNameVisible: false,
        openChildCodeVisible: false,
        configCodeVisible: false,
        addTopCodeVisible: false,
        currentItem: null,
        addTopForm: {
          finaceItemCode: '',
          itemName: ''
        }
      }
    },
    created() {
      Bus.$on('topList-dialog-close', () => {
        this.changeNameVisible = false;
        this.openChildCodeVisible = false;
        this.configCodeVisible = false;
        this.addTopCodeVisible = false;
        this.getList()
      })
    },
    methods: {
      deleteCode(row) {
        financeCodeDelete({
          topCode: row.finaceItemCode,
          finaceItemCode: row.finaceItemCode
        }).then((res) => {
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: `删除成功！`
            });
            this.getList()
          }/* else {
            this.$message.error(res.message);
          }*/
        })
      },
      itemOnOrOff(row) {
        let type = row.isPublish ? 'off' : 'on'
        let toDo = '上'
        if( row.isPublish ){
          toDo = '下'
        }
        this.$confirm('是否确认'+ toDo +'架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(type === 'on') {
            this.$confirm('一旦上架不能下架，确认上架?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              financeCodeOnOrOff(
                {
                  finaceItemCode: row.finaceItemCode
                },
                type
              ).then((res) => {
                if(res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: `${type === 'off' ? '下架' :  '上架'}成功！`
                  });
                  this.getList()
                } /*else {
                  this.$message.error(res.message);
                }*/
              })
            }).catch(() => {
              return;
            })
          } else {
            financeCodeOnOrOff(
              {
                finaceItemCode: row.finaceItemCode
              },
              type
            ).then((res) => {
              if(res.code === '00000000') {
                this.$message({
                  type: 'success',
                  message: `${type === 'off' ? '下架' :  '上架'}成功！`
                });
                this.getList()
              } /*else {
                this.$message.error(res.message);
              }*/
            })
          }
        }).catch(() => {
          this.$message.info('已取消')
        })
      },
      saveAddTopCode() {
        financeCodeAddTop(
          {
            topCode: '',
            finaceItemCode: this.addTopForm.finaceItemCode,
            itemName: this.addTopForm.itemName
          }
        ).then((res) => {
          console.log(res)
          if(res.code === '00000000') {
            this.addTopCodeVisible = false;
            this.$message({
              type: 'success',
              message: '添加成功！'
            });
            this.getList()
          }/* else {
            this.$message.error(res.message);
          }*/
        })
      },
      addTopCode() {
        this.addTopCodeVisible = true
        this.addTopForm.finaceItemCode = ''
        this.addTopForm.itemName = ''
      },
      configCode(row) {
        this.currentItem = row;
        this.configCodeVisible = true;
      },
      openChildCode(row) {
        this.currentItem = row;
        this.openChildCodeVisible = true;
      },
      saveChangeName() {
//        console.log(this.$refs.changeNameValue.$el.children[0].value)
        financeCodeChangeName(
          {
            topCode: this.currentItem.finaceItemCode,
            finaceItemCode: this.currentItem.finaceItemCode,
            itemName: this.$refs.changeNameValue.$el.children[0].value
          }
        ).then((res)=>{
          if(res.code === '00000000') {
            this.changeNameVisible = false;
            this.$message({
              type: 'success',
              message: '修改成功！'
            });
            this.getList()
          } /*else {
            this.$message.error(res.message);
          }*/
        })
      },
      changeItemName(row) {
        console.log(row)
        this.currentItem = row;
        this.changeNameVisible = true
      },
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      getList(index = 1) {
        financeCodeTopList(
          {
            page: index,
            rows: 10,
            finaceItemCode: '',
            itemName: '',
            pCode: ''
          }
        ).then((res)=>{
          console.log(res)
          this.currentData = res.financeltemlnfoList.list
          this.totalNum = res.financeltemlnfoList.total
          this.nowPage = res.financeltemlnfoList.pageNum;
        })
      },
      dateFormat
    },
    activated() {
      this.getList(1)
    },
    mounted() {
      this.getList(1)
    }
  }
</script>

<style lang="scss" scoped>
  .top-list{
    .el-row {
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .list-table {
      margin-bottom: 10px;
    }
  }
</style>
