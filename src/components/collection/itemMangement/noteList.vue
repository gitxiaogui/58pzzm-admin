<template>
  <div class="note-list">
    <h3>笔记列表</h3>
    <el-button class="add" @click="addNote()"><i class="el-icon-plus"></i></el-button>
    <el-dialog size="small" :close-on-click-modal="true" v-if="addShow" :modal-append-to-body="true" :title="title" :visible.sync="addShow">
      <el-form
        v-model="noteForm"
        ref="noteForm">
        <el-row>
          <el-col>
            <el-form-item prop="type">
              <el-select v-model="noteForm.value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="content">
              <el-input
                type="textarea"
                resize="none"
                placeholder="请输入内容"
                v-model="noteForm.content">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-button type="info" @click="cancelAdd()">取消</el-button>
            <el-button icon="check" type="success" @click="submitForm()">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-row
      :gutter="20" class="listbox">
      <template v-for="item in currentList">
        <el-col :span="12">
          <div class="grid-content bg-purple content-box">
            <i class="el-icon-delete delete" @click="deleteNote( item.id )"></i>
            <div class="content" id="content">{{ item.content }}</div>
            <div class="note-time">{{ dateTransform( new Date(item.creatTime),  'yyyy-MM-dd hh:mm:ss') }}</div>
            <i class="el-icon-edit edit" @click="editNote( item.id, item.content, item.type)"></i>
          </div>
        </el-col>
      </template>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="nowPage"
        :page-size="2"
        :total="listTotalNumber"
        layout="prev, pager, next">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import { collectCaseNote } from '@/api/api'
  import Bus from '@/eventBus'
  import { splitArray, dateFormat } from '@/common/util.js'
  import { collectionOptionMixin } from '@/common/mixin'

  export default {
    mixins: [collectionOptionMixin],
    data() {
      return {
        addShow :false,
        currentList: null,
        currentData: [],
        nowPage: 1,
        listTotalNumber: 0,
        pageNum: 1,
        id: null,
        title: '',
        noteForm: {
          value: 0,
          content: '',
        },
        options:[{
          value: 0,
          label: "当前案件"
        },{
          value: 1,
          label: "全部案件"
        }]
      }

    },
    activated() {
      // this.getList()
    },
    watch: {
      collectionCaseInfo: function () {
        this.getList()
      }
    },
    methods: {
      getList(){
        collectCaseNote(
          this.collectionCaseInfo.id,
          'GET',
        ).then((res)=>{
          console.log(res)
          this.listTotalNumber = res.data.length;
          this.currentData = splitArray(res.data, 2);
          this.currentList = this.currentData[0]
        });
      },
      addNote() {
        this.noteForm.content = '';
        this.noteForm.value = 0;
        this.addShow = true;
        this.title = "添加笔记"
      },
      cancelAdd() {
        this.addShow = false;
        this.noteForm.content = '';
        this.noteForm.value = 0;
      },
      dateTransform(obj, fmt){
        return dateFormat(obj, fmt);
      },
      submitForm() {
        if(this.noteForm.value ==="" || this.noteForm.content ==="") {
          this.$message.error('请输入参数')
          return;
        }
        if(this.title === "添加笔记") {
          collectCaseNote(
            {
              caseId: this.collectionCaseInfo.id,
              content: this.noteForm.content,
              type: this.noteForm.value
            },
            "POST"
          ).then((res)=>{
            this.noteForm.content = '';
            this.noteForm.value = 0;
            this.$message({
                type: 'success',
                message: '添加成功'
              });
            this.addShow = false
            this.getList()
          })
        } else if(this.title === "修改笔记") {
          collectCaseNote(
            {
              caseId: this.collectionCaseInfo.id,
              content: this.noteForm.content,
              type: this.noteForm.value,
              id: this.id
            },
            "PUT"
          ).then((res)=>{
            this.noteForm.content = '';
            this.noteForm.value = 0;
            this.$message({
                type: 'success',
                message: '修改成功'
              });
            this.addShow = false;
            this.getList();
          })
        }

      },
      deleteNote(id) {
        collectCaseNote(
          id,
          "DELETE"
        ).then((res)=>{
          if(res.code === '00000000'){
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            this.getList();
          }
        })
      },
      editNote(id, content, value) {
        this.addShow = true;
        this.title = "修改笔记";
        this.id = id;
        this.noteForm.content = content;
        this.noteForm.value = value;
      },//分页
      handlePageChange(pageNum){
        this.currentList = this.currentData[pageNum-1]
      },
    }
  }
</script>

<style lang="scss">
  .note-list{
    position: relative;
    height: 250px;
    h3{line-height: 30px;padding-left: 0;margin: 0}
    .el-row {
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      margin-top: 10px;
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      border: 1px solid #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      padding: 30px 20px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .listbox{
      min-height: 177px;
    }
    .content-box{
      position: relative;
      line-height: 20px;
      .content{
        height: 105px;
        overflow-y: scroll;
      }
    }
    .note-time{
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #888
    }
    .delete{
      display: block;
      position: absolute;
      top: 10px;
      right: 10px
    }
    .delete:hover, .edit:hover{
      color: #20a0ff;
    }
    .edit{
      display: block;
      position: absolute;
      top: 10px;
      left: 10px
    }
    .add{
      position: absolute;
      left: 80px;top: 10px;
      line-height: 16px;
      padding: 2px 3px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    #content::-webkit-scrollbar {
      width: 10px;
      height:10px;
    }
    #content::-webkit-scrollbar-thumb{
      border: 10px solid #999;
      border-radius: 4px;
    }
  }
</style>
