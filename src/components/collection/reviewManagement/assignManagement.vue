<template>
	<el-row class="review-assign">
		<h3>分案管理</h3>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-table
          ref="tableColumn"
          class="list-table"
          :data="Apply.collector.currentList"
          @selection-change="ApplyCollectorHandleSelectionChange"
          highlight-current-row
          border>
          <el-table-column
            type="selection"
            label-class-name="table-header-bold"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            label="选择催收员"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span>{{ scope.row.realName }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            small
            @size-change="ApplyCollectorHandleSizeChange"
            :current-page.sync="Apply.collector.nowPage"
            :page-size="Apply.collector.currentSize"
            @current-change="ApplyCollectorHandlePageChange"
            layout="sizes, prev, pager, next"
            :total="Apply.collector.listTotalNumber">
          </el-pagination>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-table
          ref="tableColumn"
          class="list-table"
          :data="Apply.caseInfo.currentList"
          @selection-change="ApplyCaseHandleSelectionChange"
          highlight-current-row
          border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            label-class-name="table-header-bold"
            label="选择当前未分案件">
            <template scope="scope">
              <span>{{ `${ scope.row.debtorName} 逾期天数:${ scope.row.overdueDays} 逾期金额:${ scope.row.unpaid }` }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            small
            @size-change="ApplyCaseHandleSizeChange"
            :current-page.sync="Apply.caseInfo.nowPage"
            :page-size="Apply.caseInfo.currentSize"
            @current-change="ApplyCaseHandlePageChange"
            layout="sizes, prev, pager, next"
            :total="Apply.caseInfo.listTotalNumber">
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="apply-control" type="flex" justify="end">
      <el-row>
        <el-col class="switch" :span="12">
          考虑催收员现有案情:
          <el-switch
            v-model="Apply.assignType.aboutNow"
            on-text="是"
            off-text="否">
          </el-switch>
        </el-col>
        <el-col class="select" :span="12">
          <el-select v-model="Apply.assignType.amountOrNum" placeholder="分案侧重考虑因素">
            <el-option
              label="数量"
              value="count">
            </el-option>
            <el-option
              label="金额"
              value="amount">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-button @click="ApplySendApply()" type="success">申请分案</el-button>
    </el-row>
    <el-row class="result" v-if="GetResult.visible" :gutter="10">
      <h3>分案结果</h3>
      <el-row>
        <el-tabs @tab-click="GetResultHandleTabChange" :value="GetResult.resultData[0].name" type="border-card">
          <el-tab-pane v-for="(item, index) in GetResult.resultData" :key="index" :name="item.name" :label="item.name">
            <el-table
              class="list-table"
              @selection-change="GetResultHandleSelectionChange"
              :data="GetResult.currentData"
              highlight-current-row
              border>
              <el-table-column
                type="selection"
                width="55"
                label-class-name="table-header-bold"
                align="center">
              </el-table-column>
              <el-table-column
                align="center"
                label="分得案件列表"
                label-class-name="table-header-bold"
                header-align="center">
                <template scope="scope">
                  <span>{{ `${ scope.row.debtorName} 逾期天数:${ scope.row.overdueDays} 逾期金额:${ scope.row.unpaid }` }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                label-class-name="table-header-bold">
                <template scope="scope">
                <span>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="GetResultDeleteCase(scope.row)">
                    撤销
                  </el-button>
                </span>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <el-col v-if="Apply.selectedCollector.length !== 1" class="select" :span="12">
                转移到其他催收员:
                <el-select v-model="GetResult.transferTo" placeholder="选择其他催收员">
                  <el-option
                    v-for="(item, index) in Apply.selectedCollector"
                    :key="index"
                    :label="item.realName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button @click="GetResultHandleTransfer()" type="success">确定</el-button>
              </el-col>
              <el-col :push="Apply.selectedCollector.length !== 1 ? 0 : 12" :span="12">
                <el-pagination
                  small
                  :current-page.sync="GetResult.nowPage"
                  @current-change="GetResultHandlePageChange"
                  layout="prev, pager, next"
                  :total="GetResult.resultData[GetResult.tabIndex].cases.length">
                </el-pagination>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button  @click="GetResultConfirmAssign()" type="success">确认分案结果</el-button>
      </el-row>
    </el-row>
    <el-row>
      <h3>分案历史记录</h3>
      <el-table
        class="list-table"
        :data="History.currentList"
        highlight-current-row
        border>
        <el-table-column
          prop="operatorName"
          label="操作人"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
        <el-table-column
          label="分案时间"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            {{ dateFormat(new Date(scope.row.assignTIme), 'yyyy-MM-dd hh:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="caseAmount"
          label="案件金额"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="caseCount"
          label="案件数量"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="collectorCount"
          label="催收员数量"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-pagination
          small
          :current-page.sync="History.nowPage"
          @current-change="HistoryHandlePageChange"
          layout="prev, pager, next"
          :total="3">
        </el-pagination>
      </el-row>
    </el-row>
	</el-row>
</template>
<script>
  import { collectCaseNoallot, authAdminUser, collectCaseAssign, collectCaseAssignPre, collectCaseAssignDo } from '@/api/api'
  import { splitArray, dateFormat } from '@/common/util.js'
  import { collectionAssignManagement } from '@/modal'
	export default {
    data() {
      return collectionAssignManagement();
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this))
      this.initList();
    },
    methods: {
      dateFormat,
      HistoryHandlePageChange(pageNum) {
        this.getAssignHistory(pageNum)
      },
      GetResultConfirmAssign() {
        let sendObj = {};
        for(let i = 0; i < this.GetResult.resultData.length; i++) {
          sendObj[this.GetResult.resultData[i].collectorId] = [];
          for(let j = 0; j < this.GetResult.resultData[i].cases.length; j++) {
            sendObj[this.GetResult.resultData[i].collectorId].push(this.GetResult.resultData[i].cases[j].id)
          }
        }
        //判断是否只有一个催收员且没有案件分配
        let checkOnly = {
          collector: 0,
          cases: 0
        };
        for(let attr in sendObj) {
          checkOnly.collector++;
          checkOnly.cases = sendObj[attr].length;
        }
        if(checkOnly.collector === 1 && checkOnly.cases === 0) {
          return this.$message.error('请选择案件！');
        }

        collectCaseAssignDo(
          sendObj
        ).then((res) => {
          this.$message.success('分案成功！')
          Object.assign(this.$data, this.$options.data.call(this))
          this.initList();
        })
      },
      GetResultDeleteCase(row) {
        for(let j = 0; j < this.GetResult.resultData[this.GetResult.tabIndex].cases.length; j++) {
          let casesItem = this.GetResult.resultData[this.GetResult.tabIndex].cases[j];
          if(row.id === casesItem.id) {
            let parent = this.GetResult.resultData[this.GetResult.tabIndex].cases;
            parent.splice(parent.indexOf(casesItem), 1)
          }
        }
        this.GetResultHandleTabChange({index: this.GetResult.tabIndex})
      },
      GetResultHandleTransfer() {
        if(!this.GetResult.transferSelected.length) {
          this.$message.error('未选择案件！')
        } else {
//          this.GetResult.transferSelected;
          //清除当前案件中被选中转移的案件
          for(let i = 0; i < this.GetResult.transferSelected.length; i++) {
            let selectedItem = this.GetResult.transferSelected[i];
            for(let j = 0; j < this.GetResult.resultData[this.GetResult.tabIndex].cases.length; j++) {
              let casesItem = this.GetResult.resultData[this.GetResult.tabIndex].cases[j];
              if(selectedItem.id === casesItem.id) {
                let parent = this.GetResult.resultData[this.GetResult.tabIndex].cases;
                parent.splice(parent.indexOf(casesItem), 1)
              }
            }
          }
          //添加到指定的催收员名下
          for (let i = 0; i < this.GetResult.resultData.length; i++) {
            if(this.GetResult.resultData[i].collectorId === this.GetResult.transferTo) {
              this.GetResult.resultData[i].cases = this.GetResult.resultData[i].cases.concat(this.GetResult.transferSelected);
            }
          }
          this.GetResultHandleTabChange({index: this.GetResult.tabIndex})
        }
      },
      GetResultHandleSelectionChange(val) {
        this.GetResult.transferSelected = val;
      },
      GetResultHandlePageChange(nowPage) {
        console.log(nowPage)
        this.GetResult.currentData = this.GetResult.nowPageData[nowPage - 1];
      },
      GetResultHandleTabChange(tab) {
        let index = parseInt(tab.index);
        this.GetResult.tabIndex = index;
        this.GetResult.nowPage = 1;
        console.log(index)
        this.GetResult.nowPageData = splitArray(this.GetResult.resultData[index].cases, 10);
        this.GetResult.currentData = this.GetResult.nowPageData[0];
      },
      handleAssignResult() {
        let getResult = this.GetResult.firstResData;
        this.GetResult.resultData = [];
        this.GetResult.visible = true;
        this.GetResult.transferTo = '';
        let caseInfo = this.Apply.selectedCase;
        let collectorInfo = this.Apply.selectedCollector;
        for (let attr in getResult) {
          let obj = {
            collectorId: attr,
            name: '',
            cases: []
          }
          for (let i = 0; i < collectorInfo.length; i++) {
            if(collectorInfo[i].id === attr) {
              obj.name = collectorInfo[i].realName;
              console.log(collectorInfo[i])
            }
          }
          for(let i = 0; i < getResult[attr].length; i++) {
            for (let j = 0; j < caseInfo.length; j++) {
              if(getResult[attr][i] === caseInfo[j].id) {
                obj.cases.push(caseInfo[j])
              }
            }
          }
          this.GetResult.resultData.push(obj)
        }
      },
      ApplySendApply() {
        if(!this.Apply.selectedCase.length) {
          this.$message.error('请选择案件')
          return false;
        } else if(!this.Apply.selectedCollector.length) {
          this.$message.error('请选择催收员')
          return false;
        } else if (!this.Apply.assignType.amountOrNum) {
          this.$message.error('请选择侧重考虑因素')
          return false;
        } else {
          let caseIds = [];
          let collectorIds = [];
          for(let i = 0; i < this.Apply.selectedCase.length; i++) {
            caseIds.push(this.Apply.selectedCase[i].id)
          }
          for(let i = 0; i < this.Apply.selectedCollector.length; i++) {
            collectorIds.push(this.Apply.selectedCollector[i].id)
          }
          collectCaseAssignPre(
            {
              attrs: {
                factor_handle: this.Apply.assignType.aboutNow,
                type: this.Apply.assignType.amountOrNum
              },
              cases: caseIds,
              users: collectorIds
            }
          ).then((res) => {
            console.log(res)
            this.GetResult.firstResData = res.data;
            this.handleAssignResult();
            this.GetResultHandleTabChange({index: 0})
          })
        }
      },
      ApplyCaseHandlePageChange(pageNum) {
        this.getApplyCaseList(pageNum)
      },
      ApplyCollectorHandlePageChange(pageNum) {
        this.getApplyCollectorList(pageNum)
      },
      ApplyCaseHandleSelectionChange(val) {
        console.log(val)
        this.Apply.selectedCase = val;
      },
      ApplyCollectorHandleSelectionChange(val) {
        console.log(val)
        this.Apply.selectedCollector = val;
      },
      ApplyCollectorHandleSizeChange(val) {
        this.Apply.collector.currentSize = val;
        this.Apply.collector.nowPage = 1;
        this.getApplyCollectorList(1)
      },
      ApplyCaseHandleSizeChange(val) {
        this.Apply.caseInfo.currentSize = val;
        this.Apply.caseInfo.nowPage = 1;
        this.getApplyCaseList(1)
      },
      getApplyCollectorList(index = 1) {
        authAdminUser(
          {
            page: index,
            size: this.Apply.collector.currentSize,
            type: 'curr',
            department: '',
            name: '',
            sortBy: 'realName',
            sortOrder: 'asc'
          },
          "GET"
        ).then((res)=>{
          console.log(res)
          this.Apply.collector.currentList = res.data;
          this.Apply.collector.listTotalNumber = res.total
//          this.Apply.collector.nowPage = res.pageNum;
        })
      },
      getApplyCaseList(index = 1) {
        collectCaseNoallot(
          {
            page: index,
            size: this.Apply.caseInfo.currentSize,
            sortBy: 'debtTIme',
            sortOrder: 'asc'
          }
        ).then((res) => {
          this.Apply.caseInfo.currentList = res.data;
          this.Apply.caseInfo.listTotalNumber = res.total;
//          this.Apply.caseInfo.nowPage = res.pageNum;
        })
      },
      getAssignHistory(index = 1) {
        collectCaseAssign(
          {
            page: index,
            size: 10,
            sortBy: 'desc'
          }
        ).then((res) => {
          console.log(res)
          this.History.currentList = res.data.data;
          this.History.listTotalNumber = res.data.total;
          this.History.nowPage = res.data.pageNum;
        })
      },
      initList() {
        this.getAssignHistory()
        this.getApplyCaseList();
        this.getApplyCollectorList();
      }
    }
	}
</script>
<style lang="scss" scoped>
	.review-assign{
    .result {
      padding: 10px;
    }
    .apply-control {
      margin-top: 10px;
      .switch {
        margin-top: 6px;
      }
     .el-button {
       margin-left: 10px;
     }
    }
    .el-table {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
	}
</style>
