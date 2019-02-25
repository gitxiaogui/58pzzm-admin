<template>
  <el-row class="departmentSelect">
    <el-card>
      <h3 v-show="parentVUE !== 'changeDuty'">选择部门</h3>
      <el-row  v-if="parentVUE==='changeDuty'">
        <span
          class="selectNav"
          v-for="item in navArray"
          :key="item.name"
          :name="item.name"
          :parentId="item.id"
          @click="navSelect"
          >
          {{ item.name }} /
        </span>
      </el-row>

      <el-row>
        <el-tree
          :data="buttonList"
          accordion
          :highlight-current="true"
          lazy
          :load="loadNode"
          :props="props"
          @node-click="selectDepartment">
        </el-tree>

      </el-row>

      <!-- <el-row v-for="item in buttonList" :key="item.id" v-if="parentVUE==='changeDuty'">
        <el-checkbox :name="item.id" @change="changeDutyCheck" :checked="item.isCheck"></el-checkbox>
        <el-button @click="selectDepartment(item)" type="primary" :loading="dataLoading">{{ item.name }}</el-button>
      </el-row> -->
      <el-row v-if="parentVUE === 'changeDetail'" type="flex" justify="end">
        <el-button @click="confirmDepartment()" type="success">确定</el-button>
      </el-row>
      <el-row v-if="parentVUE==='changeDuty'">
        <el-button @click="saveDuty()" type="success">保存本页</el-button>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
  import { deleteRepeat } from '@/common/util.js'
  import { authDepartment, authDepartmentPath, authAdminUserDuty, authDepartmentIds } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    props: {
      parentVUE: String,
      currentUser: Object
    },
    data(){
      return {
        dataLoading: true,
        parentId: null,
        buttonList: [],
        changeDutyVUE: {
          userHasDuty: []
        },
        navArray: [
          {
            id: '',
            parentId: '',
            name: '所有'
          }
        ],
        props: {
          label: 'name',
          children: 'children'
        },
        count: 1
      }
    },
    activated() {
      this.parentId = null
      this.buttonList = [];
      this.navArray = [
        {
          id: '',
          parentId: '',
          name: '所有'
        }
      ]
      this.getList()
    },
    watch: {
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      confirmDepartment() {
        Bus.$emit("departmentSelect-authUserList-confirmDepart", this.navArray[this.navArray.length - 1])
      },
      saveDuty() {
        authAdminUserDuty(
          {
            departs: this.changeDutyVUE.userHasDuty,
            userId: this.currentUser.id
          },
          "PUT"
        ).then((res)=>{
          this.$message({
            type: 'success',
            message: '保存职能成功!'
          });
        })
      },
      changeDutyCheck(event) {
        let selectId = event.srcElement.name
        if (event.srcElement.checked) {
          //勾选情况下 将本身以及上级加入userHasDuty中
          authDepartmentPath(
            {
              id: selectId
            },
            "GET"
          ).then((res)=>{
            console.log(res)
            res.data.forEach((item)=>{
              this.changeDutyVUE.userHasDuty.push(item.id)
              this.changeDutyVUE.userHasDuty = deleteRepeat(this.changeDutyVUE.userHasDuty);
              console.log(this.changeDutyVUE.userHasDuty)
            })
          })
        } else {
          //取消情况下 将本身以及下级从userHasDuty去除 没有层级关系的api 只能将本身去除
          let index = this.changeDutyVUE.userHasDuty.indexOf(selectId)
          if (index > -1) {
            this.changeDutyVUE.userHasDuty.splice(index, 1)
          }
          console.log(this.changeDutyVUE.userHasDuty)
        }
      },
      navSelect(event) {
        console.log(event)
        this.selectDepart({id: event.target.getAttribute('parentId'),name: event.target.getAttribute('name')});
      },
      selectDepart(row) {
        console.log(row)
        this.parentId = row.parentId
        authDepartmentPath(
          {
            id: row.id
          },
          "GET"
        ).then((res)=>{
          this.navArray.length = 1
          res.data.forEach(item=>{
            this.navArray.push(
              {
                id: item.id,
                parentId: item.parentId,
                name: item.name
              }
            )
          })
        })
        if(this.parentVUE === 'userMain') {
          Bus.$emit("authUserList-reload", row)
        }
        // this.getList()
      },
      selectDepartment(row) {
        this.selectDepart({id: row.currentId, name: row.name});
        this.parentId = row.parentId;
        // this.getList()
      },
      getList(flag) {
        this.dataLoading = true;
        authDepartment(
          {
            page: 1,
            size: 999,
            type: 'sub',
            sortBy: 'name',
            sortOrder: 'asc',
            parentId: this.parentId,
            name: '',
            departmentType: ''
          },
          'GET'
        ).then((authDepartmentRes)=>{
          if(this.parentVUE === 'changeDuty'){
            authAdminUserDuty(
              {
                id: this.currentUser.id
              },
              "GET"
            ).then((authAdminUserDutyRes)=>{
              //将每次获取的buttonList与当前用户已有的权限对比 有该项权限的isCheck设为true
              this.changeDutyVUE.userHasDuty = authAdminUserDutyRes.data
              authDepartmentRes.data.forEach((authDepartmentResItem)=>{
                authAdminUserDutyRes.data.forEach((authAdminUserDutyResItem)=>{
                  console.log(authAdminUserDutyResItem, authDepartmentResItem)
                  if(authDepartmentResItem.id === authAdminUserDutyResItem) {
                    authDepartmentResItem.isCheck = true
                  }
                })
              })
              for( let i in authDepartmentRes.data ) {
                this.buttonList.push({'name':authDepartmentRes.data[i].name,'parentId': authDepartmentRes.data[i].parentId,'currentId': authDepartmentRes.data[i].id})
              }
              this.dataLoading = false;
            })
          } else {
            this.buttonList = []
            // this.buttonList = authDepartmentRes.data
              for( let i in authDepartmentRes.data ) {
                this.buttonList.push({'name':authDepartmentRes.data[i].name,'parentId': authDepartmentRes.data[i].parentId,'currentId': authDepartmentRes.data[i].id})
              }
            this.dataLoading = false;
          }
        })
      },
      loadNode(node, resolve) {
        let data;
        if (node.level === 0) {
          return;
        }
        setTimeout(() => {
          
          authDepartment(
          {
            type: 'sub',
            sortBy: 'name',
            sortOrder: 'asc',
            parentId: node.data.currentId,
            name: '',
            departmentType: ''
          },
          'GET'
        ).then((res)=>{
          let data=[];

          for(let i in res.data){
            data.push({'name':res.data[i].name,'parentId': res.data[i].parentId,'currentId': res.data[i].id})
          }
          resolve(data);

        })
          
        }, 500);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .departmentSelect {
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .el-tree {
      border: 0;
    }
    .hide {
      position: absolute;
      visibility: hidden;
      width: 0;
      height: 0;
    }
    .el-checkbox {
      margin-right: 10px;
    }
    .selectNav {
      cursor: pointer;
    }
  }
</style>
