<template>
  <el-row class="depart-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          v-model="searchName"
          placeholder="名称"
        >
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select
          style="width: 100%;"
          v-model="searchType"
          placeholder="类型"
        >
          <el-option
            v-for="item in departmentTypeArr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-button @click="getList()" type="info" icon="search">搜索</el-button>
        <el-button @click="addAuth()" type="info" icon="plus">新增</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <h3>部门信息列表</h3>
      <el-row>
        <span
          class="selectNav"
          v-for="item in navArray"
          :parentId="item.parentId"
          @click="navSelect"
        >
          {{ item.name }}
        </span>
      </el-row>
      <el-col :lg="12" :md="24">
        <el-table
          class="list-table"
          :data="currentList"
          highlight-current-row
          @row-click="selectDepart"
          border
          style="width: 100%">
          <el-table-column
            label="名称"
            label-class-name="table-header-bold"
            header-align="center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            label-class-name="table-header-bold"
            header-align="center">
            <template scope="scope">
              <span style="margin-left: 10px">{{ departType(scope.row.departmentType) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            label-class-name="table-header-bold"
            align="center"
            width="200">
            <template scope="scope">
              <el-button size="small" type="primary" @click="changeAuthName(scope.row)">修改名称</el-button>
              <el-button size="small" type="danger" @click="deleteAuth(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page.sync="departmentPageNum"
            layout="prev, pager, next"
            @current-change="handlePageChange"
            :total="departmentListTotal">
          </el-pagination>
        </el-row>
      </el-col>
      <el-col :lg="12" :md="24" v-show="addAuthState || changeAuthState">
        <el-card>
          <h3>{{ addAuthState ? '添加部门' : '修改部门' }}</h3>
          <el-form
            :model="ruleForm"
            :rules="formRules"
            ref="ruleForm"
          >
            <el-row>
              <el-col :span="6">
                <el-card v-show="addAuthState">
                  上级部门: {{ this.parentDepartName }}
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item prop="departName" label="部门名称:">
                  <el-input
                    v-model="ruleForm.departName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="departType" label="部门类型:">
                  <el-select
                    v-model="ruleForm.departType"
                  >
                    <el-option
                      v-for="item in departmentTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-button
                type="info"
                @click="cacelAddAuth"
              >
                取消
              </el-button>
              <el-button
                type="success"
                @click="submitForm()"
              >
                保存
              </el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import {authDepartment, authDepartmentType, authDepartmentPath} from '@/api/api.js'
  import {departParamsRule} from '@/common/formRules.js'
  import {splitArray} from '@/common/util.js'
  import Bus from '@/eventBus'

  export default {
    data() {
      return {
        listTotalNumber: 0,
        roleAuthListTotalNumber: 0,
        departmentPageNum: 1,
        departmentListTotal: 0,
        currentList: null,
        addAuthState: false,
        changeAuthState: false,
        departmentTypeArr: [],
        searchName: '',
        searchType: '',
        parentId: null,
        parentDepartName: "",
        navArray: [
          {
            parentId: '',
            name: '所有'
          }
        ],
        ruleForm: {
          departName: '',
          departType: '',
          id: ''
        },
        formRules: departParamsRule
      }
    },
    watch: {
      parentId: function () {
        authDepartmentPath(
          {
            id: this.parentId
          },
          "GET"
        ).then((res) => {
          if (res.data.length) {
            console.log(res.data[res.data.length - 1])
            this.parentDepartName = res.data[res.data.length - 1].name
          }
        })
      }
    },
    computed: {},
    methods: {
      navSelect(event) {
//        this.parentId =
        this.selectDepart({id: event.target.getAttribute('parentId')});
        if(!event.target.getAttribute('parentId')) {
          this.parentDepartName = '';
        }
      },
      selectDepart(row, event, column) {
        if (column && column.label === '操作') {
          event.stopPropagation();
          return false;
        }
        this.parentId = row.id
        authDepartmentPath(
          {
            id: row.id
          },
          "GET"
        ).then((res) => {
          console.log(res)
          this.navArray.length = 1
          res.data.forEach(item => {
            this.navArray.push(
              {
                parentId: item.parentId,
                name: item.name
              }
            )
          })
        })
        this.getList()
      },
      departType(typeId) {
        let result = '缺省';
        this.departmentTypeArr.forEach((item) => {
          if (item.id === typeId) {
            result = item.name
          }
        })
        return result
      },
      changeAuthName(row) {
        this.$refs.ruleForm.resetFields();
        console.log(row)
        this.ruleForm.id = row.id;
        this.addAuthState = false;
        this.changeAuthState = true;
        this.parentId = row.parentId;
        this.ruleForm.departName = row.name
        this.ruleForm.departType = row.departmentType
      },
      addAuth() {
        this.$refs.ruleForm.resetFields();
        this.changeAuthState = false;
        this.addAuthState = true;
      },
      deleteAuth(row) {
        authDepartment(
          {
            id: row.id
          },
          "DELETE"
        ).then((res) => {
          if (res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '删除部门成功'
            });
            this.departmentPageNum = 1;
            this.getList()
          } else {
            this.$message.error(res.message);
          }
        })
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
                name: this.ruleForm.departName,
                departmentType: this.ruleForm.departType,
                parentId: this.parentId
              } :
              {
                id: this.ruleForm.id,
                name: this.ruleForm.departName,
                departmentType: this.ruleForm.departType
              }
            console.log(params)
            this.$confirm('是否确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              authDepartment(
                params,
                method
              ).then((res) => {
                if (res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: this.addAuthState ? '添加部门成功!' : '修改部门成功'
                  });
                  if (!this.addAuthState) {
                    this.cacelAddAuth()
                  }
                  this.$refs.ruleForm.resetFields();
                  this.departmentPageNum = 1;
                  this.getList()
                } else {
                  this.$message.error(res.message);
                }
              });
            }).catch(() => {
              this.$message.info('已取消')
            })
          } else {
            this.$message.error('请填写正确的部门参数！');
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
      getList(index = 1) {
        authDepartment(
          {
            page: index,
            size: 10,
            type: 'sub',
            sortBy: 'name',
            sortOrder: 'asc',
            parentId: this.parentId,
            name: this.searchName,
            departmentType: this.searchType
          },
          'GET'
        ).then((res) => {
          console.log(res)
          this.departmentListTotal = res.total;
          this.currentList = res.data;
          this.departmentPageNum = res.pageNum
          console.log(this.departmentTypeArr)
        })
      }
    },
    created() {
      Bus.$on('authListReload', () => {
        this.getList(1)
      })
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getList()
      authDepartmentType(
        {},
        'GET'
      ).then((authDepartmentTypeRes) => {
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

<style lang="scss" scoped>
  .depart-list {
    .selectNav {
      &:first-child {
        margin-left: 10px;
      }
      cursor: pointer;
      &::after {
        content: '/';
      }
      &:last-child {
        &::after {
          content: '';
        }
      }
    }
    .el-row {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
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
