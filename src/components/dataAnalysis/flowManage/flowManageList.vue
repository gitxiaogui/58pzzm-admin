<template>
	<el-row>
		<el-row :gutter="8" style="display: flex;">
			<!--<div class="block">
				<el-date-picker
						v-model="stateTime"
						type="datetimerange"
						:picker-options="pickerOptions2"
						placeholder="选择时间范围"
						align="left">
				</el-date-picker>
			</div>-->
			<el-col :span="4">
				<el-select v-model="diversionCode" placeholder="请选择导流平台">
					<el-option
							v-for="item in flowList"
							:key="item.diversionCode"
							:label="item.diversionName"
							:value="item.diversionCode">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-button type="success" @click="search()">搜索</el-button>
			<el-button type="warning" @click="reset()">重置</el-button>
			<!--<el-button style="float: right;" type="info">导出excel</el-button>-->
		</el-row>
		<!--列表区域-->
		<el-row>
			<el-table :data="flowData" highlight-current-row border ref="multipleTable" style="width: 100%">

				<el-table-column label="导流平台" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.diversionName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="点击量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.count }}</span>
					</template>
				</el-table-column>
				<el-table-column label="注册量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.customerNum }}</span>
					</template>
				</el-table-column>
				<el-table-column label="过件率" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.passPercent*100 | numberToFixed }}%</span>
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
		//stateTime: '',
	    pageNum:1,
		listTotalNumber:0,
		flowList:[],
		flowData:[],
		diversionCode:'',

	  }
	},
	filters: {
	  numberToFixed: function (a){
		return Number(a).toFixed(2)
	  }
	},
	methods: {
	  search(){
	    this.getList()
	  },
	  reset(){
		//this.stateTime = ''
		this.diversionCode = ''
		this.getList()
	  },
	  //分页
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  getList(index=0){
		this.httpRequest.getChannelCountList({
			page:index,
		  	rows:10,
		  	diversionFlag:this.diversionCode,
		}).then((res)=>{
		  console.log('获取流量统计列表',res)
		  if(res.code == '00000000'){
		    this.flowData = res.data.list
		  	this.listTotalNumber = res.data.total
		  }
		})
	  },
	  getPlatformList(){
	    this.httpRequest.getDiversionList({
		  	row:1000,
		  	page:0,
		}).then((res)=>{
			console.log('获取导流列表',res)
		  if(res.code === '00000000'){
			  this.flowList = res.data.list
		  }
		})
	  }
	},
	activated(){
		this.getList()
	  this.getPlatformList()
	}
  }
</script>

<style scoped>

</style>