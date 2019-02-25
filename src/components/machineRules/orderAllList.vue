<template>
	<!--订单管理界面-->
	<div class="orderManage">
		<el-form>
			<el-row :gutter="10">
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="userName" placeholder="请输入姓名"></el-input>
				</el-col>
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="phoneNumber" placeholder="请输入手机号"></el-input>
				</el-col>
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="platName" placeholder="请输入平台名称"></el-input>
				</el-col>
				<el-col :span="10">
					<el-button @click="search()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
		</el-form>
		<el-row class="product-list">
			<el-table class="list-table" :data="orderList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="来源" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.platName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="用户类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.customerType=='new' ? '新客' : '老客' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="orderId" label="订单编号" header-align="center" width="200"></el-table-column>
				<el-table-column prop="type" label="姓名" header-align="center" >
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.userName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="手机号" header-align="center" width="150">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.phoneNumber }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="身份证号" header-align="center" width="200">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.idCard }}</span>
					</template>
				</el-table-column>

				<!--<el-table-column prop="type" label="产品" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.prodName }}</span>
					</template>
				</el-table-column>-->
				<el-table-column prop="type" label="商品" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.goods_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="是否白名单" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.isWhiteList==0 ? '否' : '是' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="创建时间" header-align="center" width="180">
					<template scope="scope">
						<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="订单状态" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dataStatus[scope.row.status] }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="type" label="操作" header-align="center">
					<template scope="scope">
						<el-button @click="lookReport(scope.row.id, scope.row.userName,scope.row)" type="primary" size="mini">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePaging" :page-size="20" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>

	</div>
</template>

<script>
  import {integralMeaaage} from '@/common/formRules'
  import {splitArray, dateFormat} from '@/common/util'

  export default {
	data(){
	  return {
		userName: '',
		phoneNumber: '',
		platName:'',
		listTotalNumber: 0,
		pageNum: 1,
		orderList: [],
		orderData: [],
		formRules: integralMeaaage,
		showImg: false,
		auditType: false,
		closeModal: false,
		autoplay: false,
		formData: {
		  orderType: '',
		  remark: '',
		},
		orderTypeList: [{name: '通过', id: 1}, {name: '拒绝', id: 0}],
		lookStateList: [],
		lookStateType: false,
		dataStatus: {
		  '0': '创建',
		  '1': '机审',
		  '2': '信审',
		  '3': '用户签署合同',
		  '4': '待放款',
		  '5': '拒绝',
		  '6': '贷中',
		  '7': '逾期',
		  '8': '机审',
		  '9': '信审',
		  '10': '用户签署合同（续期）',
		  '11': '待收款',
		  '12': '续期中',
		  '13': '续期结案确认',
		  '14': '续期结案',
		  '15': '正常结案确认',
		  '16': '正常结案',
		  '24': '信审通过'
		}
	  }
	},
	methods: {
	  dateFormat,
	  cloneLookState(){
		this.lookStateType = false
	  },
	  //查看状态
	  lookState(id){
		this.httpRequest.listAutoAudit({
		  caseId: id
		}).then((res) =>{
		  console.log('查看状态====', res)
		  if (res.code == '00000000') {
			this.lookStateList = res.data
			this.lookStateType = true
		  }
		})

	  },
	  //查看报告信息
	  lookReport(id,userName,row){
	    sessionStorage.setItem('basicData',JSON.stringify(row))
		this.$router.push({path: '/orderManageDetail', query: {id: id,userName:userName,type:'1',userId:row.userId}})

	  },
	  //取消
	  cancel(){
		this.auditType = false
		this.formData.orderType = ''
		this.formData.remark = ''
	  },

	  //查看图片
	  showPicture(id){
		this.urlList = []
		console.log(id)
		this.httpRequest.queryRealNameInfo({
		  lenderId: id
		}).then((res) =>{
		  console.log('查看证件信息', res.data)
		  if (res.code == '00000000') {
			this.urlList.push(res.data.idCardFacePic)
			this.urlList.push(res.data.idCardReversePic)
			this.urlList.push(res.data.userPic)
			this.showImg = true
		  }
		})
	  },
	  //关闭图片
	  closeMask(){
		this.showImg = false;
	  },
	  search(){
		this.getOrderList(1)
	  },
	  replacement(){
		this.userName = ''
		this.phoneNumber = ''
		this.platName = ''
		this.getOrderList(1)
	  },
	  changePaging(pageNum){
		this.getOrderList(pageNum);
	  },
	  getOrderList(index){
		this.httpRequest.orderlist({
		  page: index,
		  rows: 20,
		  phoneNumber: this.phoneNumber,
		  userName: this.userName,
		  platName:this.platName
		}).then((res) =>{
		  console.log('获取商品列表', res)
		  this.orderList = res.data.list
		  this.listTotalNumber = res.data.total
		  /*this.orderList = splitArray(res.data.list,10)
		  this.orderData = this.orderList[0]*/
		})
	  }
	},
	activated(){
	  this.getOrderList(this.pageNum)
	}
  }
</script>

<style lang="scss">
	.imgShowMask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		overflow-y: auto;
		.imgbox {
			width: 40%;
			height: 810px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			border-radius: 5px;
			overflow: hidden;
			background: #fff;
			padding: 0 10px 10px 10px;
			.imgheader {
				line-height: 40px;
				font-weight: bold;
				i {
					float: right;
					margin-top: 10px;
				}
			}
			.imgcontent {
				//overflow-y: scroll;
				//height: 555px;
				padding: 10px;
				.imgBox {
					height: 100%;

				}
			}
			img {
				width: 100%;
			}
		}
		.lookState {
			p {
				text-align: center;
				line-height: 40px;
				font-size: 22px;
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
			}
			position: absolute;
			width: 700px;
			min-height: 600px;
			background: #fff;
			margin-left: -350px;
			left: 50%;
			top: 50%;
			margin-top: -300px;
			padding-bottom:30px;
			.lookStateContent {
				font-size: 16px;
				line-height: 22px;
				padding: 0 20px;
				.dataSourceName {
					line-height: 24px;
				}
				ul {
					margin-left: 30px;
					&:nth-of-type(1) {
						li {
							border-top: 1px solid #ccc;
						}
					}
					li {
						border: 1px solid #ccc;
						border-top: none;
						display: flex;
						span {
							flex: 3;
							padding: 0 4px;
							border-right: 1px solid #ccc;
							&:nth-of-type(1){
								flex:3;
							}
							&:nth-of-type(3){
								border:none;
							}
						}
					}
				}
			}
		}
		.el-table .cell{
			padding:6px 0;
		}
	}
</style>