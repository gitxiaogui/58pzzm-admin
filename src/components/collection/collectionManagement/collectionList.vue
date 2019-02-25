<template>
  <el-row class="collection-list">
    <el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="listConditions.debtorName" placeholder="借款人姓名"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="listConditions.debtorPhone" placeholder="手机号"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="listConditions.debtorCid" placeholder="身份证号"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="searchForm()" type="info" icon="search">搜索</el-button>
      </el-row>
    </el-row>
    <el-row>
      <el-radio-group @change="getList()" v-model="searchListType">
        <el-radio-button label="所有案件"></el-radio-button>
        <el-radio-button  label="我的案件"></el-radio-button>
      </el-radio-group>
    </el-row>
    <el-table
      class="list-table"
      highlight-current-row
      @row-click="productDetail"
      :data="currentData"
      @selection-change="multipleCancelCase"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        label="借款人姓名"
        header-align="center"
        label-class-name="table-header-bold">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.debtorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="debtorPhone"
        label="手机号"
        header-align="center"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        prop="debtorCid"
        label="身份证号"
        header-align="center"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        prop="overdueDays"
        label="逾期天数"
        header-align="center"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        prop="unpaid"
        label="欠款金额"
        header-align="center"
        label-class-name="table-header-bold">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        label-class-name="table-header-bold"
        align="center">
        <template scope="scope">
          <el-col>
            <el-button
              icon="arrow-right"
              size="small"
              type="info"
              @click="switchToItem(scope.row)">转到案件</el-button>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-button @click="confirmCancelCase()" type="danger" class="multipleCancelCase">
        批量撤案{{ multipleCancelCaseNum === 0 ? '' : `(${multipleCancelCaseNum})个` }}
      </el-button>
      <el-pagination
        :current-page.sync="nowPage"
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :total="listTotalNumber">
      </el-pagination>
    </el-row>
    <el-dialog size="small" :visible.sync="caseDetailVisible" :close-on-click-modal="true" :modal-append-to-body="false" title="案件详情">
      <el-row v-if="currentDetail" class="productDetail">
        <el-col :md="24" :lg="12"><p>debtTIme:{{ dateFormat(new Date(parseInt(this.currentDetail.debtTIme)), 'yyyy-MM-dd hh:mm:ss') }}</p></el-col>
        <el-col :md="24" :lg="12"><p>借款人姓名：{{ this.currentDetail.debtorName }}</p></el-col>
        <el-col :md="24" :lg="12"><p>借款人身份证号：{{ this.currentDetail.debtorCid }}</p></el-col>
        <el-col :md="24" :lg="12"><p>借款人手机号：{{ this.currentDetail.debtorPhone }}</p></el-col>
        <el-col :md="24" :lg="12"><p>借款本金：{{ this.currentDetail.debtPrincipal }}</p></el-col>
        <el-col :md="24" :lg="12"><p>逾期天数：{{ this.currentDetail.overdueDays }}</p></el-col>
        <el-col :md="24" :lg="12"><p>标签：{{ this.currentDetail.flag }}</p></el-col>
        <el-col :md="24" :lg="12"><p>未还金额：{{ this.currentDetail.unpaid }}</p></el-col>
        <el-col :md="24" :lg="12"><p>已还本金：{{ this.currentDetail.repaymentPrincipal }}</p></el-col>
        <el-col :md="24" :lg="12"><p>已还金额：{{ this.currentDetail.repayment }}</p></el-col>
        <el-col :md="24" :lg="12"><p>状态：{{ this.currentDetail.status }}</p></el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import { dateFormat } from '@/common/util.js'
  import { collectCaseList, collectCaseMy, collectMultipleCancel } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        nowPage: 1,
        listTotalNumber: 0,
        currentData: [],
        searchListType: '所有案件',
        multipleCancelCaseNum: 0,
        selectedCancelCase: [],
        caseDetailVisible: false,
        currentDetail: {},
        listConditions: {
          debtorName: '',
          debtorPhone: '',
          debtorCid: ''
        }
      }
    },
    methods: {
      dateFormat,
      confirmCancelCase() {
        if(!this.selectedCancelCase.length) {
          this.$message.error('请至少选择一个案件')
          return false;
        } else {
          this.$confirm('是否确认撤销选中案件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let selectedIds = [];
            this.selectedCancelCase.forEach((item) => {
              selectedIds.push(item.id)
            })
            collectMultipleCancel(
              selectedIds
            ).then((res) => {
              this.$message.success('撤销成功！')
              this.getList()
              this.nowPage = 1;
            })
          }).catch(() => {
            this.$message.info('已取消')
          })
        }
      },
      multipleCancelCase(val) {
        console.log(val)
        this.selectedCancelCase = val;
        this.multipleCancelCaseNum = val.length
      },
      goPlan(index, row) {
      },
      handleShelf(index, row) {
      },
      deleteProduct(index, row) {
      },
      switchToItem(row) {
        localStorage.removeItem('currentCollectionCase');
        localStorage.setItem('currentCollectionCase', JSON.stringify(row))
        Bus.$emit('changeCurrentCollectionCase');
        this.$router.push('/collection-item')
      },
      //分页
      handlePageChange(pageNum){
        console.log('page'+pageNum)
        this.getList(pageNum)
      },
      //获取列表
      getList(index = 1){
        let API;
        if(this.searchListType === '我的案件') {
          API = collectCaseMy;
        } else {
          API = collectCaseList;
        }
        API(
          {
            debtorName: this.listConditions.debtorName,
            debtorPhone: this.listConditions.debtorPhone,
            debtorCid: this.listConditions.debtorCid,
            page: index,
            size: 10,
            sortBy: 'debtTIme',
            sortOrder: 'asc',
          }
        ).then((res) => {
          console.log('=====================',res)
          this.currentData = res.data
          this.listTotalNumber = res.total
        })
      },
      //展示弹出框
      productDetail(row, event, column) {
        console.log(column)
        if(column.label === '操作' || column.type === 'selection') {
          event.stopPropagation();
          return false;
        }
        this.caseDetailVisible = true;
        this.currentDetail = row;
      },
      searchForm() {
        this.getList(1)
      }
    },
    activated() {
      this.getList();
      Object.assign(this.$data, this.$options.data.call(this));
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .collection-list{
    padding-bottom: 10px;
    .multipleCancelCase {
      position: absolute;
      left: 0;
    }
    .list-table{
      margin-bottom: 10px;
      cursor: pointer;
    }
    .el-button {
      margin: 5px 0;
    }
    .el-dialog{
      p{
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
</style>
