<template>
  <el-row class="loanbatch-confirm">
    <h3>批量放款</h3>
    <el-upload
      class="upload-demo"
      ref="upload"
      accept=""
      action="elcelLoanMatch"
      :multiple="false"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="handleChange"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始匹配</el-button>
      <!--  <div slot="tip" class="el-upload__tip">请选择xls/xlsx文件，且不超过500kb</div> -->
    </el-upload>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane :label="label1" name="first">
        <el-table
          @selection-change="successHandleSelect"
          :data="currentList1"
          v-loading="loading2"
          element-loading-text="拼命加载中"
          highlight-current-row
          border
          ref="multipleTable"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <!--<el-table-column
            v-for="(item, index) in itemKey.title1"
            :key="index"
            :prop="item"
            :label="chinese[item]"
            header-align="center"
            label-class-name="table-header-bold">
          </el-table-column>-->
          <el-table-column
            label="结束时间"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ dateFormat(new Date(scope.row.returnTime), 'yyyy-MM-dd hh:mm:ss')  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.userName  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="回款渠道"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.channel  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.phoneNumber  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.amount  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <el-button @click="confirmItem(scope.row)" type="primary" size="small">确认放款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-button
            type="success"
            @click="handleConfirmArray"
          >批量放款{{ this.selectedArray.length }}条
          </el-button>
        </el-row>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page.sync="successNowPage"
            @current-change="successHandlePageChange"
            :total="successTotal"
            layout="total, prev, pager, next">
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="label2" name="second">
        <el-table
          v-if="currentList2"
          :data="currentList2"
          highlight-current-row
          border
          v-loading="loading2"
          element-loading-text="拼命加载中"
          ref="multipleTable"
          style="width: 100%">
          <el-table-column
            label="结束时间"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ dateFormat(new Date(scope.row.returnTime), 'yyyy-MM-dd hh:mm:ss')  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.userName  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="回款渠道"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.channel  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.phoneNumber  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
             <span>{{ scope.row.amount  }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column
            v-for="(item, index) in itemKey.title2"
            :key="index"
            :prop="item"
            :label="chinese[item]"
            header-align="center"
            label-class-name="table-header-bold"
            >
          </el-table-column>-->
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page.sync="failNowPage"
            @current-change="failHandlePageChange"
            :total="failTotal"
            layout="total, prev, pager, next">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>
<script>
  import {elcelLoanMatch, financeLoanfinanceNotarize} from '@/api/api'
  import {caseChannelType} from '@/common/formRules'
  import { splitArray, dateFormat } from '@/common/util'

  export default {
    data() {
      return {
        activeName2: 'first',
        currentData1: [],
        currentList1: [],
        currentData2: [],
        currentList2: [],
        selectedArray: [],
        fileList: [],
        loading2: false,
        label1: '已匹配',
        label2: '未匹配',
        itemKey: {
          title1: [],
          title2: []
        },
        chinese:{'returnTime':' 结束时间','userName':'名称','channel':' 回款渠道','phoneNumber':' 手机号','amount':' 金额'},
        successNowPage: 1,
        successTotal: 0,
        failNowPage: 1,
        failTotal: 0,
        caseChannelType
      }
    },
    methods: {
      dateFormat,
      handleConfirmArray() {
        if (this.selectedArray.length === 0) {
          this.$message.error('请选择已匹配记录！')
        } else {
          this.sendConfirmRequest(this.selectedArray);
        }
      },
      successHandleSelect(val) {
        console.log(val)
        this.selectedArray = val;
      },
      confirmItem(row) {
        this.sendConfirmRequest([row]);
      },
      //处理数据，调用确认汇款接口
      sendConfirmRequest(data) {
        /*const dataType = {
          returnTime: '受理日期',
          amount: '汇款金额',
          channel: '收款银行名称',
          userName: '收款户名',
          phoneNumber: '手机号'
        }*/
        this.$confirm('是否确认放款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          financeLoanfinanceNotarize
          /*let sendData = [];

          console.log(data)*/
          /*data.forEach(item => {
            //处理需要发送的数据
            let obj = {};
            for (let name in item) {
              let dataName = name;
              let dataValue = item[name];
              for (let attr in dataType) {
                let transData;
                let typeAttr = dataType[attr];
                if (dataName === typeAttr) {
                  if (attr === 'returnTime') {
                    //处理受理日期
                    transData = dataValue.split("");
                    transData.splice(4, 0, '-');
                    transData.splice(7, 0, '-');
                    transData.splice(10, 0, ' 00:00:00');
                    console.log(transData)
                    transData = String(new Date(transData.join('')).getTime())
                      console.log(1,transData)
                  } else if (attr === 'channel') {
                    //处理回款渠道
                    console.log(String(this.caseChannelType.indexOf(dataValue)))
                    // return;
                    transData = String(this.caseChannelType.indexOf(dataValue))
                  } else {
                    transData = dataValue;
                  }
                } else {
                  continue;
                }
                obj[attr] = transData;
                console.log(transData)
              }
            }
            obj.label = '4';
            sendData.push(obj)
          })
          console.log(8,sendData);
          */

          //api发送数据

          this.httpRequest.loanFinanceConfirm(
            {
              data: data
            }
          ).then((res) => {
          	console.log('放款成功',res)
            if (res.code === '00000000') {
              this.$message.success('操作成功！');
              this.beforeAvatarUpload(this.fileList[0])
              this.fileList.shift();
            } else {
              if (res.message) {
                this.$message.error(res.message);
              }
            }
          })

        }).catch(() => {
          this.$message.info('已取消')
        })
      },
      successHandlePageChange(pageNum) {
        this.currentList1 = this.currentData1[pageNum - 1];
      },
      failHandlePageChange(pageNum) {
        this.currentList2 = this.currentData2[pageNum - 1];
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleError(err, file, fileList) {
        console.log(err)
      },
      handleChange(file, fileList) {
        // console.log(file, fileList);
        if (fileList.length > 1) {
          this.fileList = [];
          this.$message.error('只可传入一个文件');
        }
      },
      beforeAvatarUpload(file) {
        let paper = new FormData();
        this.loading2 = true;
        paper.append('file', file);
        paper.append('label', '4');
        // console.log(paper)
        this.httpRequest.excelLoanDataMatch(
          paper,
        ).then((res) => {
          console.log(res)
          let resSuccessData = [];
          let resFailData = [];
          res.data.match_ok.forEach((val) => {
            resSuccessData.unshift(val)
            this.itemKey.title1 = []
            for (let item in val) {
              this.itemKey.title1.unshift(item);
            }
          })
          this.successTotal = resSuccessData.length;
          this.currentData1 = splitArray(resSuccessData, 10);
          this.currentList1 = this.currentData1[0];
          res.data.match_fail.forEach((val) => {
            resFailData.unshift(val)
            this.itemKey.title2 = []
            for (let item in val) {
              this.itemKey.title2.unshift(item);
            }
          })
          this.failTotal = resFailData.length;
          this.currentData2 = splitArray(resFailData, 10);
          this.currentList2 = this.currentData2[0];
          setTimeout(() => {
            this.loading2 = false
          }, 1000)

        }).catch((err)=>{
          setTimeout(() => {
            this.loading2 = false
          }, 1000)
        });
        this.fileList.push(file)
        return false;
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this));
    }
  }
</script>
<style lang="scss">
  .loanbatch-confirm {
    .el-table {
      margin-bottom: 10px;
    }
    .el-upload__tip {
      float: right;
    }
    .el-button {
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .el-upload-list__item-name {
      margin-bottom: 10px;
    }
    .upload-demo {
      width: 30%;
    }
  }
</style>