<template>
  <div>
    <el-row class="review-repayment" :gutter="10">
      <el-col :span="6">
        <el-date-picker format='yyyy-MM-dd HH:mm:ss' v-model="listConditions.timeRange" type="datetimerange" placeholder="选择时间范围">
        </el-date-picker>
      </el-col>
      <el-col  :span="5">
        <el-input style="width: 120px;" v-model="listConditions.minAmount" placeholder="最低还款金额">
        </el-input>
        <span>到</span>
        <el-input style="width: 120px;" v-model="listConditions.maxAmount" placeholder="最高还款金额"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="listConditions.value" placeholder="请选择审核状态">
          <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-button @click="searchClick()" type="info" icon="search">搜索</el-button>
    </el-row>
    <el-row>
      <el-table
        class="list-table"
        :data="currentList"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          label="催收员"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.collectorName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="还款金额"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="还款人姓名"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.repaymentName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="关系"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.repaymentRelation }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="还款时间"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ Transformdate(new Date(scope.row.repaymentTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ transformStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column

          label="操作"
          label-class-name="table-header-bold"
          align="center">
          <template  scope="scope">
            <el-button type="success" size="mini" :disabled="disabled( scope.row.status )" @click="repaymentReview( scope.row.id, 1 )">确认</el-button>
            <el-button type="danger" size="mini" :disabled="disabled( scope.row.status )" @click="repaymentReview( scope.row.id, 2)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="pageNum"
        layout="prev, pager, next"
        :total="listTotalNumber">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
  import { collectRepayment, collectRepaymentAction } from '@/api/api'
  import { dateFormat } from '@/common/util.js'
  export default {
    data() {
      return {
        currentList: [],
        pageNum: 1,
        listTotalNumber: 0,
        title: '',
        content: '',
        options:[{
          value: '',
          label: '选择审核状态'
        },{
          value: 0,
          label: "待审核"
        },{
          value: 1,
          label: "确认还款"
        },{
          value: 2,
          label: "打回还款"
        }],
        listConditions: {
          timeRange: '',
          startTime: '',
          endTime: '',
          minAmount: '',
          maxAmount: '',
          value: ''
        }
      }
    },
    methods: {
      getList(index = this.pageNum) {
        if(this.listConditions.minAmount > this.listConditions.maxAmount) {
          let num = this.listConditions.maxAmount;
          this.listConditions.maxAmount = this.listConditions.minAmount;
          this.listConditions.minAmount = num;
        }
        let startTime = '';
        let endTime = '';
        if(this.listConditions.timeRange) {
          startTime = new Date(this.listConditions.timeRange[0]).getTime();
          endTime = new Date(this.listConditions.timeRange[1]).getTime();
        }
        collectRepayment(
          {
            startTime: startTime,
            endTime: endTime,
            status: this.listConditions.value,
            minAmount: this.listConditions.minAmount,
            maxAmount: this.listConditions.maxAmount,
            page: index,
            size: 10
          },
          "GET"
        ).then((res)=>{
          console.log(res)
          this.currentList = res.data.data
          this.listTotalNumber = res.data.total
        })
      },
      searchClick() {
        this.getList(1)
      },
      repaymentReview( repaymentId, type ) {
        if(type === 1) {
          this.title = "确认还款"
        } else {
          this.title = "拒绝还款"
        }


        this.$prompt('请输入备注', this.title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.content = value
          
          collectRepaymentAction(
            {
              repaymentId: repaymentId,
              content: this.content,
              type: type
            },
            'POST'
          ).then((res)=>{
            console.log(res)
            this.$message.success('操作成功')
            this.pageNum = 1
            this.getList(1)
          })
        }).catch(() => {
          this.$message.info('已取消')
        })

        
      },  
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      transformStatus(num){
        if(num === 0){
          return '待审核'
        } else if(num === 1){
          return '确认还款'
        } else if(num === 2){
          return '打回还款'
        }
      },
      Transformdate(obj, fmt){
        return dateFormat(obj, fmt)
      },
      disabled( status ) {
        if( status ) 
          return true
        else return false
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getList(1)
    }
  }
</script>
<style lang="scss" scoped>
  .review-repayment{
    .el-row {
      margin-top: 10px;
    }
  }
</style>