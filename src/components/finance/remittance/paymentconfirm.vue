<template>
	<div class="">
		<h3 style="margin-top: 0px;">回款确认列表 </h3>
		<div>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input v-model="userName" placeholder="请输入用户名"></el-input>
				</el-col>
				<el-col :span="6">
					<el-input v-model="phoneNumber" placeholder="请输入手机号"></el-input>
				</el-col>
				<!--<el-col :span="6">
					<el-input v-model="borrowmoneyId" placeholder="请输入借款ID"></el-input>
				</el-col>-->
				<el-col :span="6">
					<el-date-picker format='yyyy-MM-dd HH:mm:ss' v-model="returnTime" type="datetimerange"
									placeholder="选择时间范围">
					</el-date-picker>
				</el-col>
			</el-row>
			<el-row>
				<el-button @click="nquireBorrowmoney" type="info" icon="search">搜索</el-button>
				<el-button @click="replacement()" type="warning">重置</el-button>
			</el-row>
		</div>
		<el-row>
			<el-table class="list-table" highlight-current-row :data="remittancedata" border
					  @row-click="getreturnedMoney" @selection-change="handleSelectionChange" style="width: 100%">
				<!--<el-table-column type="expand">
					<template scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<h5>回款记录</h5>
							&lt;!&ndash;<keep-alive>&ndash;&gt;
							<returnedmoneyList :dataToChild.once="props.row.id">
							</returnedmoneylist>
							&lt;!&ndash;</keep-alive>&ndash;&gt;
						</el-form>
					</template>
				</el-table-column>-->
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="orderId" label="订单编号" header-align="center" width="200"></el-table-column>
				<el-table-column label="用户名">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.userName}}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="回款金额" width="150">
					<template scope="scope">
						<span style="margin-left: 10px">{{Number(scope.row.amount).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="借款人手机号">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.phoneNumber}}</span>
					</template>
				</el-table-column>
				<el-table-column label="产品编号">
					<template scope="scope">
						<span style="margin-left: 10px">{{scope.row.prodCode}}</span>
					</template>
				</el-table-column>
				<!--<el-table-column
	          label="财务确认">
	          <template scope="scope">
	            <span style="margin-left: 10px">{{scope.row.aStatus === 0 ? '待入财务表':'财务确认失败'}}</span>
	          </template>
	        </el-table-column>-->
				<!--<el-table-column
	          label="回款渠道">
	          <template scope="scope">
	            <span style="margin-left: 10px">{{ judgeCalculate(scope.row.channel,chnagge)}}</span>
	          </template>
	        </el-table-column>-->
				<el-table-column label="到期时间">
					<template scope="scope">
						<span style="margin-left: 10px">{{ Transformdate(new Date(parseInt(scope.row.endTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120">
					<template scope="scope">
						<el-col>
							<el-button size="small" type="info" @click="affirmReturnedmoney(scope.row)">确认回款</el-button>
						</el-col>
					</template>
				</el-table-column>
				<el-table-column label="人工处理" width="220">
					<template scope="scope">
						<el-col>
							<el-button size="small" type="warning" @click="repayment(scope.row.id)">还款记录</el-button>
							<el-button size="small" type="success">实际还款金额</el-button>
						</el-col>
					</template>
				</el-table-column>
			</el-table>
			<el-button style='margin-top: 20px;' size="small" type="success" @click="ALLaffirmReturnedmoney">批量确认回款<span
					style="font-size: 16px;color: greenyellow;padding: 2px;">{{getNum}}</span>个
			</el-button>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination :current-page.sync="remittancePage" @current-change="changPagediscard"
						   layout="total, prev, pager, next" :total="totalNumber">
			</el-pagination>
		</el-row>

		<el-dialog title="还款记录" :visible.sync="showRepayment">
			<el-table :data="repaymentList" border style="width: 100%">
				<el-table-column label="还款时间">
					<template scope="scope">
						<span style="margin-left: 10px">{{ Transformdate(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
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
			<!--<el-row type="flex" justify="center">
				<el-pagination :current-page.sync="repaymentPage" @current-change="repaymentChange"
							   layout="total, prev, pager, next" :total="repaymentTotalr">
				</el-pagination>
			</el-row>-->
		</el-dialog>


	</div>
</template>
<script>
  import {returnedmoneyRecord, referpaymentconfirmData} from '@/api/api'
  import {dateFormat} from '@/common/util.js'
  import returnedmoneyList from '@/components/finance/remittance/returnedmoneyList'
  import Bus from '@/eventBus'

  export default {
	components: {
	  returnedmoneyList
	},
	data(){
	  return {
		remittancePage: 1,
		repaymentPage: 1,
		remittancedata: [],
		totalNumber: 0,
		repaymentTotalr: 0,
		selection: 0,
		listMap: [],
		getscoperowData: '',
		chnagge: '',
		userName: '',
		phoneNumber: '',
		borrowmoneyId: '',
		returnTime: '',
		caseListLenderId: '',

		showRepayment: false,
		repaymentList: [],
		repatmentType: {'0': '连连支付', '1': '支付宝', '2': '宝付', '3': '微信支付', '4': '对公账户', '5': '扫码', '8': '易宝',}
	  }
	},
	methods: {
	  // 还款记录分页
	  /*repaymentChange(pageNum){
		//this.getpaymentconfirmList(pageNum)
	  },*/
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
	  replacement(){
		this.userName = ''
		this.phoneNumber = ''
		this.borrowmoneyId = ''
		this.returnTime = ''
		this.getpaymentconfirmList()
	  },
	  getreturnedMoney(row, event, column){
		if (column.type === "expand") {
		  this.caseListLenderId = row.id;
		  console.log('222222222222222222222222回款记录ID', this.caseListLenderId);
		  event.stopPropagation();
		  return false;
		}
	  },
	  //log(arg) {console.log('--------------时间',arg);return arg;},
	  handleSelectionChange(selection){
		this.selection = selection;
		console.log('批量回款selection=================================', this.selection);
		this.listMap = [];
		for (let i = 0; i < this.selection.length; i++) {
		  console.log('时间=======================', this.getscoperowData)
		  this.listMap.push({
			'id': this.selection[i].id,
			'amount': Number(this.selection[i].amount).toFixed(2)
		  });
		}
		console.log(this.listMap)
	  },
	  affirmReturnedmoney(row){
		this.listMap = []
		this.listMap.push({
		  'id': row.id,
		  'amount': Number(row.amount).toFixed(2)
		});

		this.$confirm('此操作将确认回款申请, 是否继续?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.passive({
			data: this.listMap
		  }).then((res) =>{
			console.log('汇款确认成功', res)
			this.getpaymentconfirmList()
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消'
		  });
		});
	  },
	  ALLaffirmReturnedmoney(){
		if (this.selection.length > 0) {
		  this.$confirm('此操作将确认回款申请, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		  }).then(() =>{
			this.httpRequest.passive({
			  data: this.listMap
			}).then((res) =>{
			  console.log(res)
			  if (res.code === '00000000') {
				this.$message.success('操作成功')
				this.getpaymentconfirmList()
				this.selection = [];
			  }
			})
		  }).catch(() =>{
			this.$message({
			  type: 'info',
			  message: '已取消',
			});
		  });
		} else {
		  this.$message({
			message: '请选择后再进行操作！',
			type: 'warning'
		  });
		}
	  },
	  changPagediscard(pageNum){
		this.getpaymentconfirmList(pageNum)
	  },
	  getpaymentconfirmList(index = 1){
		this.httpRequest.returnList({
		  page: index,
		  rows: 10,
		  status: '6',
		  userName: this.userName,
		  phoneNumber: this.phoneNumber,
		  id: this.borrowmoneyId,
		  beginDate: new Date(this.returnTime[0]).getTime(),
		  endDate: new Date(this.returnTime[1]).getTime(),
		}).then((res) =>{
		  console.log('=========================回款确认更改的', res)
		  if (res.code === '00000000') {
			this.remittancedata = res.data.list
			this.totalNumber = res.data.total
		  }
		})
	  },
	  Transformdate(obj, fmt){
		return dateFormat(obj, fmt)
	  },
	  nquireBorrowmoney(){
		this.remittancePage = 1;
		return this.getpaymentconfirmList();
	  },
	},
	created(){
	  Bus.$on('returnedmoneyRecord', () =>{
		this.getpaymentconfirmList()
	  });
	},
	activated(){
	  this.userName = ''
	  this.phoneNumber = ''
	  this.borrowmoneyId = ''
	  this.returnTime = ''
	  this.getpaymentconfirmList();
	},
	computed: {
	  getNum(){
		if (this.selection.length > 0) {
		  return this.selection.length;
		}
		return 0
	  },
	},

  }
</script>

<style lang="scss">
	.el-table__expanded-cell {
		background-color: #b2e2dd6e;
	}
</style>