<template>
  <el-row class="loan-list">
    <el-row v-if="!fromProReceive">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-date-picker format='yyyy-MM-dd HH:mm:ss' v-model="listConditions.timeRange" type="datetimerange" placeholder="选择时间范围">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-input
                  placeholder="身份证号码"
                  v-model="listConditions.idCard"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listConditions.prodId" placeholder="选择产品">
            <el-option v-for="item in productListType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="listConditions.renewalCount" placeholder="请输入续期次数">
            <el-select style="width: 110px;margin-bottom: -10px" v-model="listConditions.renewalType" slot="append" placeholder="选择类型">
              <el-option v-for="item in loanDataType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
                  placeholder="用户名"
                  v-model="listConditions.userName"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
                  placeholder="手机号"
                  v-model="listConditions.phoneNumber"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input style="width: 110px;" v-model="listConditions.startOverdueDay" placeholder="最短逾期天数">
          </el-input>
          <span>到</span>
          <el-input style="width: 110px;" v-model="listConditions.endOverdueDay" placeholder="最长逾期天数"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="searchClick()" type="info" icon="search">搜索</el-button>
      </el-row>
    </el-row>
    <el-table
      class="list-table"
      :data="currentList"
      highlight-current-row
      @row-click="caseDetail"
      border
      style="width: 100%">
      <el-table-column type="expand">
	      <template scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	        	<!--<el-form-item label="产品id">
              <span>{{ log(props.row.id) }}</span>
           </el-form-item>-->
	        	<h5>流水记录</h5>
	          <caseList :dataToChild="props.row.id"></caseList>
	        </el-form>
	      </template>
      </el-table-column>
      <el-table-column
        label="身份证号"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.idCard }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品编号"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prodCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="借款金额"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.lenderAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="逾期天数"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.overdueDayCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="第几次续期"
        label-class-name="table-header-bold"
        header-align="center">
        <template scope="scope">
          <span style="margin-left: 10px;text-decoration: underline">{{ scope.row.renewalCount }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作">
        <template scope="scope">
          <el-button v-if="checkPermission('100006001')" size="small" type="primary" icon="arrow-right" @click="goCaseList(scope.row)">流水记录</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="pageNum"
        layout="prev, pager, next"
        :total="listTotalNumber">
      </el-pagination>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="借款详情" :visible.sync="caseDetailVisible">
      <el-row class="caseDetail" v-if="currentDetail">
        <el-col :md="24" :lg="12"><p>借款id：{{ currentDetail.id }}</p></el-col>
        <el-col :md="24" :lg="12"><p>用户id：{{ currentDetail.userId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>用户身份证：{{ currentDetail.idCard }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品id：{{ currentDetail.prodId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品编号：{{ currentDetail.prodCode }}</p></el-col>
        <el-col :md="24" :lg="12"><p>套餐id：{{ currentDetail.setId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>借款金额：{{ currentDetail.lenderAmount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>逾期天数：{{ currentDetail.overdueDayCount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>续期次数：{{ currentDetail.renewalCount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>起始日期：{{ currentDetail.beginTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>结束日期：{{ currentDetail.endTimeStr }}</p></el-col>
      </el-row>
    </el-dialog>
    <!--<el-dialog size="small" :close-on-click-modal="true" v-if="caseListVisible" :modal-append-to-body="false" title="流水记录" :visible.sync="caseListVisible">
      <caseList :dataToChild="caseListLenderId"></caseList>
    </el-dialog>-->
    <el-dialog size="small" :close-on-click-modal="true" v-if="renewalListVisible" :modal-append-to-body="false" title="续期记录" :visible.sync="renewalListVisible">
      <renewalList :dataToChild="dataToChild"></renewalList>
    </el-dialog>
  </el-row>
</template>
<script>
  import caseList from '@/components/lender/caseManagement/caseList.vue'
  import renewalList from './renewalList.vue'
  import { caseChannelType, caseStatusType, overdueCountType, overdueDaysType, loanDataType } from '@/common/formRules.js'
  import { lenderLoanRecordInfo, loanRenewalInfo, getSelectPro } from '@/api/api.js'
  import { dateFormat } from '@/common/util.js'
  import Bus from '@/eventBus'
  import { lenderLoanList } from '@/modal/index.js'

  export default {
    components: {
      caseList,
      renewalList
    },
    data() {
      return lenderLoanList();
    },
    methods: {
    	//log(arg) {console.log('--------------1213133',arg);return arg;},
      searchClick() {
        this.getList(1)
      },
      //分页
      handlePageChange(pageNum){
//        this.pageNum++;
        this.getList(pageNum);
      },
      //获取列表
      getList(index = this.pageNum){
        let ids;
        if(this.fromProReceive) {
          ids = this.$store.state.productInIdList
        } else {
          ids = ''
        }
        
        if(this.listConditions.startOverdueDay === '' && this.listConditions.endOverdueDay !== ''){
          this.listConditions.startOverdueDay = 0;
        }
        if(this.listConditions.endOverdueDay === '' && this.listConditions.startOverdueDay !== ''){
          this.listConditions.endOverdueDay = 9999;
        }

        if(this.listConditions.startOverdueDay > this.listConditions.endOverdueDay){
          var num = this.listConditions.startOverdueDay;
          this.listConditions.startOverdueDay = this.listConditions.endOverdueDay;
          this.listConditions.endOverdueDay = num;
        }

        lenderLoanRecordInfo(
          {
            ids,
            renewalType: this.listConditions.renewalType,
            // overdueDayType: this.listConditions.overdueDayType,
            startOverdueDay: this.listConditions.startOverdueDay,
            endOverdueDay: this.listConditions.endOverdueDay,
            beginDate: new Date(this.listConditions.timeRange[0]).getTime(),
            endDate: new Date(this.listConditions.timeRange[1]).getTime(),
            idCard: this.listConditions.idCard,
            userName: this.listConditions.userName,
            phoneNumber: this.listConditions.phoneNumber,
            renewalCount: this.listConditions.renewalCount,
            overdueDayCount: this.listConditions.overdueDayCount,
            prodId: this.listConditions.prodId,
            page: index,
            rows: 10
          }
        ).then((res)=>{
          if(res.code === '00000000') {
            console.log(res)
            this.listTotalNumber = res.lenderCaseRecordList.total;
            this.currentList = res.lenderCaseRecordList.list;
            console.log('========================列表ID',this.currentList)
          }
        });
      },
      //展示弹出框
      caseDetail(row,event, column) {
        if(column.type === "expand") {
  	    this.caseListLenderId = row.id;
      	  //console.log('222222222222222222222222',this.caseListLenderId);
      	  //console.log('=============================================row',column)
          event.stopPropagation();
          return false;
        }else if(column.label === '第几次续期') {
          /*if(!this.checkPermission('100003002')) {
            return false;
          }*/
          this.renewalListVisible = true;
          this.currentDetail = row;
          let id = '';
          if(this.currentDetail.renewalCount === 0) {
            id = this.currentDetail.id
          } else {
            id = this.currentDetail.origiinalId
          }
          loanRenewalInfo(
            {
              id
            }
          ).then((res)=>{
            console.log(res)
            this.dataToChild = res.LoanRenewalList;
          })
        }else {
          this.caseDetailVisible = true;
          this.currentDetail = row;
        }
        
      },
//    goCaseList(loanCase) {
//      console.log('流水记录',loanCase)
//      this.caseListVisible = true;
//      this.caseListLenderId = loanCase.id;
//    }
    },
    watch: {
      '$route' (to, from) {
        if(to.path !== '/loan') {
          this.$store.commit('deleteProductIdList')
        }
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this));
      if(!this.$store.state.productInIdList.length) {
        this.fromProReceive = false;
      } else {
        this.fromProReceive = true;
      }
      this.getList(1)
    },
    mounted() {
      getSelectPro({}).then((res)=>{
        this.productListType = []
        if(res.code === '00000000') {
          console.log(res.prodLists)
          this.productListType.push({
            value: '',
            label: '选择产品'
          })
          for(let i = 0; i < res.prodLists.length; i++) {
            this.productListType.push({
              value: res.prodLists[i].prodId,
              label: res.prodLists[i].prodName
            })
          }
        } else {
          this.$message.error(res.message);
        }
      })
    },
    created() {
      Bus.$on('caseListReload',()=>{
        this.getList(1)
      })
      Bus.$on('proReceiveList-loanList', ()=>{
        this.fromProReceive = true;
      })
    }
  }
</script>

<style lang="scss">
  .loan-list{
    .el-row{
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .el-col{
      .el-input, .el-select {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }

      .el-input-group .el-select>.el-input{
        margin-bottom: 0;
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
  .el-table__expanded-cell{
  	background-color: #b2e2dd6e;
  }
</style>
