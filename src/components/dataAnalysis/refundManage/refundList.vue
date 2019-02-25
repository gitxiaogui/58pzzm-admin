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
				<el-select v-model="diversionCode" placeholder="请选择放款平台">
					<el-option
							v-for="item in refunddata"
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
			<el-table :data="refundList" highlight-current-row border ref="multipleTable" style="width: 100%"
					  @row-click="getreturnedMoney">
				<el-table-column type="expand">
					<template scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<RefundChildList :refundData.once="props.row" :time.once="stateTime"></RefundChildList>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="导流平台" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.diversion_name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="回款率" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.returnRate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="入催率" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.overRate }}</span>
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
  import RefundChildList from './refundChildList'

  export default {
	components: {
	  RefundChildList
	},
	data(){
	  return {
	    refunddata:[],
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
		orgList: [],
		diversionCode: '',
		refundList: [],
		pageNum: 1,
		listTotalNumber: 0,
	  }
	},
	methods: {
	  search(){
		this.getList()
	  },
	  reset(){
	    this.diversionCode = ''
		this.stateTime = ''
		this.channelName = ''
		this.getList()
	  },
	  getreturnedMoney(row, event, column){
		if (column.type === "expand") {
		  this.caseListLenderId = row.id;
		  console.log('打印当前id', this.caseListLenderId)
		  event.stopPropagation();
		  return false;
		}
	  },
	  //分页
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  getList(index=1){
		this.httpRequest.getListChannel({
			page:index,
		  rows:10,
		  endTime:this.stateTime[1] ? this.stateTime[1].getTime() : '',
		  beginTime:this.stateTime[0] ? this.stateTime[0].getTime() : '',
		  diversion_flag:this.diversionCode,
		}).then((res)=>{
		  console.log('获取回款列表=====',res)
		  this.refundList = res.data.list
		  this.listTotalNumber = res.data.total
		})
	  },
	  getPlatformList(){
	    this.httpRequest.getDiversionList({
		  	row:1000,
		  	page:0,
		}).then((res)=>{
			console.log('获取平台列表',res)
		  if(res.code === '00000000'){
			  this.refunddata = res.data.list
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