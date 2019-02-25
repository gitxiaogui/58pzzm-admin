<template>
	<div class="overdueDetail">
		<el-tabs v-model="activeName">
			<el-tab-pane label="基本信息" name="basic">
				<el-row>
					<el-table class="list-table" :data="overdueList" border style="width: 100%">
						<el-table-column prop="userName" label="姓名" header-align="center"></el-table-column>
						<el-table-column prop="idCard" label="身份证号" header-align="center"></el-table-column>
						<el-table-column prop="phoneNumber" label="手机号" header-align="center"></el-table-column>
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
						<el-table-column prop="beginTime" label="放款日期" header-align="center">
							<template scope="scope">
								<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.beginTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="type" label="周期" header-align="center">
							<template scope="scope">
								<span style="margin-left: 10px">{{ scope.row.period }}{{ periodSpanOptions[scope.row.periodSpan] }}</span>
							</template>
						</el-table-column>

					</el-table>
				</el-row>
				<el-row>
					<el-table class="list-table" :data="overdueList" border style="width: 100%">
						<el-table-column prop="amount" label="应还总金额" header-align="center">
							<template scope="scope">
								<span style="margin-left: 10px">{{ scope.row.amount | numberToFixed }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="endTime" label="应还款日期" header-align="center">
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
						<el-table-column prop="endTime" label="创建时间" header-align="center">
							<template scope="scope">
								<span style="margin-left: 10px">{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="bankName" label="银行名称" header-align="center"></el-table-column>
						<el-table-column prop="bankAccount" label="银行卡号" header-align="center"></el-table-column>
					</el-table>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="remarkTitle">　备注</div>
						<el-input :autosize="{minRows: 4, maxRows: 10}" type="textarea" v-model="remark"
								  placeholder="请输入内容"></el-input>
						<el-button @click="saveReamrk()">保存备注</el-button>
					</el-col>
				</el-row>
			</el-tab-pane>
			<!--审核状态-->
			<el-tab-pane label="审核状态" name="auditType">
				<div class="lookState">
					<div class="table_top">
						<!--<el-table class="list-table" :data="basicData" highlight-current-row border style="width: 100%"
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
						</el-table>-->
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
		<div class="btn" @click="btnClick()" v-if="showBtn"><img src="../../../assets/return.png" alt=""></div>
	</div>

</template>

<script>
  import {Loading} from 'element-ui'
  import {splitArray, dateFormat} from '@/common/util'
  import {orderUserManage} from '@/common/formRules.js'
  import eleme from '../orderMessageManage/eleme.vue'
  import youfen_crime_info from '../orderMessageManage/youfen_crime_info.vue'
  import youfen_bank_union from '../orderMessageManage/youfen_bank_union.vue'
  import sauRon from '../orderMessageManage/sauRon.vue'
  import youfen_full_check from '../orderMessageManage/youfen_full_check.vue'
  import hulu from '../orderMessageManage/hulu.vue'
  import zhongzhicheng from '../orderMessageManage/zhongzhicheng.vue'
  import tongdun_antifraud_info from '../orderMessageManage/tongdun_antifraud_info.vue'
  import fahai from '../orderMessageManage/fahai.vue'
  import $ from 'jquery'

  export default {
	data(){
	  return {
		activeName: 'basic',
		overdueList: [],
		periodSpanOptions: {'0': '无', '1': '日', '2': '周', '3': '月', '4': '年'},
		userList: [{name: '新客', id: '1'}, {name: '老客', id: '2'}],
		disabledType: true,
		remark: '',
		lookStateList: [],
		detailList:[],
		dataType:false,
		showBtn:false,
		userId: '',
		id: '',
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
	  fahai
	},
	methods: {
	  btnClick(){
		$('.content-container').animate({scrollTop: 0}, 300);
	  },
	  handleScroll(){
		//console.log($('.content-container').scrollTop())
		let scrollTop = $('.content-container').scrollTop()
		if (scrollTop > 200) {
		  this.showBtn = true
		} else {
		  this.showBtn = false
		}
	  },

	  zhuanhua(data){
		return data == '' ? '无' : data
	  },
	  dateFormat,
	  //保存备注
	  saveReamrk(){
		this.httpRequest.overDueMark({
		  caseId: this.id,
		  overDueMark: this.remark
		}).then((res) =>{
		  console.log('保存备注成功', res)
		  if (res.code == '00000000') {
			this.overdue.overDueMark = this.remark
			sessionStorage.setItem('overdueDetail', JSON.stringify(this.overdue))
			this.$message.success('操作成功')
		  }
		})
	  },
	  getUserReport(){
		let that = this
		setTimeout(function (){
		  that.dataType = true
		}, 1000)

		let loadingInstance1 = Loading.service({fullscreen: true, target: '.orderManageDetail'});
		this.httpRequest.caseBasic({
		  lenderId: this.id,
		  userId: this.userId
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
	},
	mounted(){
	  window.addEventListener('scroll', this.handleScroll, true)
	},
	activated(){
	  this.overdueList = []
	  this.id = this.$route.query.id
	  this.userId = this.$route.query.userId
	  this.overdue = JSON.parse(sessionStorage.getItem('overdueDetail'))
	  this.remark = this.overdue.overDueMark
	  this.overdueList.push(this.overdue)
	  this.getUserReport()
	  this.lookState()

	},
	filters: {
	  numberToFixed: function (a){
		return Number(a).toFixed(2)
	  }
	}
  }
</script>

<style lang="scss">
	.overdueDetail {
		.el-row {
			margin: 0;
		}
		.remarkTitle {
			line-height: 36px;
			border: 1px solid #ccc;
			margin-top: 40px;
			background: #EEF1F6;
		}
		.remarkContent {
			min-height: 200px;
			border: 1px solid #ccc;
			border-top: none;

		}
		.el-button {
			margin-top: 10px;
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
	}
</style>