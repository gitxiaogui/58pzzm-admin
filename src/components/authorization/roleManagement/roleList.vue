<template>
  <el-row class="role-list">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input
                v-model="searchName"
                placeholder="名称"
        >
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button @click="getList()" type="info" icon="search">搜索</el-button>
        <el-button @click="addAuth()" type="info" icon="plus">新增</el-button>
      </el-col>
    </el-row>
    <h3>角色信息列表</h3>
    <el-row :gutter="10">
      <el-col :lg="12" :md="24">
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
          <el-table-column label="操作" align="center" label-class-name="table-header-bold" width="300">
            <template scope="scope">
              <el-button size="small" type="info" @click="changeAuthName(scope.row)">修改名称</el-button>
              <el-button size="small" type="warning" @click="changeRoleAuth(scope.row)">修改权限</el-button>
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
      <el-col :md="24" :lg="12">
        <el-row v-show="addAuthState || changeAuthState">
          <el-card>
            <h3>{{ addAuthState ? '添加角色' : '修改角色' }}</h3>
            <el-form
              :model="ruleForm"
              :rules="formRules"
              ref="ruleForm"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item prop="roleName" label="角色名称:">
                    <el-input
                      v-model="ruleForm.roleName"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-button
                  icon="close"
                  type="info"
                  @click="cacelAddAuth"
                >
                  取消
                </el-button>
                <el-button
                  icon="check"
                  type="success"
                  @click="submitForm()"
                >
                  保存
                </el-button>
              </el-row>
            </el-form>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="角色详情" :visible.sync="caseDetailVisible">
      <div class="caseDetail" v-if="currentDetail">
        <p>角色id：{{ currentDetail.id }}</p>
        <p>角色名称：{{ currentDetail.name }}</p>
      </div>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="changeRoleAuthVisible" :modal-append-to-body="false" :title="`修改${currentRoleAuth.name}权限`" :visible.sync="changeRoleAuthVisible">
      <div class="caseDetail" v-if="currentRoleAuth">
        <el-form
          :model="authForm"
          :rules="authFormRules"
          ref="authForm"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item prop="authName">
                <el-input
                  v-model="authForm.authName"
                  placeholder="权限名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="authCode">
                <el-input
                  v-model="authForm.authCode"
                  placeholder="权限编码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button @click="getRoleAuthList()" type="info" icon="search">搜索</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button @click="saveRoleAuth()" icon="check" type="success">保存</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :data="currentRoleAuthData"
              border
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}"
            >
              <el-table-column
                prop="isCheck"
                label="有无权限"
                width="90px"
              >
                <template scope="scope">
                  <el-checkbox v-model="scope.row.isCheck"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                sortable>
              </el-table-column>
              <el-table-column
                prop="code"
                label="编码"
                sortable>
              </el-table-column>
              <el-table-column
                prop="departType"
                label="部门类型">
                <template scope="scope">
                  <el-select v-model="scope.row.departType" placeholder="请选择">
                    <el-option
                      v-for="item in departmentTypeArr"
                      :key="item.code"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="range"
                label="范围">
                <template scope="scope">
                  <el-select v-model="scope.row.range" placeholder="请选择">
                    <el-option
                      v-for="item in rangeTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" justify="center">
            <el-pagination
              :current-page.sync="pagination"
              @current-change="handleRoleAuthPageChange"
              layout="prev, pager, next"
              :total="roleAuthListTotalNumber">
            </el-pagination>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import { authRole, authPermission, authRolePermission, authDepartmentType } from '@/api/api.js'
  import { authRoleParamsRule, authParamsRule } from '@/common/formRules.js'
  import { splitArray } from '@/common/util.js'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        listTotalNumber: 0,
        roleAuthListTotalNumber: 0,
        pageNum: 1,
        pagination: 1,
        roleAuthPageNum: 1,
        currentList: null,
        currentDetail: null,
        currentRoleAuth: null,
        addAuthState: false,
        changeAuthState: false,
        searchName: '',
        caseDetailVisible: false,
        changeRoleAuthVisible: false,
        roleAuthData: [],
        totalRoleAuthList: [],
        currentRoleAuthData: [],
        ruleForm: {
          roleName: '',
          roleId: ''
        },
        authForm: {
          authName: '',
          authCode: ''
        },
        departmentTypeArr: [
        ],
        rangeTypeArr: [
          {
            id: "",
            name: "缺省"
          },
          {
            id:"SELF",
            name:"本人"
          },
          {
            id:"CURR",
            name:"当前节点"
          },
          {
            id:"DESC",
            name:"以下"
          }
        ],
        formRules: authRoleParamsRule,
        authFormRules: authParamsRule
      }
    },
    activated() {
      this.searchName = '';
      this.pageNum = 1;
      this.getList()
    },
    methods: {
      saveRoleAuth() {
        let requestParams = {};
        requestParams.roleId = this.currentRoleAuth.id
        requestParams.permissions = [];
        //遍历所有权限与当前页比较并改变isCheck，最后遍历到传入参数
        this.totalRoleAuthList.forEach((totalItemArray)=>{
          totalItemArray.forEach((totalItem)=>{
            this.roleAuthData.forEach((pageItemArray)=>{
              pageItemArray.forEach((pageItem)=>{
                if(pageItem.id === totalItem.id){
                  if (pageItem.isCheck) {
                    totalItem.isCheck = true;
                    totalItem.departType = pageItem.departType;
                    totalItem.permissionId = pageItem.id;
                    totalItem.range = pageItem.range;
                  }
                }
              })
            })
            if(totalItem.isCheck) {
              requestParams.permissions.push({
                departType: totalItem.departType,
                permissionId: totalItem.id,
                range: totalItem.range
              })
            }
          })
        })
        authRolePermission(
          requestParams,
          "PUT"
        ).then((res)=>{
          this.$alert('修改成功')
        }).catch((res)=>{
          console.log(res)
        })
      },
      handleRoleAuthPageChange(pageNum) {
        this.currentRoleAuthData = this.roleAuthData[pageNum - 1]
      },
      getRoleAuthList(flag) {
        authPermission(
          {
            page: 1,
            size: 10000,
            type: 'sub',
            name: this.authForm.authName,
            code: this.authForm.authCode,
            sortBy: 'name',
            sortOrder: 'asc',
          },
          'GET'
        ).then((authPermissionRes)=>{
//         console.log(res)
          authRolePermission(
            {
              id: this.currentRoleAuth.id
            },
            'GET'
          ).then((authRolePermissionRes)=>{
            console.log(authRolePermissionRes)
            let newArr = splitArray(this.checkRoleItemPermission(authPermissionRes, authRolePermissionRes), 10)
            if(flag === "FIRST"){
              this.totalRoleAuthList = newArr
            }
            this.roleAuthData = newArr;
            this.handleRoleAuthPageChange(1)
          }).catch((authRolePermissionRes)=>{
            console.log(authRolePermissionRes)
          })
        });
      },
      //处理获取的权限类型与该角色拥有的权限类型做比较处理显示与操作
      checkRoleItemPermission(authPermissionRes, authRolePermissionRes) {
        console.log(authPermissionRes, authRolePermissionRes)
        for (let i = 0; i < authPermissionRes.data.length; i++) {
          let itemAuthPermission = authPermissionRes.data[i];
          if(!authRolePermissionRes.data.length) {
            itemAuthPermission.isCheck = false;
            itemAuthPermission.departType = ''
            itemAuthPermission.range = ''
            itemAuthPermission.range = ''
//            console.log('no')
          }else{
            for (let j = 0; j < authRolePermissionRes.data.length; j++) {
              let itemAuthRolePermission = authRolePermissionRes.data[j];
              if (itemAuthPermission.id === itemAuthRolePermission.permissionId) {
//                console.log(j+'通过')
                itemAuthPermission.isCheck = true;
                itemAuthPermission.departType = itemAuthRolePermission.departType
                itemAuthPermission.range = itemAuthRolePermission.range
                break;
              } else if (j === authRolePermissionRes.data.length - 1) {
//                console.log(j+'不通过')
                itemAuthPermission.isCheck = false;
                itemAuthPermission.departType = ''
                itemAuthPermission.range = ''
              }
            }
          }
        }
//        console.log(authPermissionRes)
        this.roleAuthListTotalNumber = authPermissionRes.total;
//        console.log(authPermissionRes.data)
        return authPermissionRes.data
      },
      changeRoleAuth(row) {
        this.pagination = 1;
        this.changeRoleAuthVisible = true;
        this.authForm.authName = '';
        this.authForm.authCode = '';
        this.currentRoleAuth = row
        this.getRoleAuthList("FIRST")
      },
      changeAuthName(row) {
        this.$refs.ruleForm.resetFields();
        this.ruleForm.roleId = row.id;
        this.addAuthState = false;
        this.changeAuthState = true;
        this.ruleForm.roleName = row.name
      },
      addAuth() {
        this.$refs.ruleForm.resetFields();
        this.changeAuthState = false;
        this.addAuthState = true;
      },
      deleteAuth(row) {
        authRole(
          {
            id: row.id
          },
          'DELETE'
        ).then((res) => {
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '删除角色成功！'
            });
            this.$refs.ruleForm.resetFields();
            this.getList()
          } else {
            this.$message.error(res.message);
          }
        });
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
                name: this.ruleForm.roleName
              } :
              {
                id: this.ruleForm.roleId,
                name: this.ruleForm.roleName
              }
            authRole(
              params,
              method
            ).then((res) => {
              if(res.code === '00000000') {
                this.$message({
                  type: 'success',
                  message: this.addAuthState ? '添加角色成功!' : '修改角色成功'
                });
                this.cacelAddAuth()
                this.$refs.ruleForm.resetFields();
                this.getList(1)
                this.pageNum = 1
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            this.$message.error('请填写正确的权限参数！');
            return false;
          }
        });
      },
      //分页
      handlePageChange(pageNum){
//        this.pageNum++;
        this.getList(pageNum);
      },
      //获取列表
      getList(index = 1){
        console.log(index)
        authRole(
          {
            name: this.searchName,
            page:index,
            size:10,

          },
          'GET'
        ).then((res)=>{
          console.log(res)
          this.listTotalNumber = res.total;
          this.currentList = res.data;
        });
      },
      //展示弹出框
      caseDetail(row, event, column) {
        if(column.label === '操作') {
          event.stopPropagation();
          return false;
        }
        this.caseDetailVisible = true;
        this.currentDetail = row;
      }
    },
    computed: {
    },
    mounted() {
      this.getList()
    },
    created() {
      Bus.$on('authListReload',()=>{
        this.getList(1)
      })
      authDepartmentType(
        {},
        'GET'
      ).then((authDepartmentTypeRes)=>{
        authDepartmentTypeRes.data.unshift({
          code: '',
          id: '',
          name: '缺省'
        })
        this.departmentTypeArr = authDepartmentTypeRes.data
      })
    }
  }
</script>

<style lang="scss">
  .role-list{
    .el-row {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .el-form-item {
      margin-bottom: 5px;
    }
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .caseDetail {
      .el-row{
        margin-bottom: 10px;
      }
    }
    .list-table{
      margin-bottom: 10px;
      cursor: pointer;
    }
    .el-dialog{
      p{
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
</style>
