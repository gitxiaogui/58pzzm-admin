<template>
  <div class="contacts">
    <h3>联系人列表</h3>
    <el-button @click="addContacts()" type="primary" icon="plus">添加联系人</el-button>
    <el-table
      :data="currentList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        label-class-name="table-header-bold"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="relation"
        label="关系"
        label-class-name="table-header-bold"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        label-class-name="table-header-bold"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        label-class-name="table-header-bold"
        header-align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        label-class-name="table-header-bold"
        align="center">
        <template scope="scope">
          <el-col>
            <el-button
              @click="changeItem(scope.row)"
              size="mini"
              type="warning"
            >
              修改
            </el-button>
            <el-button
              @click="deleteItem(scope.row)"
              size="mini"
              type="danger"
            >
              删除
            </el-button>
          </el-col>
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
    <el-dialog size="tiny" :close-on-click-modal="true" v-if="addContactVisible" :modal-append-to-body="true" title="添加联系人" :visible.sync="addContactVisible">
      <el-form
        :model="contactsForm"
        :rules="formRules"
        ref="ruleForm"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item prop="name">
              <el-input
                v-model="contactsForm.name"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="relation">
              <el-input
                v-model="contactsForm.relation"
                placeholder="关系"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="phone">
              <el-input
                v-model="contactsForm.phone"
                placeholder="电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input
              v-model="contactsForm.address"
              placeholder="地址"
            ></el-input>
          </el-col>
          <el-col>
            <el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
            <el-button
              type="success"
              icon="check"
              @click="saveContacts()"
            >保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="changeContactVisible" :modal-append-to-body="true" title="修改联系人" :visible.sync="changeContactVisible">
      <el-form
              :model="contactsForm"
              :rules="formRules"
              ref="ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="name">
              <el-input
                v-model="contactsForm.name"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="relation">
              <el-input
                v-model="contactsForm.relation"
                placeholder="关系"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="phone">
              <el-input
                      v-model="contactsForm.phone"
                      placeholder="电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-input
                    v-model="contactsForm.address"
                    placeholder="地址"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
            <el-button
                    type="success"
                    icon="check"
                    @click="saveChangeContacts()"
            >保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { collectionOptionMixin } from '@/common/mixin'
  import { splitArray } from '@/common/util'
  import { collectionContactsRule } from '@/common/formRules'
  import { collectGetCaseContact, collectEventContact } from '@/api/api'
  export default {
    mixins: [collectionOptionMixin],
    data() {
      return {
        changeContactVisible: false,
        addContactVisible: false,
        currentData: [],
        currentList: [],
        nowPage: 1,
        formRules: collectionContactsRule,
        listTotalNumber: 0,
        contactsForm: {
          address: '',
          id: '',
          name: '',
          relation: '',
          phone: ''
        }
      }
    },
    watch: {
      collectionCaseInfo: function () {
        this.getList()
      }
    },
    methods: {
      saveChangeContacts() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            collectEventContact(
              {
                address: this.contactsForm.address,
                id: this.contactsForm.id,
                caseId: this.collectionCaseInfo.id,
                name: this.contactsForm.name,
                relation: this.contactsForm.relation,
                phone: this.contactsForm.phone,
                status: 1
              },
              "PUT"
            ).then((res) => {
              //console.log('3333333333333333333333333',)
              this.$message.success('修改成功');
              this.changeContactVisible = false;
              this.getList()
            })
          } else {
            this.$message.error('请填写正确的联系人信息！');
            return false;
          }
        });
      },
      changeItem(row) {
        this.changeContactVisible = true;
        this.contactsForm = {
          id: row.id,
          name: row.name,
          relation: row.relation,
          phone: row.phone,
          address: row.address
        }
      },
      deleteItem(row) {
        collectEventContact(
          {
            contactId: row.id
          },
          "DELETE"
        ).then((res) => {
          if(res.code === '00000000') {
            this.$message.success('删除成功');
            this.getList()
          }
        })
      },
      cancelAdd() {
        this.changeContactVisible = false;
        this.addContactVisible = false;
        this.contactsForm = {
          name: '',
          relation: '',
          phone: ''
        }
      },
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      addContacts() {
        this.addContactVisible = true;
        this.contactsForm = {
          name: '',
          relation: '',
          phone: ''
        }
      },
      saveContacts() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            collectEventContact(
              {
                address: this.contactsForm.address,
                caseId: this.collectionCaseInfo.id,
                name: this.contactsForm.name,
                relation: this.contactsForm.relation,
                phone: this.contactsForm.phone
              },
              "POST"
            ).then((res) => {
              this.$message.success('添加成功');
              this.addContactVisible = false;
              this.getList()
            })
          } else {
            this.$message.error('请填写正确的联系人信息！');
            return false;
          }
        });
      },
      getList(index = 1) {
        collectGetCaseContact(
          {
            caseId: this.collectionCaseInfo.id
          }
        ).then((res) => {
          console.log(res)
          this.currentData = splitArray(res.data, 10);
          this.listTotalNumber = res.data.length;
          this.currentList = this.currentData[0];
        })
      }
    },
    activated() {
      // this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .contacts{
    .el-table {
      margin-bottom: 10px;
    }
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
      .el-col {
        margin-top: 0;
        &:last-child .el-button{
          margin-top: 15px;
        }
      }
    }
    .el-table {
      margin-top: 10px;
    }
  }
</style>
