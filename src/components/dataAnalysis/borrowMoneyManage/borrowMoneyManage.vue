<template>
	<el-row>
		<el-row :gutter="8" style="display: flex;">
			<div class="block">
				<el-date-picker
						v-model="stateTime"
						type="datetimerange"
						:picker-options="pickerOptions2"
						placeholder="选择时间范围"
						align="left">
				</el-date-picker>
			</div>
			<el-col :span="4">
				<el-input v-model="userName" placeholder="请输入借款人名称"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-button type="success" @click="search()">搜索</el-button>
			<el-button type="warning" @click="reset()">重置</el-button>
			<!--<el-button style="float: right;" type="info">导出excel</el-button>-->
		</el-row>
		<!--列表区域-->
		<el-row>
			<el-table :data="borrowMoneyData" highlight-current-row border ref="multipleTable" style="width: 100%">

				<el-table-column label="借款人" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.userName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="类型" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.customerType=='new' ? '新客' : '老客' }}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单状态" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.statusName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="金额" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.lenderAmount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单时间" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{   Transformdate(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="是否逾期" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.overdueDayCount>0 ? '是' : '否' }}</span>
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
</template>

<script>
	import { dateFormat } from '@/common/util.js'
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
		stateTime: '',
	    pageNum:1,
		listTotalNumber:0,
		borrowMoneyData:[],
		userName:'',
	  }
	},
	methods: {
	  search(){
		this.getList()
	  },
	  reset(){
	    this.stateTime = ''
		this.userName = ''
		this.getList()
	  },
	  Transformdate(obj, fmt){
				return dateFormat(obj, fmt);
			},
	  //分页
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  getList(index=1){
		this.httpRequest.getCaseBasicList({
			page:index,
		  	rows:10,
		  	endDate:this.stateTime[1] ? this.stateTime[1].getTime() : '',
		  	beginDate:this.stateTime[0] ? this.stateTime[0].getTime() : '',
		  userName:this.userName
		}).then((res)=>{
		  console.log('获取借款统计列表',res)
		  if(res.code == '00000000'){
		    this.borrowMoneyData = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  }
	},
	activated(){
		this.getList()
	}
  }
</script>

<style scoped>

</style>