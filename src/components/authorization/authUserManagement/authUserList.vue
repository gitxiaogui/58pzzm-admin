<template>
  <el-row class="authUserList">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input
            placeholder="姓名"
            v-model="searchName"
          ></el-input>
        </el-col>
        <el-col :span="16">
          <el-button icon="search" @click="getList()" type="info">搜索</el-button>
          <el-button icon="plus" @click="addNewUser()" type="info">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="userListData"
          class="user-table"
          highlight-current-row
          border
          style="width: 100%"
        >
          <el-table-column
            label="姓名"
            label-class-name="table-header-bold"
            header-align="center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.realName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="登录名"
            label-class-name="table-header-bold"
            header-align="center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.loginName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            label-class-name="table-header-bold"
            align="center"
            width="300">
            <template scope="scope">
              <el-button @click="changeUserDetail(scope.row)" size="mini" type="warning">修改</el-button>
              <el-button @click="resetPassword(scope.row)" size="mini" type="info">重置密码</el-button>
              <el-button @click="changeUserDuty(scope.row)" size="mini" type="success">职能</el-button>
              <el-button @click="deleteUser(scope.row)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="center">
        <el-pagination
          :current-page.sync="pagination"
          layout="prev, pager, next"
          @current-change="handleUserListPageChange"
          :total="userListTotal">
        </el-pagination>
      </el-row>
    </el-card>
    <el-dialog size="tiny" :close-on-click-modal="true" :modal-append-to-body="false" :title="`重置密码`" :visible.sync="resetPasswordVisible">
      <div class="caseDetail" v-if="currentUser">
        <el-row>
          <h3>用户:{{ currentUser.realName }}</h3>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="resetPasswordData.password"
              type="password"
              placeholder="密码"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="resetPasswordData.confirm"
              type="password"
              placeholder="再次输入密码"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="success" @click="saveResetPassword">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog size="tiny" :close-on-click-modal="true" :modal-append-to-body="false" :title="`修改职能`" v-if="changeUserDutyVisible" :visible.sync="changeUserDutyVisible">
      <div class="caseDetail" v-if="currentUser">
        <el-row>
          <h3>用户:{{ currentUser.realName }}</h3>
        </el-row>
        <departmentSelect parentVUE="changeDuty" :currentUser="currentUser"></departmentSelect>
      </div>
    </el-dialog>
    <el-dialog size="tiny" :close-on-click-modal="true" :modal-append-to-body="false" :title="changeUserDetailVisible ? `修改用户` : `新增用户`" v-if="addNewUserVisible || changeUserDetailVisible" :visible.sync="changeOrAddUserVisible">
      <div v-if="departmentSelectShow" class="modal">
      </div>
      <div class="caseDetail" v-if="currentUser || addNewUserVisible">
        <el-row>
          <h3 v-if="changeUserDetailVisible">用户:{{ currentUser.realName }}</h3>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
              <el-row>
                <el-col :span="12">
                  <el-input
                    v-model="changeUserDetailForm.realName"
                    placeholder="姓名"
                  ></el-input>
                </el-col>
              </el-row>
              <div class="addNewUserFormItem" v-if="addNewUserVisible">
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="changeUserDetailForm.loginName"
                      placeholder="用户名"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="changeUserDetailForm.password"
                      type="password"
                      placeholder="密码"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-select v-model="orgId" placeholder="请选择机构">
                      <el-option v-for="(item,index) in orgList" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-select v-model="ptCode" placeholder="请选择平台">
                      <el-option v-for="(item,index) in diversionList" :key="item.id" :label="item.platName" :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="changeUserDetailForm.confirmPassword"
                      type="password"
                      placeholder="确认密码"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col>
                  <h4>角色:</h4>
                  <el-checkbox-group
                    v-model="changeUserDetailForm.roles">
                    <el-checkbox v-for="item in changeUserDetailForm.totalRoles" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <h4>部门:</h4>
                  <el-input
                    placeholder="选择部门"
                    class="departmentInput"
                    @focus="handleSelectDepartment"
                    v-model="changeUserDetailForm.departName"
                    :readonly="true"
                  ></el-input>
                </el-col>
              </el-row>
          </el-col>
          <div class="departmentSelectWindow" v-if="departmentSelectShow">
            <departmentSelect class="innerApart" parentVUE="changeDetail" :currentUser="currentUser"></departmentSelect>
          </div>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button v-if="changeUserDetailVisible" @click="saveUserDetail()" type="success">保存</el-button>
            <el-button v-if="addNewUserVisible" @click="saveAddNewUser()" type="success">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import departmentSelect from './departmentSelect.vue'
  import { authAdminUser, authAdminUserReset, authAdminUserIds, authRole } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    components: {
      departmentSelect
    },
    data() {
      return {
        diversionList:[],
        orgId:'',
        ptCode:'',
        searchName: '',
        department: '',
        departmentName: '',
        pagination: 1,
        userListData: [],
        userListTotal: 0,
        departmentSelectShow: false,
        changeDepartmentVisible: false,
        resetPasswordVisible: false,
        changeUserDutyVisible: false,
        changeUserDetailVisible: false,
        addNewUserVisible: false,
        changeOrAddUserVisible: false,
        addUserVisible: false,
        resetPasswordData: {
          password: '',
          confirm: ''
        },
        changeUserDetailForm: {
          totalRoles: [],
          realName: '',
          loginName: '',
          roles: [],
          departId: '',
          departName: '',
          password: '',
          confirmPassword: '',
        },
        currentUser: null,
        orgList:[],
      }
    },
    watch: {
      changeOrAddUserVisible: function () {
        this.departmentSelectShow = false
      }
    },
    activated() {
      this.searchName = '';
      this.pagination = 1;
      this.department = ''
      this.getList()
      this.getOrgList()
      this.getPlatList()
    },
    created() {
      Bus.$on("authUserList-reload", (row)=>{
        console.log(row)
        this.department = row.id;
        this.departmentName = row.name;
        this.getList(1)
      })
      Bus.$on("departmentSelect-authUserList-confirmDepart", (department)=>{
        this.changeUserDetailForm.departName = department.name;
        this.changeUserDetailForm.departId = department.id;
        this.departmentSelectShow = false;
      })
    },
    methods: {
      handleSelectDepartment() {
        this.departmentSelectShow = true;
      },
      //新增人员
      saveAddNewUser() {
        authAdminUser(
          {
            departId: this.changeUserDetailForm.departId,
            loginName: this.changeUserDetailForm.loginName,
            password: this.changeUserDetailForm.password,
            realName: this.changeUserDetailForm.realName,
            repeat: this.changeUserDetailForm.confirmPassword,
            roles: this.changeUserDetailForm.roles,
            orgId: this.orgId,
            ptCode:this.ptCode
          },
          "POST"
        ).then((res)=>{
          console.log('添加新用户',res)
          if(res.code == '00000000'){
            this.addNewUserVisible = false;
            this.changeOrAddUserVisible = false;
            this.$message.success('添加用户成功！');
            this.getList()
          }

        })
      },
      addNewUser() {
        this.changeUserDetailForm = {
          totalRoles: [],
          realName: '',
          loginName: '',
          roles: [],
          departId: this.department,
          departName: this.departmentName,
          password: '',
          confirmPassword: ''
        }
        this.changeUserDetailVisible = false;
        this.addNewUserVisible = true;
        this.changeOrAddUserVisible = true;
        authRole({
          page:1,size:1000
        }, "GET").then((authRoleRes)=> {
          console.log(authRoleRes)
          authRoleRes.data.forEach((item) => {
            this.changeUserDetailForm.totalRoles.push(item)
          })
        })
      },
      saveUserDetail() {
        authAdminUser(
          {
            departId: this.changeUserDetailForm.departId,
            id: this.currentUser.id,
            realName: this.changeUserDetailForm.realName,
            roles: this.changeUserDetailForm.roles
          },
          "PUT"
        ).then((res)=>{
          this.changeUserDetailVisible = false;
          this.changeOrAddUserVisible = false;
          this.$message({
            type: 'success',
            message: '修改用户成功！'
          });
          this.getList()
        })
      },
      changeDepartment() {
        this.changeDepartmentVisible = true;
      },
      changeUserDetail(row) {
        this.changeUserDetailForm = {
          loginName: '',
          totalRoles: [],
          realName: '',
          roles: [],
          departId: '',
          departName: '',
          password: '',
          confirmPassword: ''
        }
        this.addNewUserVisible = false;
        this.changeOrAddUserVisible = true;
        this.changeDepartmentVisible = false;
        this.currentUser = row;
        this.changeOrAddUserVisible = true
        this.changeUserDetailVisible = true
        authRole({page:1,size:100}, "GET").then((authRoleRes)=>{
          console.log(authRoleRes)
          authRoleRes.data.forEach((item)=>{
            this.changeUserDetailForm.totalRoles.push(item)
          })
          authAdminUserIds(
            {
              id: this.currentUser.id
            },
            "GET"
          ).then((authAdminUserIdsRes) => {
            console.log(authAdminUserIdsRes)
            this.changeUserDetailForm.departName = authAdminUserIdsRes.data[0].departName
            this.changeUserDetailForm.realName = authAdminUserIdsRes.data[0].realName
            authAdminUserIdsRes.data[0].roles.forEach((item)=>{
              this.changeUserDetailForm.roles.push(item.roleId)
            })
          })
        })

      },
      changeUserDuty(row) {
        this.currentUser = row;
        this.changeUserDutyVisible = true
      },
      saveResetPassword() {
        authAdminUserReset(
          {
            id: this.currentUser.id,
            password: this.resetPasswordData.password,
            repeat: this.resetPasswordData.confirm
          },
          "PUT"
        ).then((res)=>{
          this.resetPasswordVisible = false;
          this.$message({
            type: 'success',
            message: '重置密码成功！'
          });
        })
      },
      resetPassword(row) {
        this.currentUser = row;
        this.resetPasswordData = {
          password: '',
          confirm: ''
        };
        this.resetPasswordVisible = true
      },
      deleteUser(row) {
        this.currentUser = row;
        authAdminUser(
          {
            id: this.currentUser.id
          },
          "DELETE"
        ).then((res)=>{
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '删除用户成功！'
            });
            this.getList()
          }
        })
      },
      handleUserListPageChange(pageNum) {
        this.getList(pageNum)
      },
        //获取机构列表
        getOrgList(index=0){
            this.httpRequest.getOrgList({
                row:10000,
                page:index,
                linkman:'',
                orgName:'',
                phone:'',
            }).then((res)=>{
                console.log('机构列表',res)
                if(res.code == '00000000'){
                    this.orgList = res.data
                }
            })
        },
      getList(index = 1) {
        authAdminUser(
          {
            page: index,
            size: 10,
            type: 'curr',
            department: this.department,
            name: this.searchName,
            sortBy: 'realName',
            sortOrder: 'asc'
          },
          "GET"
        ).then((res)=>{
          this.pagination = index;
          this.userListTotal = res.total
          this.userListData = res.data
        })
      },
      getPlatList(){
		this.httpRequest.getPlatformList({
		  page: 1,
		  row: 100,
		  beginTime: '',
		  endTime: '',
		  platName:'',
		}).then((res) =>{
		  console.log('获取平台列表========', res)
		  if (res.code === '00000000') {
			this.diversionList = res.data.list
		  }
		})
	  }
    }
  }
</script>

<style lang="scss">
  .authUserList {
    .departmentSelectWindow {
      position: absolute;
      z-index: 21;
      width: 90%;
    }
    .modal {
      position: absolute;
      z-index: 20;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
    }
    .el-checkbox-group {
      margin-bottom: -10px;
      .el-checkbox {
        margin-left: 0px;
        margin-right: 15px;
        margin-bottom: 10px;
      }
    }
    .departmentInput {
      .el-input__inner {
        cursor: pointer;
      }
    }
    .el-row {
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
</style>
