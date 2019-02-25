<template>
	<div class="overdueManage">
		<el-row>
			<el-row :gutter="6" style="display: flex;">
				<el-date-picker
						v-model="timeData"
						type="daterange"
						align="left"
						placeholder="选择日期范围"
						:picker-options="pickerOptions">
				</el-date-picker>
				<el-col :span="4">
					<el-input v-model="userName" placeholder="姓名"></el-input>
				</el-col>
				<el-col :span="4">
					<el-input v-model="phoneNumber" placeholder="手机号"></el-input>
				</el-col>
				<el-col :span="4">
					<el-select placeholder="请选择用户类型" value-key="id" v-model="userType">
						<el-option v-for="item in userList" :key="item.id" :label="item.name"
								   :value="item"></el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-col :gutter="10">
				<el-button @click="download()">批次下载</el-button>
				<el-button @click="search()" type="info" icon="search">搜索</el-button>
				<el-button @click="replacement()" type="warning">重置</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table class="list-table" :data="overdueList" @selection-change="addRows" border ref="multipleTable"  style="width: 100%">
				<!--<el-table-column type="selection" width="55"></el-table-column>-->
				<el-table-column prop="orderId" label="订单编号" header-align="center" width="200"></el-table-column>
				<el-table-column prop="userName" label="姓名" header-align="center"></el-table-column>
				<el-table-column prop="idCard" label="身份证号" header-align="center" width="190"></el-table-column>
				<el-table-column prop="phoneNumber" label="手机号" header-align="center" width="130"></el-table-column>
				<el-table-column prop="customerType" label="用户类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.customerType=='new' ? '新客' : '老客' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="principal" label="借贷金额" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.principal | numberToFixed }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="beginTime" label="放款日期" header-align="center" width="190">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.beginTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="周期" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.period }}{{ periodSpanOptions[scope.row.periodSpan] }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="amount" label="应还总金额" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.amount | numberToFixed }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="endTime" label="应还款日期" header-align="center" width="190">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.endTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="overdueDayCount" label="逾期天数" header-align="center"></el-table-column>
				<el-table-column prop="overfee" label="罚息" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.overfee | numberToFixed }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="principal" label="是否为黑名单" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.isBlackList }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="date" label="操作" header-align="center" width="290">
					<template scope="scope">
						<el-button @click="lookDetail(scope.row)" type="info" size="small">查看详情</el-button>
						<el-button v-if="scope.row.isBlackList=='否'" @click="addBlackList(scope.row.id)" type="danger"
								   size="small">加入黑名单
						</el-button>
						<el-button size="small" type="warning" @click="repayment(scope.row.id)">还款记录</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
		<div style="margin-top: 20px">
			<!--<el-button type="success" @click="confirmLoan()" size="small">批量下载{{ total }}条</el-button>-->
			<!--<el-button @click="toggleSelection()" size="small">取消选择</el-button>-->
		</div>

		<el-dialog title="还款记录" :visible.sync="showRepayment">
			<el-table :data="repaymentList" border style="width: 100%">
				<el-table-column label="还款时间">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="还款方式">
					<template scope="scope">
						<span style="margin-left: 10px">{{ repatmentType[scope.row.channel] }}</span>
					</template>
				</el-table-column>
				<el-table-column label="还款金额(元)">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.amount}}</span>
					</template>
				</el-table-column>
				<el-table-column label="请求结果">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.result}}</span>
					</template>
				</el-table-column>
				<el-table-column label="失败原因">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.resultReason}}</span>
					</template>
				</el-table-column>
			</el-table>

		</el-dialog>

	</div>
</template>

<script>
  import {dateFormat} from "@/common/util";

  export default {
	data(){
	  return {
		timeData: '',
		userName: '',
		userIdcard: '',
		phoneNumber: '',
		userType: '',
		periodSpanOptions: {'0': '无', '1': '日', '2': '周', '3': '月', '4': '年'},
		userList: [{name: '新客', id: '1'}, {name: '老客', id: '2'}],
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
		overdueList: [],
		overdurData: [],
		listTotalNumber: 0,
		pageNum: 1,
		total: 0,
		repaymentList: [],
		showRepayment: false,
		repatmentType: {'0': '连连支付', '1': '支付宝', '2': '宝付', '3': '微信支付', '4': '对公账户', '5': '扫码', '8': '易宝',}
	  }
	},

	methods: {
	  // 查看还款记录
	  repayment(lenderCaseId){
		this.httpRequest.amountList({
		  lenderCaseId: lenderCaseId
		}).then((res) =>{
		  if (res.code == '00000000') {
			this.repaymentList = res.data
			this.showRepayment = true
		  }
		  console.log('=========================还款记录', res)
		})
	  },
	  //每行单选添加
	  addRows(val){
		this.total = val.length
		this.overdurData = []
		val.forEach((item, index) =>{
		  this.overdurData.push({id: item.id})
		})
		console.log(JSON.stringify(this.overdurData))
	  },
	  //取消选择
	  toggleSelection(rows){
		if (rows) {
		  rows.forEach(row =>{
			this.$refs.multipleTable.toggleRowSelection(row);
		  });
		} else {
		  this.$refs.multipleTable.clearSelection();
		}
	  },
	  //加入黑名单
	  addBlackList(id){
		this.$confirm('是否加入黑名单?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.BlackList({
			caseId: id
		  }).then((res) =>{
			console.log('加入黑名单成功', res)
			if (res.code == '00000000') {
			  this.$message.success('操作成功')
			  this.getOverdueList()
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});

	  },
	  dateFormat,
	  //下载文件
	  download(){
		this.httpRequest.rechargeMainExcel({
		  params: {
			phoneNumber: this.phoneNumber,
			userName: this.userName,
			status: '7',
			beginDate: this.timeData[0] ? this.timeData[0].getTime() : '',
			endDate: this.timeData[1] ? this.timeData[1].getTime() : ''
		  }
		}).then((res) =>{
		  console.log('下载逾期列表', res)
		  this.downloadT(res)
		})
	  },
	  // 下载文件
	  downloadT(data){
		if (!data) {
		  return
		}
		let url = window.URL.createObjectURL(new Blob([data]))
		let link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', 'excel.xlsx')
		document.body.appendChild(link)
		link.click()
	  },
	  //搜索
	  search(){
		this.getOverdueList()
	  },
	  //重置
	  replacement(){
		this.phoneNumber = ''
		this.userName = ''
		this.timeData = ''
		this.getOverdueList()
	  },
	  //查看详情
	  lookDetail(row){
		sessionStorage.setItem('overdueDetail', JSON.stringify(row))
		this.$router.push({path: '/overduvDetail', query: {id: row.id,userId:row.userId}})
	  },

	  getOverdueList(index = 1){
		this.httpRequest.overduelist({
		  page: index,
		  rows: 10,
		  phoneNumber: this.phoneNumber,
		  userName: this.userName,
		  beginDate: this.timeData[0] ? this.timeData[0].getTime() : '',
		  endDate: this.timeData[1] ? this.timeData[1].getTime() : '',
		}).then((res) =>{
		  console.log('获取逾期列表', res)
		  this.overdueList = res.data.list
		  this.listTotalNumber = res.data.total
		})
	  },
	  changePaging(pageNum){
		this.getOverdueList(pageNum);
	  },
	},
	activated(){
	  this.getOverdueList()
	},
	filters: {
	  numberToFixed: function (a){
		return Number(a).toFixed(2)
	  }
	}
  }
</script>

<style lang="scss">
	.overdueManage {
		.el-col-24 {
			margin: 15px 0;
		}

	}

</style>