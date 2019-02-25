<template>
	<div class="expireManage">
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
							<span>{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column label="到期笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.dqs }}</span>
						</template>
					</el-table-column>
					<el-table-column label="到期金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.dqje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="回款率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.hkl | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="本金回款率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.bjhkl | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="回款金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.hkje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syl | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.sybs }}</span>
						</template>
					</el-table-column>
					<el-table-column label="首逾金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="剩余逾期笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syyqhkbs }}</span>
						</template>
					</el-table-column>
					<el-table-column label="剩余逾期金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syyqhkje | numFilter }}</span>
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
			<el-table-column label="到期笔数" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totaldqs }}</span>
				</template>
			</el-table-column>
			<el-table-column label="到期金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totaldqje | numFilter }}</span>
				</template>
			</el-table-column>
			<el-table-column label="回款金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totalhkje | numFilter }}</span>
				</template>
			</el-table-column>
			<el-table-column label="首逾笔数" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totalsybs }}</span>
				</template>
			</el-table-column>
			<el-table-column label="首逾金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totalsyje | numFilter }}</span>
				</template>
			</el-table-column>
			<el-table-column label="剩余逾期笔数" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totalsyyqhkbs }}</span>
				</template>
			</el-table-column>
			<el-table-column label="剩余逾期金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.totalsyyqhkje | numFilter }}</span>
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
		this.httpRequest.expire({
		  page: index,
		  pageSize: 10,
		  endDate: this.times[1] ? this.times[1].getTime(): '',
		  beginDate: this.times[0] ? this.times[0].getTime() : '',
		}).then((res) =>{
		  console.log('借款列表', res)
		  if (res.code == '00000000') {
			this.lendMoneySum = []
			this.lengMoneyList = res.data.detail.data
			this.listTotalNumber = res.data.detail.total
			if(res.data.total){
			  this.lendMoneySum = res.data.total
			}
		  }
		})
	  },
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  }
	},
	filters: {
	  numFilter(value){
	    if(value){
	      return value ? Number(value).toFixed(2) : ''
		}else{
	      return 0
		}
	  },
	  zhuanFilter(value){
		return Number(value*100).toFixed(2)+'%'
	  }
	},
	activated(){
	  this.getList()
	}
  }
</script>

<style lang="scss" scoped>
	.expireManage {
		.hint {
			line-height: 40px;
			font-size: 20px;
			font-weight: bold;
		}
	}

</style>