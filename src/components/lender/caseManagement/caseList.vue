<template>
  <el-row class="product-list">
    <!--<el-row>-->
      <!--<el-card class="searchBox">-->
        <!--<el-col>-->
          <!--<h3>搜索条件：</h3>-->
        <!--</el-col>-->
        <!--<el-row>-->
          <!--<el-checkbox-group v-model="searchConditions.selectGroup" @change="changeGroup">-->
            <!--<el-checkbox-button v-for="item in searchConditions.groupType" :label="item" :key="item">{{item}}</el-checkbox-button>-->
          <!--</el-checkbox-group>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="9">-->
            <!--<el-input-->
              <!--v-model="searchConditions.lenderId"-->
              <!--placeholder="借款id"-->
              <!--&gt;-->
            <!--</el-input>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-button @click="searchClick()" @enter="searchClick()" type="info" icon="search">搜索</el-button>-->
        <!--</el-row>-->
      <!--</el-card>-->
    <!--</el-row>-->
    <el-table
      class="list-table"
      :data="currentList"
      highlight-current-row
      @row-click="caseDetail"
      border
      style="width: 100%">
      <el-table-column
        label="用户id">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="amount"
        label="金额">
      </el-table-column>
      <el-table-column
        sortable
        prop="type"
        label="类型">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type === 0 ? '放款' : '回款' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="渠道">
        <template scope="scope">
          <span style="margin-left: 10px">{{ caseChannelType[Number(scope.row.channel)] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="status"
        label="状态">
        <template scope="scope">
          <span style="margin-left: 10px">{{ caseStatusType[Number(scope.row.status)] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="pageNum"
        layout="prev, pager, next"
        :total="listTotalNumber">
      </el-pagination>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="案件详情" :visible.sync="caseDetailVisible">
      <el-row class="caseDetail" v-if="currentDetail">
        <el-col :md="24" :lg="12"><p>借款11id：{{ currentDetail.id }}</p></el-col>
        <el-col :md="24" :lg="12"><p>用户id：{{ currentDetail.userId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>金额：{{ currentDetail.amount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>类型：{{ currentDetail.type === 0 ? '放款' : '回款' }}</p></el-col>
        <el-col :md="24" :lg="12"><p>回款渠道：{{ caseChannelType[Number(currentDetail.channel)] }}</p></el-col>
        <el-col :md="24" :lg="12"><p>状态：{{ caseStatusType[Number(currentDetail.status)] }}</p></el-col>
        <el-col :md="24" :lg="12"><p>创建时间: {{ new Date(currentDetail.createTime).toLocaleString() }}</p></el-col>
        <el-col :md="24" :lg="12"><p>更新时间: {{ new Date(currentDetail.updateTime).toLocaleString() }}</p></el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import { lenderCaseRecordInfo } from '@/api/api'
  import { caseChannelType, caseStatusType } from '@/common/formRules.js'
  import Bus from '@/eventBus'
  export default {
    props: ['dataToChild'],
    data() {
      return {
        listTotalNumber: 0,
        pageNum: 1,
        currentList: null,
        caseDetailVisible: false,
        currentDetail: null,
        caseChannelType,
        caseStatusType,
        listConditions:{
          listGetType: '',
          lenderId: ''
        },
        searchConditions: {
          selectGroup: ['放款', '回款'],
          groupType: ['放款', '回款'],
          lenderId: ''
        }
      }
    },
    methods: {
      searchClick() {
        this.listConditions.lenderId = this.searchConditions.lenderId
        console.log(this.listConditions.lenderId)
        this.getList(1)
      },
      changeGroup(event){
        if (event.length === 2) {
          this.listConditions.listGetType = '';
        }else if (event.length === 1) {
          if (event[0] === '放款') {
            this.listConditions.listGetType = 0;
          } else {
            this.listConditions.listGetType = 1;
          }
        } else {
          this.currentList = [];
          return false;
        }
        this.getList(1)
      },
      //分页
      handlePageChange(pageNum){
//        this.pageNum++;
        this.getList(pageNum);
      },
      //获取列表
      getList(index = this.pageNum){
        this.listConditions.lenderId = this.dataToChild
        lenderCaseRecordInfo(
          {
            lenderCaseId: this.listConditions.lenderId,
            type: this.listConditions.listGetType,
            page: index,
            rows: 10
          }
        ).then((res)=>{
          this.listTotalNumber = res.amountRecordList.total;
          this.currentList = res.amountRecordList.list;
          console.log(res)
        });
      },
      //展示弹出框
      caseDetail(row, event, column) {
        if(column.label === '操作') {
          event.stopPropagation();
          return false;
        }
        this.caseDetailVisible = true;
        this.currentDetail = row;
      }
    },
    activated() {
      this.pageNum = 1;
      this.listConditions = {
        listGetType: '',
        lenderId: ''
      }
      this.searchConditions = {
        selectGroup: ['放款', '回款'],
          groupType: ['放款', '回款'],
          lenderId: ''
      }
      this.getList()
    },
    mounted() {
      console.log(this.dataToChild)
      this.getList()
    },
    watch: {
      '$route': function () {
//        this.$router.go(0)
      },    
//      保留备用，监控搜索条件
        'dataToChild': {
          handler: function (val, oldVal) {
            console.log('=============================',val)
            this.listConditions.lenderId = val;
            this.getList()
          },
          deep: true
        }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .product-list{
    .el-row{
      margin-bottom: 15px;
      &:last-child{
        margin-bottom: 0px;
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
</style>
