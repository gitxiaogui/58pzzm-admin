<template>
	<div class="orderManageDetail" id="orderManageDetail" ref="scollElement">

		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="基本信息" name="basic">
				<el-table class="list-table" :data="basicData" highlight-current-row border style="width: 100%"
						  sum-text>
					<el-table-column prop="type" label="来源" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.platName }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="姓名" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.userName }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="手机号" header-align="center" width="150" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.phone }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="身份证号" header-align="center" width="190" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.idCard }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="商品" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="银行" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.bankName }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="银行卡号" header-align="center" width="190" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.banAccount }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="创建时间" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="用户类型" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.customerType=='new' ? '新客' : '老客' }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="是否逾期" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.overdue }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="逾期时长" header-align="center" align="center">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.overdueDayCount }}</span>
						</template>
					</el-table-column>
				</el-table>
				<viewer :images="urlList" class="imgWrap">
					<div v-for="src in urlList">
						<img :src="src" :key="src" width="200">
					</div>
				</viewer>
				<el-row>
				<el-col :span="24">
					<div class="remarkTitle">备注</div>
					<el-input :autosize="{minRows: 4, maxRows: 6}" type="textarea" v-model="remark"
							  placeholder="请输入内容"></el-input>
					<el-button @click="saveReamrk()">保存备注</el-button>
				</el-col>
			</el-row>
			</el-tab-pane>

			<!--审核状态-->
			<el-tab-pane label="审核状态" name="auditType">
				<div class="lookState">
					<div class="table_top">
						<el-table class="list-table" :data="basicData" highlight-current-row border style="width: 100%"
								  sum-text>
							<el-table-column prop="type" label="姓名" header-align="center" align="center">
								<template scope="scope">
									<span style="margin-left: 10px;">{{ scope.row.userName }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="type" label="手机号" header-align="center" align="center">
								<template scope="scope">
									<span style="margin-left: 10px">{{ scope.row.phone }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="type" label="身份证号" header-align="center" align="center">
								<template scope="scope">
									<span style="margin-left: 10px">{{ scope.row.idCard }}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="lookStateContent" v-for="(item,index) in lookStateList" :key="index">
						<span class="dataSourceName">{{ item.dataSourceName }}：</span>
						<el-row>
							<el-table :data="item.detailList" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="规则名称" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{ zhuanhua(scope.row.ruleDetailName) }}</span>
									</template>
								</el-table-column>
								<el-table-column label="参考" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{ zhuanhua(scope.row.statusvalue) }}</span>
									</template>
								</el-table-column>
								<el-table-column label="状态" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span :class="{status_red: scope.row.status=='未通过'}">{{ zhuanhua(scope.row.status) }}</span>
									</template>
								</el-table-column>
							</el-table>
						</el-row>
					</div>
				</div>
			</el-tab-pane>

			<el-tab-pane v-for="(item,index) in detailList" :label="item.name" :name="item.code" :key="index">
				<component v-bind:is="item.code" :data="item" v-if="dataType"></component>
			</el-tab-pane>
		</el-tabs>
		<div class="btn" @click="btnClick()" v-if="showBtn"><img src="../../assets/return.png" alt=""></div>
		<div class="auditBtn" id="auditBtn" v-show="showBtnType">
			<div class="btnType green" @click="passClick()">审核通过</div>
			<div class="btnType red" @click="refuseClick()">拒单</div>
			<!--<div class="btnType blue" @click="completionClick()">补全资料</div>-->
			<!--<div class="btnType yellow" @click="alterClick()">修改资料</div>-->
		</div>

	</div>
</template>

<script>
  import {Loading} from 'element-ui'
  import {splitArray, dateFormat} from '@/common/util'
  import {orderUserManage} from '@/common/formRules.js'
  import eleme from './orderMessageManage/eleme.vue'
  import youfen_crime_info from './orderMessageManage/youfen_crime_info.vue'
  import youfen_bank_union from './orderMessageManage/youfen_bank_union.vue'
  import sauRon from './orderMessageManage/sauRon.vue'
  import youfen_full_check from './orderMessageManage/youfen_full_check.vue'
  import hulu from './orderMessageManage/hulu.vue'
  import zhongzhicheng from './orderMessageManage/zhongzhicheng.vue'
  import tongdun_antifraud_info from './orderMessageManage/tongdun_antifraud_info.vue'
  import fahai from './orderMessageManage/fahai.vue'
  import sy_black_Report from './orderMessageManage/sy_black_Report.vue'

  import $ from 'jquery'

  export default {
	data(){
	  return {
		remark: '',//备注
		imgTypeList: [
		  {name: '人脸照', id: 'userPic'},
		  {name: '身份证正面照', id: 'idCardFacePic'},
		  {name: '身份证反面照', id: 'idCardReversePic'},
		],
		formRules: orderUserManage,

		showBtnType: true,
		id: '',
		userId: '',
		activeName: 'basic',
		fullscreen: false,
		detailList: [],
		dataType: false,
		showBtn: false,
		userName: '',
		basicData: [],
		urlList: [],
		showImg: false,
		autoplay: false,
		titleType: '',
		auditType: false,
		closeModal: false,
		formData: {
		  bankName: '',
		  bankAccount: '',
		  picType: '',//替换照片类型
		  picUrl: '',
		  mark: '',
		},
		dialogType: true,
		lookStateList: [],

	  }
	},
	components: {
	  eleme,
	  youfen_crime_info,
	  youfen_bank_union,
	  sauRon,
	  youfen_full_check,
	  hulu,
	  zhongzhicheng,
	  tongdun_antifraud_info,
	  fahai,
	  sy_black_Report
	},
	destroyed(){//离开该页面需要移除这个监听的事件
	  window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
	  //修改备注
	  /*saveReamrk(){
		this.httpRequest.refuseReason({
			caseId:this.id,
		  	refuseReason:this.remark,
		}).then((res)=>{
		  console.log('修改备注成功',res)
		  if(res.code == '00000000'){
		    this.$message.success('操作成功')
		    this.getUserDetail()
		  }
		})
	  },*/
	  saveReamrk(){
		this.httpRequest.saveReason({
			caseId:this.id,
		  	refuseReason:this.remark,
		}).then((res)=>{
		  console.log('修改备注成功',res)
		  if(res.code == '00000000'){
		    this.$message.success('操作成功')
		    this.getUserDetail()
		  }
		})
	  },
	  zhuanhua(data){
		return data == '' ? '无' : data
	  },
	  //查看状态
	  lookState(){
		this.httpRequest.listAutoAudit({
		  caseId: this.id
		}).then((res) =>{
		  console.log('查看状态====', res)
		  if (res.code == '00000000') {
			this.lookStateList = res.data
			this.lookStateType = true

		  }
		})

	  },
	  //拒绝
	  refuseClick(){
		this.$prompt('请输入拒绝理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: '',
        }).then(({ value }) =>{
		  this.remark = value
		  this.saveReamrk()
		  this.httpRequest.peopleAudit({
			lenderCaseId: this.id,
			handleStatus: '0',
			handleRemark: '',
		  }).then((res) =>{
			console.log('已拒绝', res)
			if (res.code == '00000000') {
			  this.$message.success('已拒绝')
			  this.auditType = false
			  this.$router.push('/orderManage')
			}
		  })
		}).catch((err) =>{

		})
	  },
	  //通过
	  passClick(){
		this.$confirm('是否通过?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.peopleAudit({
			lenderCaseId: this.id,
			handleStatus: '1',
			handleRemark: '',
		  }).then((res) =>{
			console.log('审核通过', res)
			if (res.code == '00000000') {
			  this.$message.success('审核通过')
			  this.auditType = false
			  this.$router.push('/orderManage')
			}
		  })
		}).catch((err) =>{

		})

	  },
	  //补全
	  completionClick(){
		document.getElementById('videoForm') && document.getElementById('videoForm').reset();
		this.titleType = '补全资料'
		this.auditType = true
		this.dialogType = true
	  },
	  //修改
	  alterClick(){
		document.getElementById('videoForm') && document.getElementById('videoForm').reset();
		this.titleType = '修改资料'
		this.auditType = true
		this.dialogType = false
	  },
	  //取消
	  cancel(){
		this.auditType = false

	  },
	  //确定
	  confirm(){
		this.$refs.formData.validate((valid) =>{
		  console.log(valid)
		  this.formData.userId = this.id
		  if (this.dialogType) {
			//补全资料
			console.log(1)
		  } else {
			//修改资料
			this.httpRequest.compPic(this.formData).then((res) =>{
			  this.auditType = false
			  this.$message.success('修改成功')
			})
		  }
		})
	  },
	  dateFormat,
	  handleScroll(){
		//console.log($('.content-container').scrollTop())
		let scrollTop = $('.content-container').scrollTop()
		if (scrollTop > 200) {
		  this.showBtn = true
		} else {
		  this.showBtn = false
		}
	  },
	  handleClick(tab, event){
	  },
	  btnClick(){
		$('.content-container').animate({scrollTop: 0}, 300);

	  },
	  //查看图片
	  showPicture(id){
		this.urlList = []
		console.log(id)
		this.httpRequest.queryRealNameInfo({
		  lenderId: id
		}).then((res) =>{
		  console.log('查看证件信息', res)
		  if (res.code == '00000000') {
			this.urlList.push(res.data.idCardFacePic)
			this.urlList.push(res.data.idCardReversePic)
			this.urlList.push(res.data.userPic)
			this.showImg = true
		  }
		})
		console.log(111, JSON.stringify(this.urlList))
	  },
	  //关闭图片
	  closeMask(){
		this.showImg = false;
	  },
	  //获取数据源
	  getDetailList(){
		let that = this
		setTimeout(function (){
		  that.dataType = true
		}, 1000)

		let loadingInstance1 = Loading.service({fullscreen: true, target: '.orderManageDetail'});
		this.httpRequest.caseBasic({
		  lenderId: this.id,
		  userId:this.userId
		}).then((res) =>{
		  console.log('查看报告信息', res)
		  console.log(res.data[0])
		  if (res.code == '00000000') {
			this.detailList = res.data
			//this.activeName = res.data[0].code
			loadingInstance1.close();
		  } else {
			loadingInstance1.close();
			this.$message.error(res.message)
		  }
		}).catch((err) =>{
		  console.log('查看报告信息失败=========', err)
		  loadingInstance1.close();
		  this.$message.error(err.message)
		})
	  },
	  //获取个人基本信息
	  getUserDetail(){
		this.httpRequest.userDetail({
		  caseId: this.id
		}).then((res) =>{
		  console.log('获取个人基本信息', res)
		  if (res.code == '00000000') {
		    this.remark = res.data.refuseReason
			this.basicData = []
			this.basicData.push(res.data)
		  }
		})
	  }
	},
	mounted(){
	  window.addEventListener('scroll', this.handleScroll, true)
	  let orderManageDetail = document.getElementById('orderManageDetail')
	  let auditBtn = document.getElementById('auditBtn')
	  auditBtn.style.width = orderManageDetail.offsetWidth + 'px'

	},
	activated(){
	  this.activeName = 'basic',
	  this.id = this.$route.query.id
	  this.userId = this.$route.query.userId
	  this.userName = this.$route.query.userName
	  this.type = this.$route.query.type
	  if (this.type == '1') {
		this.showBtnType = false
	  } else {
		this.showBtnType = true
	  }
	  this.dataType = false
	  this.getDetailList()
	  this.lookState()
	  this.basicData = []
	  //this.basicData.push(JSON.parse(sessionStorage.getItem('basicData')))
	  this.showPicture(this.id)
	  this.getUserDetail()
	}
  }
</script>

<style lang="scss">
	.orderManageDetail {
		width: 100%;
		min-height: 800px;
		margin-bottom: 70px;
		.topFrom {

			.fileInput {
				border-radius: 4px;
				border: 1px solid #BFCBD9;
				padding: 5px;
			}
		}
		.el-tabs__nav {
			display: flex;
			width: 100%;
			.el-tabs__item {
				flex: 1;
				text-align: center;
			}
		}
		.btn {
			position: fixed;
			right: 40px;
			bottom: 180px;
			height: 110px;
			width: 70px;
			z-index: 9;
			color: #fff;
			img {
				height: 100%;
				width: 100%;
			}
		}
		/*.imgShowMask {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2;
			overflow-y: auto;
			.el-message-box__close {
				color: #fff;
				position: absolute;
				right: 5px;
				top: 5px;
				font-size: 24px;
			}
			.imgWrap {
				display: flex;
				position: fixed;
				bottom: 100px;
				left: 50%;
				transform: translateX(-50%);
			}
		}*/
		.imgWrap {
			border: 2px solid #ccc;
			display: flex;
			position: fixed;
			bottom: 150px;
			left: 50%;
			transform: translateX(-50%);
			img {
				display: block;
			}
		}

		.auditBtn {
			height: 70px;
			background: rgba(0, 0, 0, .3);
			position: fixed;
			bottom: 20px;
			display: flex;
			align-items: center;
			z-index: 99;
			width: auto;
			.btnType {
				cursor: pointer;
				height: 30px;
				padding: 2px 10px;
				margin: 0 15px;
				border: 1px solid transparent;
				line-height: 30px;
				text-align: center;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				font-size: 18px;
				font-weight: bold;
				position: absolute;
				top:50%;
				-webkit-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				transform: translateY(-50%);

			}
			.green {
				border-color: #1EEB2A;
				color: #1EEB2A;
				right: 100px;
			}
			.red {
				border-color: #FF3915;
				color: #FF3915;
				right: 20px;
			}
			.blue {
				border-color: #2BA1EA;
				color: #2BA1EA;
			}
			.yellow {
				border-color: #FF9800;
				color: #FF9800;
			}
		}
		.lookState {
			.table_top {
				padding: 0 20px;
			}
			p {
				text-align: center;
				line-height: 40px;
				font-size: 22px;
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
			}
			.lookStateContent {
				font-size: 16px;
				line-height: 22px;
				padding: 0 20px;
				.dataSourceName {
					line-height: 34px;
					font-size: 18px;
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
							flex: 1;
							padding: 0 4px;
							border-right: 1px solid #ccc;
							&:nth-of-type(1) {
								flex: 3;
							}
							&:nth-of-type(3) {
								border: none;
							}
						}
					}
				}
			}
			.status_red {
				color: red;
			}
		}
		.el-tabs__nav-scroll {
			overflow: auto;
		}
		.remarkTitle{
			line-height: 36px;
			font-size:16px;
			font-weight:bold;
		}
		.el-textarea{
			margin-bottom:15px;
		}
	}

</style>