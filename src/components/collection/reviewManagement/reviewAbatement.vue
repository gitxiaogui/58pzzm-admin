<template>
  <div>
    <el-row :gutter="24" class="review-abate">
      <el-col :span="6">
        <el-date-picker format='yyyy-MM-dd HH:mm:ss' v-model="listConditions.timeRange" type="datetimerange" placeholder="选择时间范围">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-input style="width: 110px;" v-model="listConditions.minDiscount" placeholder="最低还款金额"></el-input>
        <span>到</span>
        <el-input style="width: 110px;" v-model="listConditions.maxDiscount" placeholder="最高还款金额"></el-input>
      </el-col>
      <el-col :span="5">
        <el-input style="width: 110px;" v-model="listConditions.minAmount" placeholder="最低减免金额"></el-input>
        <span>到</span>
        <el-input style="width: 110px;" v-model="listConditions.maxAmount" placeholder="最高减免金额"></el-input>
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
          <template  scope="scope">
            <span style="margin-left: 10px">{{ scope.row.collectorName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="未还款金额"
          label-class-name="table-header-bold"
          header-align="center">
          <template  scope="scope">
            <span style="margin-left: 10px">{{ scope.row.discount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="减免金额"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ dateTransform(new Date(scope.row.createTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="有效期限"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ dateTransform(new Date(scope.row.expiration), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ statusTransform(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column

          label="操作"
          label-class-name="table-header-bold"
          align="center">
          <template  scope="scope">
            <el-button type="success" size="mini" :disabled="disabled( scope.row.status )" @click="abatementReview( scope.row.id, 1 )">确认</el-button>
            <el-button type="danger" size="mini" :disabled="disabled( scope.row.status )" @click="abatementReview( scope.row.id, 2)">拒绝</el-button>
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
  import { collectAbatement, collectAbatementAction } from '@/api/api'
  import { dateFormat } from '@/common/util.js'
  export default {
    data() {
      return {
        pageNum: 1,
        listTotalNumber: 0,
        currentList: [],
        options:[{
          value: '',
          label: "请选择审核状态"
        },{
          value: 0,
          label: "确认"
        },{
          value: 1,
          label: "待审核"
        },{
          value: 2,
          label: "拒绝"
        }],
        listConditions: {
          timeRange: '',
          startTime: '',
          endTime: '',
          minAmount: '',
          maxAmount: '',
          minDiscount: '',
          maxDiscount: '',
          value: ''
        }
      }
    },
    methods: {
      getList(index = this.pageNum) {
        let startTime = '';
        let endTime = '';
        if(this.listConditions.timeRange) {
          startTime = new Date(this.listConditions.timeRange[0]).getTime();
          endTime = new Date(this.listConditions.timeRange[1]).getTime();
        }
        collectAbatement(
          {
            startTime: startTime,
            endTime: endTime,
            status: this.listConditions.value,
            minAmount: this.listConditions.minAmount,
            maxAmount: this.listConditions.maxAmount,
            minDiscount: this.listConditions.minDiscount,
            maxDiscount: this.listConditions.maxDiscount,
            page: index,
            size: 10
          },
          'GET'
        ).then((res)=>{
          console.log(res)
          this.currentList = res.data.data
          this.listTotalNumber = res.data.total
        })
      },
      abatementReview( abatementId, type ) {
        if(type === 2) {
          this.title = "拒绝减免"
        } else {
          this.title = "确认减免"
        }


        this.$prompt('请输入备注', this.title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.content = value
          
          collectAbatementAction(
            {
              abatementId: abatementId,
              content: this.content,
              type: type
            },
            'POST'
          ).then((res)=>{
            console.log(res)
            this.$message.success('操作成功')
            this.getList(1)
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      },
      searchClick() {
        this.getList(1)
      },
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      disabled( status ) {
        if( status === '1' ) 
          return true
        else return false
      },
      statusTransform(num){
        if(num === 0){
          return '确认'
        } else if(num === 1){
          return '待审核'
        } else if(num === 2){
          return '拒绝'
        }
      },
      dateTransform(obj, fmt){
        return dateFormat(obj, fmt);
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getList(1)
    }
  }
</script>
<style lang="scss">
  .review-abate{
    .el-row{
      margin-top: 10px;
    }
  }
</style>