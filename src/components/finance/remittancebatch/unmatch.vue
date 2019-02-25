<template>
    <el-row class="product-list">
	    <el-table
	      class="list-table"
	      :data="notmatchingData"
	      highlight-current-row
	      border
	      style="width: 100%">
	       <el-table-column
	        label="账务流水号">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="业务流水号">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        prop="type"
	        label="商户订单号">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="商品名称">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="发生时间">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="对方账号">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="收入金额">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="支出金额">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="账户余额">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="交易渠道">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="业务类型">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="备注">
	        <template scope="scope">
	          <span style="margin-left: 10px">{{}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column
	        label="回款状态">
	        <template scope="scope">
	          <el-col>
	            <el-button
	                size="small"
	                type="info"
	                @click="">确认回款</el-button>
	            </el-col>
	        </template>
	      </el-table-column>
	    </el-table>
	    <el-row class='thenmatch' type="flex" justify="center">
	      <el-pagination
	        @current-change=""
	        :current-page.sync="notpageNum"
	        layout="prev, pager, next"
	        :total="notlistTotalNumber">
	      </el-pagination>
       </el-row>
    </el-row>
</template>
<script>
  //import { paymentconfirmData,referpaymentconfirmData} from '@/api/api'
  export default {
    data() {
      return {
      	notmatchingData:[],
      	notpageNum:1,
      	notlistTotalNumber:0,
      	 
      }
    },
    methods:{
     
    	
  }
 }
</script>

<style lang="scss" scoped>
  .loan-chart {
    .el-row{
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .el-card {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .thenmatch{
  	margin-top: 20px;
  	margin-bottom: 200px;
  }
</style>