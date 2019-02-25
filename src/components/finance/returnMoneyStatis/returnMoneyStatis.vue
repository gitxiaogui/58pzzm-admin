<template>
	<div class="returnMoneyStatis">
		<div class="block">
			<el-date-picker
					v-model="times"
					type="daterange"
					align="left"
					@change="aaa"
					placeholder="选择日期范围"
					:picker-options="pickerOptions">
			</el-date-picker>
			<el-button @click="search()" type="info">搜索</el-button>
			<el-button @click="replace()" type="warning">重置</el-button>
		</div>
		<el-row>
			<!--列表区域-->
			<el-row>
				<el-table :data="lengMoneyList" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="日期" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column label="放款笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.fks }}</span>
						</template>
					</el-table-column>
					<el-table-column label="放款本金" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.benjin | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="放款合同金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.htj | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="正常还款" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.zchk | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="逾期还款" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.yqhk | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="逾期费" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.fx | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="总回款" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.totalMoney | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syl | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="本金回款率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.bjhkl | numFilter }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="pageChange" :current-page.sync="pageNum"
							   layout="total, prev, pager, next" :total="totalNumber">
				</el-pagination>
			</el-row>
		</el-row>
	</div>
</template>

<script>
  import {dateFormat} from "../../../common/util";

  export default {
	data(){
	  return {
		totalNumber: 0,
		pageNum: 1,
		returnMoneyData: [],
		times: '',
		pickerOptions: {
		  shortcuts: [{
			text: '最近一周',
			onClick(picker){
			  const end = new Date();
			  const start = new Date();
			  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			  picker.$emit('pick', [start, end]);
			}
		  }, {
			text: '最近一个月',
			onClick(picker){
			  const end = new Date();
			  const start = new Date();
			  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			  picker.$emit('pick', [start, end]);
			}
		  }, {
			text: '最近三个月',
			onClick(picker){
			  const end = new Date();
			  const start = new Date();
			  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			  picker.$emit('pick', [start, end]);
			}
		  }]
		},
		lengMoneyList: [],

	  }
	},
	methods: {
	  aaa(){
		if (this.times) {
		  let a = this.times[0].getTime()
		  let b = this.times[1].getTime()
		  let c = b - a
		  if (c > 30 * 24 * 60 * 60 * 1000) {
			this.$message.error('起始时间间隔不能超过30天')
			return
		  }
		}

	  },

	  dateFormat,
	  search(){
		this.getList()
	  },
	  replace(){
		this.times = ''
		this.getList()
	  },
	  //初始化数据
	  getList(index = 1){

		this.httpRequest.rePayment({
		  page: index,
		  pageSize: 10,
		  endDate: this.times[1] ? this.times[1].getTime() : '',
		  beginDate: this.times[0] ? this.times[0].getTime() : '',
		}).then((res) =>{
		  console.log('借款列表', res)
		  if (res.code == '00000000') {
			this.lendMoneySum = []
			this.lengMoneyList = res.data.detail.data
			this.totalNumber = res.data.detail.total
		  }
		})
	  },
	  pageChange(pageNum){
		this.getList(pageNum)
	  }
	},
	filters: {
	  numFilter(value){
		return Number(value*100).toFixed(2)+'%'
	  },
	  zhuanFilter(value){
		if(value){
	      return value ? Number(value).toFixed(2) : ''
		}else{
	      return 0
		}
	  }
	},

	activated(){
	  this.getList()
	}
  }
</script>

<style lang="scss" scoped>
	.returnMoneyStatis {
		.block {
			margin-bottom: 30px;
		}
	}
</style>