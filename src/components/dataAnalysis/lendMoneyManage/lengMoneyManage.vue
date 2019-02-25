<template>
	<div class="lengMoneyManage">
		<el-row :gutter="6" class="block" style="display: flex;">
			<el-col :span="8">
				<el-date-picker
						v-model="times"
						type="datetimerange"
						:picker-options="pickerOptions2"
						placeholder="选择时间范围"
						align="left">
				</el-date-picker>
			</el-col>
			<el-col>
				<el-button type="success" @click="search()">搜索</el-button>
				<el-button type="warning" @click="reset()">重置</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-row>
				<el-table :data="lengMoneyList" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="日期" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.time }}</span>
						</template>
					</el-table-column>
					<el-table-column label="点击量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.click }}</span>
						</template>
					</el-table-column>
					<el-table-column label="注册量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.register }}</span>
						</template>
					</el-table-column>
					<el-table-column label="申请量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.applyTime }}</span>
						</template>
					</el-table-column>
					<el-table-column label="审核通过量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.pass }}</span>
						</template>
					</el-table-column>
					<el-table-column label="拒单量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.refuse }}</span>
						</template>
					</el-table-column>
					<el-table-column label="已放款量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.loan }}</span>
						</template>
					</el-table-column>
					<el-table-column label="已放款金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.loanMoney }}</span>
						</template>
					</el-table-column>
					<el-table-column label="到期量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.expire }}</span>
						</template>
					</el-table-column>
					<el-table-column label="到期金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.expireMoney }}</span>
						</template>
					</el-table-column>
					<el-table-column label="回款率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.backRate }}%</span>
						</template>
					</el-table-column>
					<el-table-column label="本金回款率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.benjinRate }}%</span>
						</template>
					</el-table-column>
					<el-table-column label="回款金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.backMoney }}</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.shouyuRate }}%</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.shouyuTime }}</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.shouyuMoney }}</span>
						</template>
					</el-table-column>
					<el-table-column label="剩余逾期笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.shengyuTime }}</span>
						</template>
					</el-table-column>
					<el-table-column label="剩余逾期金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.shengyuMoney }}</span>
						</template>
					</el-table-column>

				</el-table>
			</el-row>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange" :current-page.sync="pageNum"
							   layout="total, prev, pager, next" :total="listTotalNumber">
				</el-pagination>
			</el-row>
		</el-row>
		<div class="hint">总计：</div>
		<el-table :data="lendMoneySum" highlight-current-row border ref="multipleTable" style="width: 100%">
			<el-table-column label="点击量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.click }}</span>
				</template>
			</el-table-column>
			<el-table-column label="注册量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.register }}</span>
				</template>
			</el-table-column>
			<el-table-column label="申请量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.applyTime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="审核通过量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.pass }}</span>
				</template>
			</el-table-column>
			<el-table-column label="拒单量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.refuse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="已放款量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.loan }}</span>
				</template>
			</el-table-column>
			<el-table-column label="已放款金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.loanMoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="到期量" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.expire }}</span>
				</template>
			</el-table-column>
			<el-table-column label="到期金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.expireMoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="回款金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.backMoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="首逾笔数" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.shouyuTime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="首逾金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.shouyuMoney }}</span>
				</template>
			</el-table-column>
			<el-table-column label="剩余逾期笔数" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.shengyuTime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="剩余逾期金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.shengyuMoney }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
  import {dateFormat} from "../../../common/util";

  export default {
	data(){
	  return {
		pickerOptions2: {
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
		times: '',
		pageNum: 1,
		listTotalNumber: 0,
		lendMoneySum: [],
		lengMoneyList: []
	  }
	},
	methods: {
	  dateFormat,
	  search(){
		this.getList()
	  },
	  reset(){
		this.times = ''
		this.getList()
	  },
	  getList(index = 1){
		this.httpRequest.vLoanStatistics({
		  page: index,
		  rows: 10,
		  endDate: this.times[1] ? this.dateFormat(new Date(parseInt(this.times[1].getTime())), 'yyyyMMdd') : '',
		  beginDate: this.times[0] ? this.dateFormat(new Date(parseInt(this.times[0].getTime())), 'yyyyMMdd') : '',
		}).then((res) =>{
		  console.log('借款列表', res)
		  if (res.code == '00000000') {
			this.lendMoneySum = []
			this.lengMoneyList = res.data.vLoanStatistics.list
			this.listTotalNumber = res.data.vLoanStatistics.total
			if(res.data.vLoanStatisticsSum){
			  this.lendMoneySum.push(res.data.vLoanStatisticsSum)
			}
		  }
		})
	  },
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  }
	},

	activated(){
	  this.getList()
	}
  }
</script>

<style lang="scss" scoped>
	.lengMoneyManage {
		.hint {
			line-height: 40px;
			font-size: 20px;
			font-weight: bold;
		}
	}

</style>