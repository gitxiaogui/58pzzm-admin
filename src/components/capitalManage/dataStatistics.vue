<template>
	<div class="dataStatistics">
		<el-row :gutter="6" class="block" style="display: flex">

			<el-date-picker
					v-model="times"
					type="datetimerange"
					:picker-options="pickerOptions2"
					placeholder="选择时间范围"
					align="left">
			</el-date-picker>

			<el-col :span="4">
				<el-input v-model="invesName" placeholder="请输入资方名称" type="tel"></el-input>
			</el-col>
			<el-col :span="8">
				<el-button type="success" @click="search()">搜索</el-button>
				<el-button type="warning" @click="reset()">重置</el-button>
			</el-col>
		</el-row>

		<el-row>
		</el-row>
		<el-row>
			<el-row id="table">
				<el-table :data="dataStatisticsList" highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="资方名称" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.invesName }}</span>
						</template>
					</el-table-column>
					<!--<el-table-column label="平台名称" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.code }}</span>
						</template>
					</el-table-column>-->
					<el-table-column label="日期" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column label="新客放款笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.xkfkbs }}</span>
						</template>
					</el-table-column>
					<el-table-column label="老客放款笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.lkfkbs }}</span>
						</template>
					</el-table-column>
					<el-table-column label="放款金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.sjfkje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="到期笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.dqbs }}</span>
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
					<el-table-column label="正常回款金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.zchkje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="逾期回款金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.yqhkje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="回款总金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.hkzje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="新客首逾率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.xksyl | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="老客首逾率" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.lksyl | zhuanFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="剩余逾期笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syyqbs }}</span>
						</template>
					</el-table-column>
					<el-table-column label="剩余逾期金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.syyqje | numFilter }}</span>
						</template>
					</el-table-column>
					<el-table-column label="利润" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.lr | numFilter }}</span>
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
	</div>
</template>

<script>
  import {dateFormat} from "../../common/util";

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
		dataStatisticsList: [],
		invesName: ''
	  }
	},
	methods: {
	  dateFormat,
	  search(){
		console.log(1)
		this.getList()
	  },
	  reset(){
		this.times = ''
		this.invesName = ''
		this.getList()
	  },
	  getList(index = 1){
		this.httpRequest.investorStatistics({
		  invesName: this.invesName,
		  beginDate: this.times[0] ? this.times[0].getTime() : '',
		  endDate: this.times[1] ? this.times[1].getTime() : '',
		  pageSize: 10,
		  page: index,
		}).then((res) =>{
		  console.log('获取成功', res)
		  if (res.code == '00000000') {
			this.dataStatisticsList = res.data.data
			this.listTotalNumber = res.data.total
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
	      return '-'
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

<style lang="scss">
	.dataStatistics {
		#table {
			.cell {
				white-space: normal;
				padding:0 6px;
			}
		}

	}
</style>