<template>
  <el-row class="auth-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="searchName" placeholder="名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input  v-model="searchCode" placeholder="编码"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button @click="getList()" type="info" icon="search">搜索</el-button>
        <el-button @click="addAuth()" type="info" icon="plus">新增</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <h3>权限信息列表</h3>
      <el-col :md="{span: 24}" :lg="12">
        <el-table
          class="list-table"
          :data="currentList"
          highlight-current-row
          @row-click="caseDetail"
          border
          style="width: 100%">
          <el-table-column
            label="名称"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编码"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" label-class-name="table-header-bold" width="250">
            <template scope="scope">
              <!--<el-button size="small" type="warning" @click="changeAuth(scope.row)">修改</el-button>-->
              <el-button size="small" type="danger" @click="deleteAuth(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="handlePageChange"
            :current-page.sync="pageNum"
            layout="prev, pager, next"
            :total="listTotalNumber">
          </el-pagination>
        </el-row>
      </el-col>
      <el-col :lg="12" :md="{span: 24}" v-show="addAuthState || changeAuthState">
        <el-card>
          <h3>{{ addAuthState ? '添加权限' : '修改权限' }}</h3>
          <el-form
            :model="ruleForm"
            :rules="formRules"
            ref="ruleForm"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item prop="authName" label="权限名称:">
                  <el-input
                    v-model="ruleForm.authName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="authCode" label="权限编码:">
                  <el-input
                    v-model="ruleForm.authCode"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-button
                type="info"
                icon="close"
                @click="cacelAddAuth"
              >
                取消
              </el-button>
              <el-button
                type="success"
                icon="check"
                @click="submitForm()"
              >
                保存
              </el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="权限详情"
               :visible.sync="caseDetailVisible">
      <div class="caseDetail" v-if="currentDetail">
        <p>权限id：{{ currentDetail.id }}</p>
        <p>权限名称：{{ currentDetail.name }}</p>
        <p>权限编码：{{ currentDetail.code }}</p>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import {authPermission} from '@/api/api.js'
  import {authParamsRule} from '@/common/formRules.js'
  import Bus from '@/eventBus'

  export default {
    data() {
      return {
        listTotalNumber: 0,
        pageNum: 1,
        currentList: null,
        caseDetailVisible: false,
        currentDetail: null,
        addAuthState: false,
        changeAuthState: false,
        searchName: '',
        searchCode: '',
        ruleForm: {
          authName: '',
          authCode: '',
          authId: ''
        },
        formRules: authParamsRule
      }
    },
    activated() {
      this.searchName = ''
      this.searchCode = ''
      this.pageNum = 1
      this.getList()
    },
    methods: {
      addAuth() {
        this.$refs.ruleForm.resetFields();
        this.changeAuthState = false;
        this.addAuthState = true;
      },
      cacelAddAuth() {
        this.addAuthState = false;
        this.changeAuthState = false;
        this.$refs.ruleForm.resetFields();
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let method = this.addAuthState ? 'POST' : 'PUT'
            let params = this.addAuthState ?
              {
                name: this.ruleForm.authName,
                code: this.ruleForm.authCode
              } :
              {
                id: this.ruleForm.authId,
                name: this.ruleForm.authName,
                code: this.ruleForm.authCode
              }
            this.$confirm('是否确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              authPermission(
                params,
                method
              ).then((res) => {
                if (res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: this.addAuthState ? '添加权限成功!' : '修改权限成功'
                  });
                  this.cacelAddAuth()
                  this.$refs.ruleForm.resetFields();
                  this.getList(1)
                  this.pageNum = 1
                } else {
                  this.$message.error(res.message);
                }
              });
            }).catch(() => {
              this.$message.info('已取消')
            })
          } else {
            this.$message.error('请填写正确的权限参数！');
            return false;
          }
        });
      },
      //分页
      handlePageChange(pageNum) {
//        this.pageNum++;
        this.getList(pageNum);
      },
      //获取列表
      getList(index = this.pageNum) {
        console.log(index)
        authPermission(
          {
            page: index,
            size: 10,
            type: 'sub',
            name: this.searchName,
            code: this.searchCode,
            sortBy: 'name',
            sortOrder: 'asc',
          },
          'GET'
        ).then((res) => {
          console.log(res)
          this.listTotalNumber = res.total;
          this.currentList = res.data;
        });
      },
      //展示弹出框
      caseDetail(row, event, column) {
        if (column.label === '操作') {
          event.stopPropagation();
          return false;
        }
        this.caseDetailVisible = true;
        this.currentDetail = row;
      },
      changeAuth(row) {
        this.$refs.ruleForm.resetFields();
        this.ruleForm.authId = row.id;
        this.addAuthState = false;
        this.changeAuthState = true;
        this.ruleForm.authName = row.name
        this.ruleForm.authCode = row.code
      },
      deleteAuth(row) {
        authPermission(
          {
            id: row.id
          },
          'DELETE'
        ).then((res) => {
          if (res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '删除权限成功！'
            });
            this.$refs.ruleForm.resetFields();
            this.getList()
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    computed: {},
    mounted() {
      this.getList()
    },
    created() {
      Bus.$on('authListReload', () => {
        this.getList(1)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .auth-list {
    .el-row {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .list-table {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .el-dialog {
      p {
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
</style>
