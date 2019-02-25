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
				<el-table-column prop="type" label="姓名" header-align="center">
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
				<el-table-column prop="type" label="操作" header-align="center" >
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
		lookStateType: false
	  }
	},
	methods: {
	  dateFormat,
	  cloneLookState(){
		this.lookStateType = false
	  },

	  //查看报告信息
	  lookReport(id,userName,row){
	    sessionStorage.setItem('basicData',JSON.stringify(row))
		this.$router.push({path: '/orderManageDetail', query: {id: id,userName:userName,userId:row.userId}})

	  },
	  //取消
	  cancel(){
		this.auditType = false
		this.formData.orderType = ''
		this.formData.remark = ''
	  },
	  //确定
	  confirm(){
		this.$refs.ruleForm.validate((valid) =>{
		  if (valid) {
			this.httpRequest.peopleAudit({
			  lenderCaseId: this.lenderCaseId,
			  handleStatus: this.formData.orderType,
			  handleRemark: this.formData.remark,
			}).then((res) =>{
			  console.log('审核通过', res)
			  if (res.code == '00000000') {
				this.$message.success('操作完成')
				this.auditType = false
				this.getOrderList()
			  }
			})
		  }
		})
	  },
	  //审核
	  auditClick(id){
		this.auditType = true
		this.lenderCaseId = id
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

	  Trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
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
		this.httpRequest.peopleAuditlist({
		  page: index,
		  rows: 20,
		  phoneNumber: this.Trim(this.phoneNumber),
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

	}
</style>