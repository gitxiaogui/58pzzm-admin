<template>
  <el-row class="sub-list">
    <el-row>
      <el-col :span="6">
        <el-button
          icon="plus"
          type="info"
          @click="addSubCode()"
        >新增{{ this.parentCode[this.parentCode.length - 1].lvl + 1 }}级子科目</el-button>
      </el-col>
      <el-col v-if="parentCode[this.parentCode.length - 1].lvl !== 1" :push="12" :span="6">
        <el-button @click="backToParent()" style="float: right" icon="arrow-left" type="success">返回上一级</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        class="list-table"
        :data="currentData"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          label="名称">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="finaceItemCode"
          label="财务科目编号">
        </el-table-column>
        <el-table-column
          prop="lvl"
          label="等级">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-col>
              <el-button
                size="mini"
                type="warning"
                @click="changeItem(scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="getSubCode(scope.row)">子科目</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteItem(scope.row)">删除</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="addSubCodeVisible">
      <el-card>
        <h3>新增子科目</h3>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input
              v-model="addForm.itemName"
              placeholder="科目名称"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="addForm.financeItemCode"
              placeholder="科目编号"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="success"
              @click="saveSubCode()"
            >保存</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row v-if="changeSubCodeVisible">
      <el-card>
        <h3>修改子科目</h3>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input
              v-model="addForm.itemName"
              placeholder="科目名称"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="addForm.financeItemCode"
              placeholder="科目编号"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="success"
              @click="saveChangeCode()"
            >保存</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </el-row>
</template>

<script>
  import { financeCodeSubList, financeCodeSubAdd, financeCodeModify, financeCodeDelete } from '@/api/api'
  export default {
    props: ['dataToChild'],
    data() {
      return {
        currentData: [],
        addSubCodeVisible: false,
        changeSubCodeVisible: false,
        parentCode: [],
        parentFinanceItemCode: [],
        addForm: {
          financeItemCode: '',
          itemName: '',
          pCode: '',
          lvl: ''
        }
      }
    },
    methods: {
      saveChangeCode() {
        financeCodeModify(
          {
            topCode: this.dataToChild.finaceItemCode,
            finaceItemCode: this.addForm.financeItemCode,
            itemName: this.addForm.itemName
          }
        ).then((res)=>{
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: `修改成功！`
            });
            this.changeSubCodeVisible = false;
            this.getList()
          }/* else {
            this.$message.error(res.message);
          }*/
        })
      },
      saveSubCode() {
        financeCodeSubAdd(
          {
            topCode: this.dataToChild.finaceItemCode,
            finaceItemCode: this.addForm.financeItemCode,
            itemName: this.addForm.itemName,
            pCode: this.addForm.pCode,
            lvl: this.addForm.lvl
          }
        ).then((res) => {
          console.log(res.code)
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: `添加成功！`
            });
            this.addSubCodeVisible = false;
            this.getList()
          }/* else {
            this.$message.error(res.message);
          }*/
        })
      },
      backToParent() {
        this.parentCode.pop()
        this.parentFinanceItemCode.pop();
        this.getList();
        this.addSubCodeVisible = false;
      },
      getSubCode(row) {
        this.parentCode.push(row)
        this.parentFinanceItemCode.push(row.finaceItemCode);
        this.getList()
        this.addSubCodeVisible = false;
      },
      addSubCode() {
        this.addForm.pCode = this.parentCode[this.parentCode.length - 1].finaceItemCode;
        this.addForm.lvl = this.parentCode[this.parentCode.length - 1].lvl;
        this.addSubCodeVisible = true
        this.addForm.itemName = '';
        this.addForm.financeItemCode = ''
        this.changeSubCodeVisible = false
      },
      deleteItem(row) {
        financeCodeDelete(
          {
            topCode: this.dataToChild.finaceItemCode,
            finaceItemCode: row.finaceItemCode
          }
        ).then((res)=>{
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: `删除成功！`
            });
            this.changeSubCodeVisible = false;
            this.getList()
          }/* else {
            this.$message.error(res.message);
          }*/
        })
      },
      changeItem(row) {
        console.log(row)
        this.changeSubCodeVisible = true;
        this.addSubCodeVisible = false;
        this.addForm.itemName = row.itemName;
        this.addForm.financeItemCode = row.finaceItemCode
      },
      getList(index = 1) {
        //生成父节点数组
        financeCodeSubList(
          {
            finaceItemCode: '',
            itemName: '',
            pCode: this.parentFinanceItemCode[this.parentFinanceItemCode.length - 1],
            page: 1,
            rows: 100
          }
        ).then((res)=>{
          console.log(res);
          this.currentData = res.financeltemlnfoList.list
        })
      }
    },
    created() {
      this.parentFinanceItemCode.push(this.dataToChild.finaceItemCode);
      this.parentCode.push(this.dataToChild);
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .sub-list {
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
