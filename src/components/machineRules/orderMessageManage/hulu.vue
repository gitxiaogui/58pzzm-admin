<template>
	<div class="creditMessageDetail">
		<div>
			<div >
				<div class="contentDetail">
					<!--基本信息-->
					<div class="basicInformation detail"><p>基本信息</p></div>
					<div class="basicInformations" style="padding: 5px 5px;">
						<el-row>
							<el-table :data="basicData" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="姓名" header-align="center"
												 label-class-name="table-header-bold" align="center">
									<template scope="scope">
										<span>{{ scope.row.real_name }}</span>
									</template>
								</el-table-column>
								<el-table-column label="性别" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.gender }}</span>
									</template>
								</el-table-column>
								<el-table-column label="年龄" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.age }}</span>
									</template>
								</el-table-column>
								<el-table-column label="星座" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.sign }}</span>
									</template>
								</el-table-column>
								<el-table-column label="身份证状态" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.status ? '有效':'无效' }}</span>
									</template>
								</el-table-column>
								<!--<el-table-column label="报告时间" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.binding_time }}</span>
									</template>
								</el-table-column>-->
								<el-table-column label="身份证号" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.id_card_num }}</span>
									</template>
								</el-table-column>
								<el-table-column label="出生地区" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.state }}</span>
									</template>
								</el-table-column>
							</el-table>
						</el-row>
					</div>
					<!--<ul class="secondLevelUl">
						<li>姓名</li>
						<li>性别</li>
						<li>年龄</li>
						<li>星座</li>
						<li>身份证状态</li>
						<li>报告时间</li>
						<li>身份证号</li>
						<li>出生地区</li>
					</ul>
					<ul class="secondLevelUl secondLevelUlTwo">
						<li>{{this.basicName}}</li>
						<li>{{this.basicSex}}</li>
						<li>{{this.basicAge}}</li>
						<li>{{this.basicConstellation}}</li>
						<li>{{this.basicStatus = true?'有效':'无效'}}</li>
						<li>{{Transformdate(new Date(parseInt(this.basiccreateTime)), 'yyyy-MM-dd hh:mm:ss')}}</li>
						<li>{{this.basicIdcard}}</li>
						<li>{{this.basicRegion}}{{this.basicCounty}}</li>
					</ul>-->
					<div class="separate"></div>
					<!--绑定数据源信息-->
					<div class="basicInformation detail">
						<p>绑定数据源信息</p>
					</div>
					<div class="basicInformations" style="padding: 5px 5px;">
						<el-row>
							<el-table :data="dataoriginData" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="运营商名称" header-align="center"
												 label-class-name="table-header-bold" align="center">
									<template scope="scope">
										<span>{{ scope.row.name }}</span>
									</template>
								</el-table-column>
								<el-table-column label="手机号" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.account }}</span>
									</template>
								</el-table-column>
								<el-table-column label="实名认证" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.reliability }}</span>
									</template>
								</el-table-column>
								<el-table-column label="绑定时间" header-align="center" label-class-name="table-header-bold"
												 align="center">
									<template scope="scope">
										<span>{{ scope.row.binding_time }}</span>
									</template>
								</el-table-column>
							</el-table>
						</el-row>
					</div>
					<div class="separate"></div>
					<!--申报信息核查-->
					<div class="basicInformation detail"><p>申报信息核查</p></div>
					<div class="basicInformations basicInformationsUlLi" style="padding: 5px 5px;">
						<ul>
							<li v-for="items in informationcheckingData"
								v-if="items.result != '未绑定'&& items.result != '无数据' && items.check_point != '是否提交登记号码信息' && items.check_point != '身份证号码是否有效' && items.check_point != '是否呼叫过工作电话' && items.check_point != '是否呼叫过住所电话' ">
								<p>{{items.check_point}}：<span>{{items.result}}</span></p>
								<!--<p>依据：{{items.evidence}}</p>
								<p>标记：{{ caseChannelType[Number(items.score)] }}</p>-->
							</li>
						</ul>
					</div>
					<div class="separate"></div>
					<!--行为检测-->
					<div class="basicInformation detail"><p>行为检测</p></div>
					<div class="basicInformations" style="padding: 5px 5px;">
						<ul class="secondLevelUl secondLevelUlOne" >
							<li>分析点</li>
							<li>结果</li>
							<li>证据</li>
						</ul>
						<ul>
							<behaviordetectionData v-for="items in behaviordetectionData" :behaviordetection='items'
												   v-if="items.check_point != '120话通话情况'&&items.result != '无数据'"></behaviordetectionData>

						</ul>
					</div>
					<div class="separate"></div>
					<!--联系人区域汇总-->
					<div class="basicInformation detail">
						<div @click="linkmanClick" style="display: flex;align-items: center;">
							<span class="detail"><p>联系人区域汇总</p></span>
							<span style="line-height: 1rem;margin-left:10px;"><i :class=" linkmanShow ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"><!--{{ linkmanShow ? '&#xe606;' : '&#xe60d;' }}--></i></span>
						</div>
						<!--<div @click="changelinkmanClick" v-show="linkmanShow" style="display: flex;">
							<span class="basicInformationspan" style="flex: 1;">联系人区域汇总</span>
							<span style="line-height: 1rem;"><i class="my_iconfont">&#xe606;</i></span>
						</div>-->
					</div>
					<div>

						<div class="basicInformations " style="padding: 5px 5px;">
							<el-table :data="linkmanData" height="300px" v-show="linkman">

								<el-table-column fixed prop="region_loc" label="地区名称" width="180"></el-table-column>
								<el-table-column prop="region_uniq_num_cnt" label="号码数量" width="180"></el-table-column>
								<el-table-column prop="region_call_in_cnt" label="电话呼入次数" width="180"></el-table-column>
								<el-table-column prop="region_call_out_cnt" label="电话呼出次数"
												 width="180"></el-table-column>

							</el-table>
						</div>

					</div>
					<div class="separate"></div>
					<!--运营商数据整理-->
					<div class="basicInformation detail">
						<div @click="operatorClick" style="display: flex;align-items: center;">
							<span class="detail"><p>运营商数据整理</p></span>
							<span style="line-height: 1rem;margin-left:10px;"><i :class=" operatorShow ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i></span>
						</div>
					</div>
					<div>
						<!--<p v-show="basicswipeLeft" style="width: 80px;height: 20px;background-color: #b1b1b1;text-align: center;border-radius: 20px;margin-left: 60%;line-height: 20px;"><i class="my_iconfont" style="font-size: .5rem;color: white;">&#xe609;左滑更多</i></p>-->
						<div class="basicInformations " style="padding: 5px 5px;">


							<el-table :data="operatorData" style="width: 100%" height="400" v-show="operator">

								<el-table-column fixed prop="cell_mth" label="月份" width="150"></el-table-column>
								<el-table-column prop="call_cnt" label="呼叫次数" width="120"></el-table-column>
								<el-table-column prop="call_out_cnt" label="主叫次数" width="120"></el-table-column>
								<el-table-column prop="call_in_cnt" label="被叫次数" width="120"></el-table-column>
								<el-table-column prop="call_out_time" label="主叫时间（分）" width="120">
									<template scope="scope"> {{ scope.row.call_out_time.toFixed(2) }}</template>
								</el-table-column>
								<el-table-column prop="call_in_time" label="被叫时间（分）" width="120">
									<template scope="scope"> {{ scope.row.call_in_time.toFixed(2) }}</template>
								</el-table-column>
								<el-table-column prop="sms_cnt" label="短信数目" width="120"></el-table-column>
								<el-table-column prop="total_amount" label="话费消费(元)" width="120">
									<template scope="scope"> {{ scope.row.total_amount.toFixed(2) }}</template>
								</el-table-column>

							</el-table>


						</div>
					</div>
					<div class="separate"></div>
					<!--通话详情-->
					<div v-if="this.jurisdictionData != 'user'">
						<div class="basicInformation detail">
							<div @click="particularsClick" style="display: flex;align-items: center;">
								<span class="detail"><p>通话详情</p></span>
								<!--<span style="line-height: 1rem;margin-left:10px;"><i :class=" particularsShow ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i></span>-->
							</div>

						</div>
						<div>
							<div @scroll="handleScroll" class="basicInformations">
								<el-table :data="operatorparticularsData" style="width: 100%" height="450"
										  ><!--v-show="particularsShow"-->
									<el-table-column
											fixed
											prop="phone_num"
											label="号码"
											width="150">
									</el-table-column>
									<el-table-column
											prop="phone_num_loc"
											label="号码归属地"
											width="120">
									</el-table-column>
									<el-table-column
											prop="contact_name"
											label="号码标注"
											width="120">
									</el-table-column>
									<el-table-column
											prop="needs_type"
											label="需求类别"
											width="120">
									</el-table-column>
									<el-table-column
											prop="call_cnt"
											label="通话次数"
											sortable
											width="120">
										<template scope="scope"> {{ scope.row.call_cnt }}</template>

									</el-table-column>
									<el-table-column
											prop="call_len"
											label="通话时长"
											sortable
											width="120">
										<template scope="scope"> {{ scope.row.call_len.toFixed(2) }}</template>
									</el-table-column>
									<el-table-column
											prop="call_out_cnt"
											label="呼出次数"
											width="120">
									</el-table-column>
									<el-table-column
											prop="call_out_len"
											label="呼出时间"
											width="120">
										<template scope="scope"> {{ scope.row.call_out_len.toFixed(2) }}</template>
									</el-table-column>

									<el-table-column
											prop="call_in_len"
											label="呼入时间"
											width="120">
										<template scope="scope"> {{ scope.row.call_in_len.toFixed(2) }}</template>
									</el-table-column>
									<el-table-column
											prop="p_relation"
											label="关系推测"
											width="120">
									</el-table-column>
									<el-table-column
											prop="contact_1w"
											label="最近一周联系次数"
											width="180">
									</el-table-column>
									<el-table-column
											prop="contact_1m"
											label="最近一月联系次数"
											width="180">
									</el-table-column>
									<el-table-column
											prop="contact_3m_plus"
											label="三个月以上联系次数"
											width="180">
									</el-table-column>
									<el-table-column
											prop="contact_early_morning"
											label="凌晨联系次数"
											width="180">
									</el-table-column>
									<el-table-column
											prop="contact_morning"
											label="上午联系次数"
											width="180">
									</el-table-column>

									<el-table-column
											prop="contact_noon"
											label="中午联系次数"
											width="180">
									</el-table-column>

									<el-table-column
											prop="contact_afternoon"
											label="下午联系次数"
											width="180">
									</el-table-column>

									<el-table-column
											prop="contact_night"
											label="晚上联系次数"
											width="120">
									</el-table-column>

									<el-table-column
											prop="contact_all_day"
											label="是否全天联系"
											width="120">
										<template scope="scope"> {{ scope.row.contact_all_day =="true"? "是":"否" }}
										</template>

									</el-table-column>

									<el-table-column
											prop="contact_weekday"
											label="周中联系次数"
											width="120">
									</el-table-column>

									<el-table-column
											prop="contact_weekend"
											label="周末联系次数"
											width="120">
									</el-table-column>

									<el-table-column
											prop="contact_holiday"
											label="节假日联系次数"
											width="140">
									</el-table-column>
								</el-table>
							</div>
						</div>
					</div>
					<!--主要服务-->
					<div class="basicInformation" style="border-bottom: 1px solid #d0d0d0;"
						 v-if="primaryserviceData > 0">
						<div @click="primaryserviceClick" v-show="!primaryserviceShow" style="display: flex;">
							<span class="basicInformationspan" style="flex: 1;">主要服务</span>
							<span style="line-height: 1rem;"><i class="my_iconfont">&#xe60d;</i></span>
						</div>
						<div @click="changeprimaryserviceClick" v-show="primaryserviceShow" style="display: flex;">
							<span class="basicInformationspan" style="flex: 1;">主要服务</span>
							<span style="line-height: 1rem;"><i class="my_iconfont">&#xe606;</i></span>
						</div>
					</div>

					<div class="basicInformations autosroll" style="padding: 5px 5px;" v-if="primaryserviceData > 0">
						<ul v-show="primaryservice">
							<li v-for="(items,index) in primaryserviceData"
								style="margin-bottom: 5px;border-bottom:1px solid #d0d0d0;">
								<p>企业名称：{{items.company_name}}</p>
								<p>服务企业类型：{{items.company_type}}</p>
								<p>总互动次数：{{items.total_service_cnt}}</p>
								<ul class='ulBooen' style="margin-bottom: 2px;">
									<li style="font-size: 0.5rem;">月互动详情</li>
									<li v-for="ites in primaryserviceData[index].service_details">
										<p>月互动次数:{{ites.interact_cnt}}</p>
										<p>互动月份:{{ites.interact_mth}}</p>
									</li>
								</ul>

							</li>
						</ul>
					</div>
					<!--出行分析-->
					<div class="basicInformation" style="border-bottom: 1px solid #d0d0d0;"
						 v-if="gettingaroundData > 0">
						<div @click="basicInsClick" v-show="!basicInsShow" style="display: flex;">
							<span class="basicInformationspan" style="flex: 1;">出行分析</span>
							<span style="line-height: 1rem;"><i class="my_iconfont">&#xe60d;</i></span>
						</div>
						<div @click="changeInformaClick" v-show="basicInsShow" style="display: flex;">
							<span class="basicInformationspan" style="flex: 1;">出行分析</span>
							<span style="line-height: 1rem;"><i class="my_iconfont">&#xe606;</i></span>
						</div>
					</div>
					<div v-if="gettingaroundData > 0" class="basicInformations autosroll" style="padding: 5px 5px;">
						<ul v-show="basicInformat">
							<li v-for="(items,index) in gettingaroundData"
								style="margin-bottom: 5px;border-bottom:1px solid #d0d0d0;">
								<p>出发地：{{items.trip_leave}}</p>
								<p>目的地：{{items.trip_dest}}</p>
								<p v-for="its in gettingaroundData[index].trip_transportation">出行工具：{{its}}</p>
								<p v-for="itsperson in gettingaroundData[index].trip_person">同行人：{{itsperson}}</p>
								<p>出行时间类型：{{items.trip_type}}</p>
								<p>出行开始时间：{{items.trip_start_time}}</p>
								<p>出行结束时间：{{items.trip_end_time}}</p>
								<p v-for="itsdata in gettingaroundData[index].trip_data_source">数据来源：{{itsdata}}</p>
							</li>
						</ul>
					</div>
					<div class="without">没有更多数据了......</div>
				</div>
			</div>
			<!--<div v-else="!this.overalsituationData" style="text-align: center;margin: 10px 0px;font-size: 16px;">
				未进行此项报告验证
			</div>-->

		</div>
	</div>
</template>

<script>
  import {dateFormat, sortArrayByKey, caseChannelType} from '@/common/util.js'
  import { Toast, Indicator } from 'mint-ui'
  import $ from 'jquery'
import behaviordetectionData from './behaviordetectionData.vue'
  export default {
	//props:['data'],
	props:{
		data:{
		  type:Object
		}
	},
	/*watch:{
	  data(newVal,oldVal){
		if(newVal.code){
		  alert(2)
		  this.huluData = newVal
	      this.getData()
		}else{
		  alert(1)
		  this.huluData = this.data.data.data.data
		}
	    console.log(444,newVal)
	    console.log(222,oldVal)
		//this.showType = true
	    //this.huluData = val
	  },
	   deep:true
	},*/
	components:{
	  behaviordetectionData
	},
	data(){
	  return {

		mationsswipeLeft: false,
		basicswipeLeft: false,
		swipeLeft: false,
		basicInformat: false,
		basicInsShow: false,
		primaryserviceShow: false,
		primaryservice: false,
		particularsShow: false,
		particulars: false,
		operatorShow: false,
		operator: false,
		linkman: false,
		linkmanShow: false,
		basicInforma: false,
		informatIonchecking: false,
		basicSex: '',
		basicName: '',
		basicAge: '',
		basicIdcard: '',
		basicRegion: '',
		basicCounty: '',
		basiccreateTime: '',
		basicConstellation: '',
		basicStatus: true,
		informationcheckingData: [],
		behaviordetectionData: [],
		linkmanData: [],
		dataoriginData: [],
		operatorData: [],
		operatorparticularsData: [],
		primaryserviceData: [],
		ncommerceData: [],
		gettingaroundData: [],
		ZhimaCredit: '',
		jurisdictionData: '',
		overalsituationData: '',
		scroll: '',
		loading: false,
		caseChannelType,

		huluData:[],
		basicData:[]
	  }
	},
	directives: {
	  sortArray: function (el, binding, vnode){
		el.classList.add('sort')
		el.onclick = function (){
		  el.classList.toggle('up')
		  const sortBy = el.classList.contains('up')
		  vnode.context.handleSort(binding.expression, sortBy)
		}
	  }
	},
	methods: {
	  handleSort(key, sortBy){
		this.operatorparticularsData = sortArrayByKey(key, this.operatorparticularsData, sortBy)

		console.log(this.operatorparticularsData, 21)
	  },
	  handleScroll(event){
		const ele = this.$refs.headlineLi
		const leftLength = event.target.scrollLeft
		ele.style.left = `-${leftLength}px`
	  },
	  changeInformaClick(){
		this.basicInformat = false;
		this.basicInsShow = false;
	  },
	  basicInsClick(){
		this.basicInformat = true;
		this.basicInsShow = true;
	  },
	  changeprimaryserviceClick(){
		this.primaryserviceShow = false;
		this.primaryservice = false;
	  },
	  primaryserviceClick(){
		this.primaryserviceShow = true;
		this.primaryservice = true;
	  },
	  particularsClick(){
		this.particularsShow = !this.particularsShow;
		this.particulars = !this.particulars;
		this.mationsswipeLeft = !this.mationsswipeLeft;
	  },
	  operatorClick(){
		this.operatorShow = !this.operatorShow;
		this.operator = !this.operator;
		this.basicswipeLeft = !this.basicswipeLeft;
	  },
	  linkmanClick(){
		this.linkman = !this.linkman;
		this.linkmanShow = !this.linkmanShow;
		this.swipeLeft = !this.swipeLeft;
	  },

	  Transformdate(obj, fmt){
		return dateFormat(obj, fmt);
	  },
	getData(){
	    if (this.huluData.person) {
				this.basicData.push(this.huluData.person)
			}
			if (this.huluData.application_check) {
			  this.informationcheckingData = this.huluData.application_check;
			}
			if (this.huluData.data_source) {
			  this.dataoriginData = this.huluData.data_source;
			}
			if (this.huluData.behavior_check) {
			  this.behaviordetectionData = this.huluData.behavior_check;
			  console.log('行为检测=========9999999999999999999', this.behaviordetectionData);
			}
			if (this.huluData.contact_region) {
			  this.linkmanData = this.huluData.contact_region;
			}
			if (this.huluData.cell_behavior) {
			  for (var i = 0; i < this.huluData.cell_behavior.length; i++) {
				this.operatorData = this.huluData.cell_behavior[i].behavior;
			  }
			}
			if (this.huluData.contact_list) {
			  this.operatorparticularsData = this.huluData.contact_list;
			  console.log('通话详情============', this.operatorparticularsData)
			}
			if (this.huluData.trip_info) {
			  this.gettingaroundData = this.huluData.trip_info;
			}
			if (this.huluData.deliver_address) {
			  this.ncommerceData = this.huluData.deliver_address;
			}
			if (this.huluData.main_service) { //主要服务
			  this.primaryserviceData = this.huluData.main_service;
			}
	}
	},
	mounted(){
	  console.log(333,this.data.data.data.data)
	  //console.log(this.data)
	  this.huluData = this.data.data.data.data
		console.log(this.huluData)
			if (this.huluData.person) {
				this.basicData.push(this.huluData.person)

			}
			if (this.huluData.application_check) {
			  this.informationcheckingData = this.huluData.application_check;
			}
			if (this.huluData.data_source) {
			  this.dataoriginData = this.huluData.data_source;
			}
			if (this.huluData.behavior_check) {
			  this.behaviordetectionData = this.huluData.behavior_check;
			  console.log('行为检测=========9999999999999999999', this.behaviordetectionData);
			}
			if (this.huluData.contact_region) {
			  this.linkmanData = this.huluData.contact_region;
			}
			if (this.huluData.cell_behavior) {
			  for (var i = 0; i < this.huluData.cell_behavior.length; i++) {
				this.operatorData = this.huluData.cell_behavior[i].behavior;
			  }
			}
			if (this.huluData.contact_list) {
			  this.operatorparticularsData = this.huluData.contact_list;
			  console.log('通话详情============', this.operatorparticularsData)
			}
			if (this.huluData.trip_info) {
			  this.gettingaroundData = this.huluData.trip_info;
			}
			if (this.huluData.deliver_address) {
			  this.ncommerceData = this.huluData.deliver_address;
			}
			if (this.huluData.main_service) { //主要服务
			  this.primaryserviceData = this.huluData.main_service;
			}
	},
  }
</script>

<style lang="scss">
	.creditMessageDetail {
		font-size: 16px;
		font-family: "微软雅黑";
		line-height: 1.5em;
	}

	.el-tabs {
		//padding-top:10px;
		.el-tabs__nav-scroll {
			display: flex;
		}
		.el-tabs__nav {
			width: 100%;
			display: flex;
			.el-tabs__item {
				flex: 1;
				min-width: 120px;
				padding: 0 10px 10px;
				text-align: center;
				height: 60px;
				line-height: 60px;
				font-size: 18px;
			}
			.is-active {
				font-size: 18px;
				color: #000;
				font-weight: 800;
			}
		}
	}

	.mint-tab-item-label {
		font-size: 1.4rem;
	}

	.mint-navbar {
		display: flex;
	}

	.mint-tab-item {
		flex: 1;
		cursor: pointer;
		text-align: center;
		text-decoration: underline;
	}

	.mint-indexsection-index {
		font-size: .8rem;
	}

	.contentDetail {
		font-size: 16px;
		padding: 10px;
		text-align: left;
		.detail {
			padding: 10px 0;
			p {
				font-size: 18px;
			}
			.titleSpan {
				font-size: 18px;
			}
			.titleSpanBottom {
				padding-left: 10px;
			}
			.secondLevel {
				padding: 0;
				div {
					display: flex;
					align-items: center;
				}
			}
			.secondLevelTitle {
				font-size: 16px;
				line-height: 40px;
			}
		}
		.secondLevelUl {
			display: flex;
			background: #eff2f7;
			border: 1px solid #eaeefb;
			li {
				border-right: 1px solid #ccc;
				flex: 1;
				word-break: break-all;
				min-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				&:nth-last-child(1) {
					border: 0;
				}
			}
		}
		.secondLevelUlTwo {
			background: #fff;
		}
		.separate {
			height: 10px;
			margin: 10px 0;
			background: #f1f1f1;
		}
	}

	.mint-indexlist-indicator {
		width: 100px;
	}

	.report {
		width: 100%;
	}

	.reportContent {

		font-size: 16px;
		padding-left: 30px;

	}

	.reportContentp {
		color: #333333;
	}

	.reportContentpp {
		font-size: 16px;
		color: burlywood;
	}

	.basicInformation {
		width: 100%;
		height: 2rem;
	}

	.basicInformationspan {
		font-size: 1.3rem;
		color: #333333;
		line-height: 1.8rem;
		font-weight: normal;
	}

	.basicInformations {
		//width: 100%;
		font-size: 15px;

	}

	.basicInformationsUlLi {
		ul {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 0 20px 60px 0;

			justify-content: space-between;
			li {
				width: 450px;
				line-height: 40px;
				p {
					span {
						font-weight: 600;
					}
				}
			}
		}
	}

	.without {
		font-size: 0.5rem;
		color: gainsboro;
		text-align: center;
		margin: 20px 0px;
	}

	.headlineLi span {
		width: 150px;
		padding-left: 20px;
		display: inline-block;
	}

	.headlineLi span.sort {
		color: #000;
		text-decoration: underline;
		cursor: pointer;
	}

	.headlineLi span.sort::after {
		content: '∨';
	}

	.headlineLi span.sort.up::after {
		content: '∧';
	}

	.headlineLi {
		padding-bottom: 15px;
		border-bottom: 1px solid #d0d0d0;
		background: #fff;
		font-size: .5rem;
		color: darkgrey;
		padding-top: 10px;
	}

	.contentLi span {
		width: 150px;
		padding-left: 20px;
		display: inline-block;
	}

	.monthData span {
		width: 120px;
		padding-left: 20px;
		display: inline-block;
	}

	.monthLi span {
		width: 120px;
		padding-left: 20px;
		display: inline-block;
	}

	.districtData {
		padding-bottom: 15px;
		border-bottom: 1px solid #d0d0d0;
		font-size: .2rem;
		color: darkgrey;
		padding-top: 10px;
	}

	.districtData span {
		width: 100px;
		padding-left: 20px;
		display: inline-block;
	}

	.districtLi span {
		width: 100px;
		padding-left: 20px;
		display: inline-block;

	}

	.autosroll {
		height: 300px;
		overflow-y: scroll;
	}
</style>
