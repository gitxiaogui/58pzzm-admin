<template>
	<div class="outQueryChildList">
		<el-row class="in-query-list">
      <el-table
        class="list-table"
        :data="childList"
        highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          prop="itemName"
          label="姓名"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="手机号"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
        <el-table-column
          label="出账时间"
          label-class-name="table-header-bold"
          header-align="center">
          <template scope="scope">
            <!--<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.incomeTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          label-class-name="table-header-bold"
          header-align="center">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="pageSize"
        layout="prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-row>
	</div>
</template>

<script>
  export default {
    props:['outQUeryList','dateRange','itemName','userName','userPhone'],
	data(){
	  return {
	    childList:[],
		totalNum:0,
		pageSize:1,
	  }
	},
	methods: {
      handlePageChange(){

	  },

	},
	mounted(){
		console.log(this.outQUeryList)
	}
  }
</script>

<style scoped>

</style>