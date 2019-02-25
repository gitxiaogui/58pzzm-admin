<template>
	<el-row class="in-query-list">
		<el-row>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-date-picker
							v-model="dateRange"
							type="datetimerange"
							placeholder="选择日期范围">
					</el-date-picker>
				</el-col>
				<el-col :span="4">
					<el-input v-model="itemName" placeholder="科目名称"></el-input>
				</el-col>
				<!--<el-col :span="4">
					<el-input v-model="userName" placeholder="姓名"></el-input>
				</el-col>
				<el-col :span="4">
					<el-input v-model="userPhone" placeholder="手机号"></el-input>
				</el-col>-->
			</el-row>
			<el-row>
				<el-button @click="getList()" icon="search" type="info">搜索</el-button>
				<el-button @click="replacement()" type="warning">重置</el-button>
			</el-row>
		</el-row>
		<el-row class="in-query-list">
			<el-table
					class="list-table"
					:data="currentData"
					highlight-current-row
					border
					@row-click="getreturnedMoney"
					style="width: 100%">
				<!--<el-table-column type="expand">
					<template scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<InqueryChildList :outQUeryList.once="props.row" :dateRange="dateRange" :itemName="itemName"
											  :userName="userName" :userPhone="userPhone"></InqueryChildList>
						</el-form>
					</template>
				</el-table-column>-->
				<el-table-column
						label="入账时间"
						label-class-name="table-header-bold"
						header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.incomeTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column
						prop="itemName"
						label="科目名称"
						label-class-name="table-header-bold"
						header-align="center">
				</el-table-column>
				<el-table-column
						prop="finaceItemCode"
						label="财务科目编号"
						label-class-name="table-header-bold"
						header-align="center">
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
					:current-page.sync="nowPage"
					layout="total, prev, pager, next"
					:total="totalNum">
			</el-pagination>
		</el-row>
	</el-row>
</template>

<script>
  import {dateFormat} from '@/common/util.js'
  import {prodInQuery} from '@/api/api'
  import InqueryChildList from './inQueryChildList'

  export default {
	components: {
	  InqueryChildList
	},
	data(){
	  return {
		totalNum: 0,
		nowPage: 1,
		currentData: [],
		dateRange: '',
		itemName: '',
		userName: '',
		userPhone: '',
	  }
	},
	activated(){
	  this.totalNum = 0;
	  this.nowPage = 1;
	  this.dateRange = "";
	  this.itemName = "";
	  this.currentData = []
	  this.getList()
	},
	methods: {
	  replacement(){
		this.dateRange = "";
		this.itemName = "";
		this.getList()
	  },
	  getreturnedMoney(row, event, column){
		if (column.type === "expand") {
		  this.caseListLenderId = row.id;
		  event.stopPropagation();
		  return false;
		}
	  },
	  dateFormat,
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  getList(index = 1){
		prodInQuery(
			{
			  page: index,
			  rows: 10,
			  beginDate: new Date(this.dateRange[0]).getTime() || '',
			  endDate: new Date(this.dateRange[1]).getTime() || '',
			  itemName: this.itemName
			}
		).then((res) =>{
		  console.log(res)
		  this.currentData = res.prodInFinaceRecordList.list
		  this.totalNum = res.prodInFinaceRecordList.total
		})
	  }
	}
  }
</script>

<style lang="scss" scoped>
	.in-query-list {
		.el-card {
			margin-bottom: 10px;
			.el-row {
				margin-bottom: 10px;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
