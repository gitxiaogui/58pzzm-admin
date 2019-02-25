<template>
	<el-row class="loanConfirmList">
		<div>
			<el-row :gutter="6">
				<el-col :span="4">
					<el-input v-model="list.userName" placeholder="用户姓名"></el-input>
				</el-col>
				<el-col :span="4">
					<el-input v-model="list.phoneNumber" placeholder="手机号"></el-input>
				</el-col>
				<el-col :span="6">
					<el-button @click="searchForm()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="btn_wrap">
			<el-button size="small" @click="downAuditPassList">批次下载</el-button>
			<el-button type="info" size="small">批量上传</el-button>

		</div>
		<el-row>
			<el-table
					:data="currentList"
					highlight-current-row
					border
					@selection-change="addRows"
					ref="multipleTable"
					style="width: 100%">
				<el-table-column
						type="selection"
						width="55"
						align="center">
				</el-table-column>
				<el-table-column prop="orderId" label="订单编号" header-align="center" width="200"></el-table-column>
				<el-table-column
						label="用户姓名"
						header-align="center"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.userName }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="放款金额"
						header-align="center"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.lenderAmount | numFilter }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="联系方式"
						header-align="center"
						width="130"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.phoneNumber }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="银行名称"
						header-align="center"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.bankName }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="银行卡号"
						header-align="center"
						width="200"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.bankAccount }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="产品编号"
						header-align="center"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.prodCode }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="放款状态"
						header-align="center"
						label-class-name="table-header-bold">
					<template scope="scope">
						<!--<span>{{ scope.row.bankAccount }}</span>-->
					</template>
				</el-table-column>
				<el-table-column
						label="用户类型"
						header-align="center"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.customerType=='new' ? '新客' : '老客' }}</span>
					</template>
				</el-table-column>
				<el-table-column
						label="操作时间"
						header-align="center"
						width="180"
						label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ dateFormat(new Date(parseInt(scope.row.updateTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>

				<el-table-column
						label="操作"
						align="center"
						width="200"
						label-class-name="table-header-bold">
					<template scope="scope">
						<el-button type="primary" size="small" @click="confirmLoan( scope.row )">确认放款</el-button>
						<el-button type="danger" size="small" @click="sendBack( scope.row.id )">重新审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-button type="success" @click="confirmLoan()" size="small">批量放款{{ total }}条</el-button>
				<el-button type="danger" @click="sendBack()" size="small">批量重新审核{{ total }}条</el-button>
				<el-button @click="toggleSelection()" size="small">取消选择</el-button>
			</div>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination
					@current-change="handlePageChange"
					@size-change="handleSizeChange"
					:current-page.sync="pageNum"
					layout="total, prev, pager, next"
					:total="listTotalNumber">
			</el-pagination>
		</el-row>

		<el-dialog title="放款渠道选择" :visible.sync="showDialog" style="text-align: left;" size="tiny">
			<el-row style="height:300px;">
				<el-radio v-model="radio" label="1">自有资金</el-radio>
				<el-radio v-model="radio" label="2">资金方资金</el-radio>
				<el-row>
					<el-select v-if="showCapital" v-model="capitalType" placeholder="请选择资方" style="margin:30px 0;">
						<el-option
								v-for="item in capitalList"
								:key="item.id"
								:label="item.name"
								:value="item.id">
						</el-option>
					</el-select>
				</el-row>

			</el-row>
			<el-row>
				<el-col>
					<el-button type="warning" @click="cancelData()"><i class="el-icon-close"
																	   style="padding-right: 4px;"></i>取消
					</el-button>
					<el-button type="success" @click="saveData()"><i class="el-icon-check"
																	 style="padding-right: 4px;"></i>保存
					</el-button>
				</el-col>
			</el-row>

		</el-dialog>


	</el-row>
</template>
<script>
  import {financeloanConfirmList, financeLoanfinanceNotarize} from '@/api/api'
  import {dateFormat} from "@/common/util";

  export default {
	data(){
	  return {
		radio: '1',
		showDialog: false,
		currentList: null,
		pageNum: 1,
		listTotalNumber: 0,
		currentData: [],
		total: 0,
		list: {
		  userName: '',
		  phoneNumber: '',
		  id: ''
		},
		retrialData: [],
		capitalList: [],
		capitalType: '',
		showCapital: false,
		singleData: [],
		dataType: false,
	  }
	},
	filters: {
	  numFilter(value){
		return Number(value).toFixed(2)
	  }
	},
	methods: {
	  downAuditPassList(){
		//window.location.href = "/product/outputexcel/auditPassList"
		this.httpRequest.downAuditPassList({}).then((res)=>{
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
		link.setAttribute('download', '待放款名单.xlsx')
		document.body.appendChild(link)
		link.click()
	  },
	  //确定
	  saveData(){
		this.$confirm('是否确认放款?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  if (this.dataType) {
			this.singleData[0].investorId = this.capitalType
		  } else {
			this.currentData.forEach((item, index) =>{
			  item.investorId = this.capitalType
			})
		  }
		  this.httpRequest.loanFinanceConfirm({
			data: this.dataType ? this.singleData : this.currentData,
		  }).then((res) =>{
			if (res.code === '00000000') {
			  this.$message.success('放款确认成功');
			  this.getList(1)
			}
			this.showDialog = false
		  }).catch((res) =>{
			this.showDialog = false
		  })
		}).catch(() =>{
		  this.$message.info('已取消')
		})
	  },
	  //取消
	  cancelData(){
		this.showDialog = false
		this.radio = '1'
		this.capitalType = ''
	  },
	  //重新审核
	  sendBack(id){
		this.$confirm('是否确认打回审核?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{

		  if (id) {
			this.retrialData.push({id: id})
		  } else if (this.retrialData.length === 0) {
			this.$message.error('请至少选择一条');
			return;
		  }
		  this.httpRequest.retrial({
			data: this.retrialData
		  }).then((res) =>{
			console.log('打回审核', res)
			if (res.code == '00000000') {
			  this.$message.success('操作成功')
			  this.getList()
			}
		  })
		}).catch(() =>{
		  this.$message.info('已取消')
		})
	  },
	  dateFormat,
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  //初始化
	  getList(index = this.pageNum){
		this.httpRequest.auditPassList(
			{
			  userName: this.list.userName,
			  phoneNumber: this.list.phoneNumber,
			  status: '4',
			  page: index,
			  rows: 10,
			}
		).then((res) =>{
		  console.log(res)
		  this.currentList = res.data.list;
		  this.listTotalNumber = res.data.total;
		})
	  },
	  //放款
	  confirmLoan(item){
		this.showDialog = true
		this.singleData = [];
		if (item) {
		  this.dataType = true
		  this.singleData = [{
			lenderCaseId: item.id,
			userName: item.userName,
			phoneNumber: item.phoneNumber,
			channelId: item.channelId
		  }]
		} else if (this.currentData.length === 0) {
		  this.$message.error('请至少选择一条记录');
		  return;
		}
	  },
	  toggleSelection(rows){
		if (rows) {
		  rows.forEach(row =>{
			this.$refs.multipleTable.toggleRowSelection(row);
		  });
		} else {
		  this.$refs.multipleTable.clearSelection();
		}
	  },
	  addRows(val){
		this.dataType = false
		this.total = val.length
		let rows = [];
		let retrialData = [];
		val.forEach((item, index) =>{
		  retrialData.push({
			id: item.id
		  })
		  rows.push({
			lenderCaseId: item.id,
			userName: item.userName,
			phoneNumber: item.phoneNumber,
			channelId: item.channelId
		  })
		})
		this.retrialData = retrialData
		this.currentData = rows;
	  },
	  handleSizeChange(val){
		console.log(`每页 ${val} 条`);
	  },
	  searchForm(){
		this.getList(1)
	  },
	  replacement(){
		this.list.userName = ''
		this.list.phoneNumber = ''
		this.getList(1)
	  },
	  getcapitalList(){
		this.httpRequest.getValidInvestors({
		  pageNum: 1,
		  pageSize: 100,
		}).then((res) =>{
		  console.log('借款列表', res)
		  if (res.code == '00000000') {
			this.capitalList = res.data.list
		  }
		})
	  },
	},
	watch: {
	  radio: function (b){
		console.log(this.showCapital)
		console.log(b)
		if (b == 2) {
		  this.showCapital = true
		} else {
		  this.showCapital = false

		}
		console.log(this.showCapital)
	  }
	},
	activated(){
	  Object.assign(this.$data, this.$options.data.call(this))
	  this.getList(1)
	  this.getcapitalList()
	}
  }
</script>
<style lang="scss">
	.loanConfirmList {
		.btn_wrap {
			margin: 15px 5px;
		}
	}
</style>