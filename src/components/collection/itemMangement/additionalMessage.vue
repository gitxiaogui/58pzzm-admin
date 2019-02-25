<template>
  <div class="additional-message">
    <h3>附加信息</h3>
    <el-button @click="addAdditional()" type="primary" icon="plus">添加附加信息</el-button>
    <el-table
      :data="currentList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="信息种类"
        header-align="center"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        prop="value"
        label="信息内容"
        header-align="center"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        label="信息类型"
        align="center"
        width="200"
        label-class-name="table-header-bold">
        <template scope="scope">
          {{ scope.row.status === 0 ? '当前' : '全局' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        label-class-name="table-header-bold"
        align="center"
        width="200">
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
    <el-dialog size="small" :close-on-click-modal="true" v-if="changeAdditionalVisible" :modal-append-to-body="true" title="修改附加信息" :visible.sync="changeAdditionalVisible">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="additionalForm.status" placeholder="选择信息类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="additionalForm.name"
            placeholder="信息种类"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="additionalForm.value"
            placeholder="信息内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
          <el-button
            type="success"
            icon="check"
            @click="saveChangeAdditional()"
          >保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog size="small" :close-on-click-modal="true" v-if="addAdditionalVisible" :modal-append-to-body="true" title="增加附加信息" :visible.sync="addAdditionalVisible">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="additionalForm.status" placeholder="选择信息类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="additionalForm.name"
            placeholder="信息种类"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="additionalForm.value"
            placeholder="信息内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
          <el-button
            type="success"
            icon="check"
            @click="saveAddAdditional()"
          >保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import { collectionOptionMixin } from '@/common/mixin.js'
  import { collectCaseAdditional } from '@/api/api'
  import { splitArray } from '@/common/util.js'
  export default {
    mixins: [collectionOptionMixin],
    data() {
      return {
        changeAdditionalVisible: false,
        addAdditionalVisible: false,
        currentList: [],
        currentData: [],
        listTotalNumber: 0,
        nowPage: 1,
        options: [
          {
            value: 0,
            label: '当前'
          },
          {
            value: 1,
            label: '全局'
          }
        ],
        additionalForm: {
          status: 0,
          id: '',
          name: '',
          value: ''
        }
      }
    },
    watch: {
      collectionCaseInfo: function () {
        this.getList()
      }
    },
    methods: {
      deleteItem(row) {
        collectCaseAdditional(
          {
            additionalId: row.id
          },
          "DELETE"
        ).then((res) => {
          if( res.code === '00000000' ) {
            this.$message.success('删除附加信息成功');
            this.getList()
          }
        })
      },
      saveAddAdditional() {
//        0当前 1全局
        collectCaseAdditional(
          {
            caseId: this.collectionCaseInfo.id,
            name: this.additionalForm.name,
            value: this.additionalForm.value,
            type: this.additionalForm.status,
          },
          "POST"
        ).then((res) => {
          if( res.code === '00000000' ) {
            this.$message.success('增加附加信息成功');
            this.addAdditionalVisible = false;
            this.getList()
          }
        })
      },
      addAdditional() {
        this.additionalForm.name = '';
        this.additionalForm.value = '';
        this.additionalForm.id = '';
        this.addAdditionalVisible = true;
      },
      changeItem(row) {
        console.log(row)
        this.additionalForm.name = row.name;
        this.additionalForm.value = row.value;
        this.additionalForm.id = row.id;
        this.additionalForm.status = row.status;
        this.changeAdditionalVisible = true;
      },
      saveChangeAdditional() {
        for (let i in this.additionalForm) {
          if(this.additionalForm[i] === '') {
            this.$message.error('请填写完整的附加信息！');
            return false;
          }
        }
        collectCaseAdditional(
          {
            caseId: this.collectionCaseInfo.id,
            id: this.additionalForm.id,
            type: this.additionalForm.status,
            name: this.additionalForm.name,
            value: this.additionalForm.value,
          },
          "PUT"
        ).then((res) => {
          this.$message.success('修改附加信息成功！');
          this.changeAdditionalVisible = false;
          this.getList()
        })
      },
      getList() {
        collectCaseAdditional(
          {
            caseId: this.collectionCaseInfo.id
          },
          'GET'
        ).then((res) => {
          console.log(res)
          this.nowPage = 1;
          this.currentData = splitArray(res.data, 10);
          this.listTotalNumber = res.data.length;
          this.currentList = this.currentData[0]
        })
      },
      cancelAdd() {
        this.additionalForm.name = '';
        this.additionalForm.value = '';
        this.additionalForm.id = '';
        this.addAdditionalVisible = false;
        this.changeAdditionalVisible = false;
      },
      handlePageChange(pageNum) {
        this.currentList = this.currentData[pageNum - 1]
      }
    },
    activated() {
      // this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .additional-message {
    .el-table {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>
