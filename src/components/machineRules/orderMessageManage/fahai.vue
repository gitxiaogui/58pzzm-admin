<template>
	<div class="faYuanInFormation">
		<div>
			<div class="courtInformation" v-if="dataShow">
				<!--裁判文书-->
				<div>
					<div class="fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">裁判文书</span>
						</div>
					</div>
					<div v-show="caiPan">
						<template v-for="item in caiPanDataList">
							<div class="fanYuanContainer">
								<p><span>审结时间:</span><span>{{ item.srotTime==''? '—' :Transformdate(new Date(parseInt(item.sortTime)), 'yyyy-MM-dd hh:mm:ss')}}</span>
								</p>
								<p><span>文书类型(案件类型):</span> <span>{{zhuanhuan(item.caseType)}}</span></p>
								<div class="bodyDiv"><span>内容:</span>
									<span><span style="color:#0190fe;padding-left:0;"
												@click="caiPanBody()">查看详情</span><br/>
                                        <b v-for="item in arr" v-if="caiPanBodyShow"
										   style=" box-sizing:border-box;min-height:.5rem; display:inline-block;">
                                             <p style=" margin-left:.3rem; border:none; display:inline">{{item}}</p>
                                        </b>
                                    </span>
								</div>
								<p><span>裁判文书ID:</span> <span>{{zhuanhuan(item.cpwsId)}}</span></p>
								<p><span>审理程序:</span> <span>{{zhuanhuan(item.trialProcedure)}}</span></p>
								<p><span>法院名称:</span> <span>{{zhuanhuan(item.court)}}</span></p>
								<p><span>案由编码:</span> <span>{{zhuanhuan(item.anyou)}}</span></p>
								<div style="border:1px solid #ccc;" v-for="(ite,index) in item.partys">
									<p><span>当事人生日:</span> <span>{{zhuanhuan(ite.birthday)}}</span></p>
									<p><span>当事人称号:</span> <span>{{zhuanhuan(ite.title)}}</span></p>
									<p><span>当事人类型:</span> <span>{{zhuanhuan(ite.partyType)}}</span></p>
									<p><span>律师事务所:</span> <span>{{zhuanhuan(ite.lawOffice)}}</span></p>
									<p><span>地址:</span> <span>{{zhuanhuan(ite.address)}}</span></p>
									<p><span>当事人立场</span> <span>{{zhuanhuan(ite.status)}}</span></p>
									<p><span>当事人名称:</span> <span>{{zhuanhuan(ite.pname)}}</span></p>
									<p><span>当事人省份证号码:</span> <span>{{zhuanhuan(ite.idcardNo)}}</span></p>
									<p><span>委托辩护人:</span> <span>{{zhuanhuan(ite.lawyer)}}</span></p>
								</div>
								<p><span>标题:</span> <span>{{zhuanhuan(item.title)}}</span></p>
								<p><span>案由:</span> <span>{{zhuanhuan(item.caseCause)}}</span></p>
								<p><span>审判员:</span> <span style="text-align:left;">{{zhuanhuan(item.judge)}}</span></p>
								<p><span>案号:</span> <span>{{zhuanhuan(item.caseNo)}}</span></p>
								<p><span>判决结果:</span> <span
										style="text-align:left;">{{zhuanhuan(item.judgeResult)}}</span></p>
								<p><span>案由编码类型:</span> <span>{{zhuanhuan(item.anyouType)}}</span></p>
								<p><span>依据:</span> <span>{{zhuanhuan(item.yiju)}}</span></p>
								<p class="lastP"><span>法院等级:</span> <span>{{zhuanhuan(item.courtRank)}}</span></p>
								<div></div>
							</div>
						</template>
					</div>
					<div class="NoData" v-if="noCaiPan">
						暂无数据
					</div>
					<div class="fenGe"></div>
				</div>
				<!--开庭公告-->
				<div>
					<div class="kaiTing fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">开庭公告</span>
						</div>
					</div>
					<div>
						<el-row>
							<el-table :data="kaiTingDataList" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="开庭时间:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{ scope.row.sortTime=="" ? '—' :Transformdate(new Date(parseInt(scope.row.sortTime)), 'yyyy-MM-dd')}}</span>
									</template>
								</el-table-column>
								<el-table-column label="内容:" header-align="center" label-class-name="table-header-bold"
												 width="400px">
									<template scope="scope"><span>{{zhuanhuan(scope.row.body)}}</span></template>
								</el-table-column>
								<el-table-column label="原告:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.plaintiff	)}}</span>
									</template>
								</el-table-column>
								<el-table-column label="组织者:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.organizer)}}</span></template>
								</el-table-column>
								<el-table-column label="法院名称:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.court)}}</span></template>
								</el-table-column>
								<el-table-column label="法庭名称:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.courtroom)}}</span></template>
								</el-table-column>
							</el-table>
							<el-table :data="kaiTingDataList" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="当事人:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{ zhuanhuan(scope.row.pname)}}</span></template>
								</el-table-column>
								<el-table-column label="标题:" header-align="center" label-class-name="table-header-bold"
												 width="400px">
									<template scope="scope"><span>{{zhuanhuan(scope.row.title)}}</span></template>
								</el-table-column>
								<el-table-column label="案由:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.plaintiff	)}}</span>
									</template>
								</el-table-column>
								<el-table-column label="法官:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.judge)}}</span></template>
								</el-table-column>
								<el-table-column label="案号:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.caseNo)}}</span></template>
								</el-table-column>
								<el-table-column label="被告:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.defendant)}}</span></template>
								</el-table-column>
							</el-table>
						</el-row>
					</div>
					<div class="fenGe"></div>
				</div>

				<!--失信公告-->
				<div>
					<div class="shiXin fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">失信公告</span>
						</div>
					</div>
					<div v-show="shiXin">
						<template v-for="ite in shiXinDataList">
							<div class="fanYuanContainer" v-for="item in ite">
								<p><span>立案时间:</span><span>{{item.sortTime=='' ? '—' :Transformdate(new Date(parseInt(item.sortTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>性别:</span><span>{{zhuanhuan(item.sex)}}</span></p>
								<p><span>被执行人履行情况:</span><span>{{zhuanhuan(item.lxqk)}}</span></p>
								<p><span>执行依据文号:</span><span>{{zhuanhuan(item.yjCode)}}</span></p>
								<p><span>执行法庭名称:</span><span>{{zhuanhuan(item.court)}}</span></p>
								<p><span>身份证/组织机构代码:</span><span>{{zhuanhuan(item.idcardNo)}}</span></p>
								<p><span>做出执行依据单位:</span><span>{{zhuanhuan(item.yjdw)}}</span></p>
								<p><span>失信被执行人行为具体情况:</span><span>{{zhuanhuan(item.jtqx)}}</span></p>
								<p><span>生效法律文书确定的义务:</span><span>{{zhuanhuan(item.yiwu)}}</span></p>
								<p><span>年龄:</span><span>{{zhuanhuan(item.age)}}</span></p>
								<p><span>被执行人姓名:</span><span>{{zhuanhuan(item.pname)}}</span></p>
								<p><span>省份:</span><span>{{zhuanhuan(item.province)}}</span></p>
								<p><span>案号:</span><span>{{zhuanhuan(item.caseNo)}}</span></p>
								<p class="lastP"><span>发布时间:</span><span>{{item.postTime=='' ? '—' :Transformdate(new Date(parseInt(item.postTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<div></div>
							</div>
						</template>

					</div>
					<div v-if="!shiXin" class="NoData">
						暂无数据
					</div>
					<div class="fenGe"></div>
				</div>

				<!--执行公告-->
				<div>
					<div class="zhiXing fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">执行公告</span>
						</div>
					</div>

					<div v-show="zhiXing">
						<el-row>
							<el-table :data="zhiXingDataList" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="立案时间:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{scope.row.sortTime=='' ? '—' :Transformdate(new Date(parseInt(scope.row.sortTime)), 'yyyy-MM-dd')}}</span>
									</template>
								</el-table-column>
								<el-table-column label="内容:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.body)}}</span></template>
								</el-table-column>
								<el-table-column label="标题:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.title)}}</span></template>
								</el-table-column>
								<el-table-column label="执行人姓名:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.pname)}}</span></template>
								</el-table-column>
								<el-table-column label="执行法庭名称:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.court)}}</span></template>
								</el-table-column>
								<el-table-column label="申请人:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.proposer)}}</span></template>
								</el-table-column>
								<el-table-column label="案号:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.caseNo)}}</span></template>
								</el-table-column>
							</el-table>
							<el-table :data="zhiXingDataList" highlight-current-row border ref="multipleTable"
									  style="width: 100%">
								<el-table-column label="案件状态:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope">
										<span>{{zhuanhuan(scope.row.caseState==0 ? "执行中" : "已结束")}}</span></template>
								</el-table-column>
								<el-table-column label="身份证/组织者机构代码:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.idcardNo)}}</span></template>
								</el-table-column>
								<el-table-column label="执行标的:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.execMoney)}}</span></template>
								</el-table-column>
								<el-table-column label="终止日期:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{scope.row.closeDate==""? '—' :Transformdate(new Date(parseInt(scope.row.closeDate)), 'yyyy-MM-dd')}}</span>
									</template>
								</el-table-column>
								<el-table-column label="地址:" header-align="center" label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.address)}}</span></template>
								</el-table-column>
								<el-table-column label="未履行金额:" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>{{zhuanhuan(scope.row.unnexeMoney)}}</span></template>
								</el-table-column>
								<el-table-column label="—" header-align="center"
												 label-class-name="table-header-bold">
									<template scope="scope"><span>—</span></template>
								</el-table-column>
							</el-table>
						</el-row>
					</div>
					<div class="fenGe"></div>
				</div>


				<!--法院-->
				<div>
					<div class="faYuan fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">法院公告</span>
						</div>
					</div>
					<div v-if="faYuan">
						<template v-for="item in faYuanDataList">
							<div class="fanYuanContainer">
								<p><span>发布时间:</span><span>{{item.sortTime=='' ? '—' :Transformdate(new Date(parseInt(item.sortTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>内容:</span><span>{{zhuanhuan(item.body)}}</span></p>
								<p><span>版面:</span><span>{{zhuanhuan(item.layout)}}</span></p>
								<p><span>姓名:</span><span>{{zhuanhuan(item.pname	)}}</span></p>
								<p><span>法院名称:</span><span>{{zhuanhuan(item.court)}}</span></p>
								<p class="lastP"><span>公告类型:</span><span>{{zhuanhuan(item.ggType)}}</span></p>
								<div></div>
							</div>
						</template>
					</div>
					<div v-if="!faYuan" class="NoData">
						暂无数据
					</div>
					<div class="fenGe"></div>
				</div>


				<!--逾期-->
				<div>
					<div class="yuQi fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">逾期催收公告</span>
						</div>
					</div>
					<div v-if="yuQi">
						<template v-for="item in yuQiDataList">
							<div class="fanYuanContainer">
								<p><span>贷款时间:</span><span>{{item.sortTime=='' ? '—' :Transformdate(new Date(parseInt(item.sortTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>内容:</span><span style="text-align:left;">{{zhuanhuan(item.body)}}</span></p>
								<div v-for="item in yuQiArr">
									<p style="text-align:left; margin-left:.3rem;">{{item}}</p>
								</div>
								<p><span>性别:</span><span>{{zhuanhuan(item.sex)}}</span></p>
								<p><span>居住电话:</span><span>{{zhuanhuan(item.phone)}}</span></p>
								<p><span>信息更新时间:</span><span>{{item.updateTime==null ? '—':Transformdate(new Date(parseInt(item.updateTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>执行法院:</span><span>{{zhuanhuan(item.execCourt)}}</span></p>
								<p><span>相关当事人:</span><span>{{zhuanhuan(item.relatedParty)}}</span></p>
								<p><span>未还/罚息:</span><span>{{zhuanhuan(item.whfx)}}</span></p>
								<p><span>身份证号:</span><span>{{zhuanhuan(item.idcardNo)}}</span></p>
								<p><span>籍贯地址:</span><span>{{zhuanhuan(item.birthPlace)}}</span></p>
								<p><span>本金/本息:</span><span>{{zhuanhuan(item.bjbx)}}</span></p>
								<p><span>案号:</span><span>{{zhuanhuan(item.caseCode)}}</span></p>
								<p><span>居住地址:</span><span>{{zhuanhuan(item.address)}}</span></p>
								<p><span>邮箱地址:</span><span>{{zhuanhuan(item.email)}}</span></p>
								<p><span>来源单位名称:</span><span>{{zhuanhuan(item.sourceName)}}</span></p>
								<p><span>年龄:</span><span>{{zhuanhuan(item.age)}}</span></p>
								<p><span>姓名:</span><span>{{zhuanhuan(item.pname)}}</span></p>
								<p><span>逾期催收名单ID:</span><span>{{zhuanhuan(item.wdhmdId)}}</span></p>
								<p><span>数据源:</span><span>{{zhuanhuan(item.datasource)}}</span></p>
								<p><span>已还金额:</span><span>{{zhuanhuan(item.yhje)}}</span></p>
								<p><span>手机号:</span><span>{{zhuanhuan(item.mobile)}}</span></p>
							</div>
						</template>
					</div>
					<div v-if="!yuQi" class="NoData">
						暂无数据
					</div>
					<div class="fenGe"></div>
				</div>
				<!--案件-->
				<div>
					<div class="anJian fayuan">
						<div @click="anJianClick()" class="fayuanDiv">
							<span class="fayuanSpan">案件流程</span>
						</div>
					</div>
					<div v-if="anJian">
						<template v-for="item in anJianDataList">
							<div class="fanYuanContainer">
								<p><span>法庭成员:</span><span>{{zhuanhuan(item.member)}}</span></p>
								<p><span>立案时间:</span><span>{{item.sortTime=='' ? '—' :Transformdate(new Date(parseInt(item.sortTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>当职员电话:</span><span>{{zhuanhuan(item.clerkPhone)}}</span></p>
								<p><span>案件类别:</span><span>{{zhuanhuan(item.caseType)}}</span></p>
								<p><span>内容:</span><span style="text-align:left;">{{zhuanhuan(item.body)}}</span></p>
								<p><span>组织者:</span><span>{{zhuanhuan(item.organizer	)}}</span></p>
								<p><span>归档日期:</span><span>{{item.filingDate=="" ? '—' :Transformdate(new Date(parseInt(item.filingDate)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>法院名称:</span><span>{{zhuanhuan(item.court)}}</span></p>
								<p><span>审理状态:</span><span>{{zhuanhuan(item.ajlcStatus)}}</span></p>
								<p><span>主要法官:</span><span>{{zhuanhuan(item.chiefJudge)}}</span></p>
								<p><span>审理程序:</span><span>{{zhuanhuan(item.trialProcedure)}}</span></p>
								<p><span>判决日期:</span><span>{{item.sentencingDate=="" ? '—' :Transformdate(new Date(parseInt(item.sentencingDate)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>案件状态:</span><span>{{zhuanhuan(item.caseStatus)}}</span></p>
								<p><span>案由:</span><span>{{zhuanhuan(item.caseCause)}}</span></p>
								<p><span>审判限制日期:</span><span>{{item.trialLimitDate=="" ? '—' :Transformdate(new Date(parseInt(item.trialLimitDate)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>书记员:</span><span>{{zhuanhuan(item.clerk)}}</span></p>
								<p><span>法官:</span><span>{{zhuanhuan(item.judge)}}</span></p>
								<p><span>诉讼标的:</span><span>{{zhuanhuan(item.actionObject)}}</span></p>
								<p><span>当事人:</span> <span>{{zhuanhuan(item.pname)}}</span></p>
								<p><span>审号:</span><span>{{zhuanhuan(item.caseNo)}}</span></p>
								<p class="lastP"><span>有效日期:</span><span>{{item.effectiveDate=="" ? '—' :Transformdate(new Date(parseInt(item.effectiveDate)), 'yyyy-MM-dd')}}</span>
								</p>
								<div></div>
							</div>
						</template>
					</div>
					<div v-if="!anJian" class="NoData">
						暂无数据
					</div>
					<div class="fenGe"></div>
				</div>
				<!--报告-->
				<div>
					<div class="baoGuang fayuan">
						<div class="fayuanDiv">
							<span class="fayuanSpan">曝光台</span>
						</div>
					</div>
					<div v-if="baoGuang">
						<template v-for="item in baoGuangDataList">
							<div class="fanYuanContainer">
								<p><span>立案日期:</span><span>{{item.sortTime=='' ? '—' :Transformdate(new Date(parseInt(item.sortTime)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>曝光日期:</span><span>{{item.bgDate=="" ? '—' :Transformdate(new Date(parseInt(item.bgDate)), 'yyyy-MM-dd')}}</span>
								</p>
								<p><span>当事人类型:</span><span>{{zhuanhuan(item.partyType)}}</span></p>
								<p><span>法院名称:</span><span>{{zhuanhuan(item.court)}}</span></p>
								<p><span>申请人:</span><span>{{zhuanhuan(item.proposer)}}</span></p>
								<p><span>身份证/组织机构代码:</span><span>{{zhuanhuan(item.idcardNo)}}</span></p>
								<p><span>审由:</span><span>{{zhuanhuan(item.caseCause)}}</span></p>
								<p><span>未执行金额:</span><span>{{zhuanhuan(item.unnexeMoney)}}</span></p>
								<p><span>地址:</span><span>{{zhuanhuan(item.address	)}}</span></p>
								<p><span>当事人</span> <span>{{zhuanhuan(item.pname)}}</span></p>
								<p><span>案号:</span> <span>{{zhuanhuan(item.caseNo)}}</span></p>
								<p><span>依据:</span> <span>{{zhuanhuan(item.yiju)}}</span></p>
								<p class="lastP"><span>标的金额:</span><span>{{zhuanhuan(item.execMoney)}}</span></p>
								<div></div>
							</div>
						</template>
					</div>
					<div v-if="!baoGuang" class="NoData">
						暂无数据
					</div>
					<div class="fenGe"></div>
				</div>

			</div>
		</div>
		<div class="NoData" v-show="NoData">
			未匹配到用户数据
		</div>
		<div v-show="noAuthorize" class="NoData">
			用户尚未授权或授权失败
		</div>
	</div>
</template>

<script>
  import {dateFormat} from '@/common/util.js'

  export default {
	props: ['data'],
	data(){
	  return {
		fayuan: false,
		caiPan: false,
		kaiTing: false,
		zhiXing: false,
		faYuan: false,
		shiXin: false,
		yuQi: false,
		anJian: false,
		baoGuang: false,
		caiPanBodyShow: false,
		dataShow: true,
		NoData: false,
		noAuthorize: false,
		noFayuan: false,
		noCaiPan: false,
		noKaiTing: false,
		noZhiXing: false,
		noFaYuan: false,
		noShiXin: false,
		noYuQi: false,
		noAnJian: false,
		noBaoGuang: false,
		caiPanData: [],
		kaiTingData: [],
		zhiXingData: [],
		faYuanData: [],
		shiXinData: [],
		yuQiData: [],
		anJianData: [],
		baoGuangData: [],
		arr: [],
		yuQiArr: [],
		kaiTingArr: [],
		caiPanDataList: [],
		kaiTingDataList: [],
		zhiXingDataList: [],
		faYuanDataList: [],
		shiXinDataList: [],
		yuQiDataList: [],
		anJianDataList: [],
		baoGuangDataList: [],
		fahaiReportData: [],
	  }
	},
	methods: {
	  zhuanhuan(data){
		return data ? data : '—'
	  },
	  Transformdate(obj, fmt){
		return dateFormat(obj, fmt)
	  },
	  caiPanBody(){
		this.caiPanBodyShow = !this.caiPanBodyShow;
	  }
	},
	mounted(){
	  Object.assign(this.$data, this.$options.data.call(this));
	  this.fahaiReportData = this.data.data.data.data
	  /*this.$set(this.fahaiReportData, 'fygg', [[
		{
		  "sortTime": 1434124800000,
		  "body": "本院受理张xx申请宣告赵艳杰死亡一案，经查：被申请人赵艳杰，男，满族，1964年5月11日出生，户籍地沈阳市铁西区南十中路53-2-4-1号，身份证号210106640511331。赵艳杰于1995年11月走失，至今未归。现发出寻人公告，希赵艳杰本人或知其下落的有关人员自即日起与本院联系。公告期间为一年，期间届满，本院将依法裁判。",
		  "fyggId": "2458489",
		  "layout": null,
		  "relatedParty": null,
		  "pname": "张xx",
		  "court": "[辽宁]沈阳市铁西区人民法院",
		  "ggType": "宣告失踪、死亡"
		}
	  ]])
	  this.$set(this.fahaiReportData, 'bgt', [[
		{
		  "sortTime": 1419868800000,
		  "body": "姓名：张三 证件号码：990625********0347 曝光日期：2015-03-30 地址： 执行依据： 法院生效裁判 案号： （2015）绍诸执民字第506号 执行案由： 被继承人债务清偿纠纷 执行法院： 浙江省诸暨市人民法院 未执行金额： 28111.82 立案日期： 2014-12-30 标的金额： 28111.82",
		  "bgDate": 1427644800000,
		  "partyType": "P",
		  "court": "浙江省诸暨市人民法院",
		  "proposer": null,
		  "idcardNo": "990625********0347",
		  "bgtId": "AU1vQ2_OdQ2sM7pFis4r",
		  "caseCause": "被继承人债务清偿纠纷",
		  "unnexeMoney": 28111.82,
		  "address": null,
		  "pname": "张三",
		  "caseNo": "（2015）绍诸执民字第506号",
		  "yiju": "法院生效裁判",
		  "execMoney": 28111.82
		}
	  ]])
	  this.$set(this.fahaiReportData, 'ajlc', [[
		{
		  "member": null,
		  "sortTime": 1476806400000,
		  "clerkPhone": null,
		  "caseType": "民事",
		  "body": "案号：（2016）浙1102民初6517号 查看详情 法院： 丽水市莲都区人民法院 立案日期： 2016-10-19 案件状态： 已立案 当事人： 被告：雷美芳 被告：钟杰 原告：高巧奔",
		  "trialProcedure": "司法确认",
		  "ajlcId": "AVfoHxQuxL_h1T6qAQiQ",
		  "sentencingDate": null,
		  "status": 1,
		  "caseStatus": 0,
		  "organizer": "附城人民法庭",
		  "filingDate": null,
		  "court": null,
		  "ajlcStatus": "已立案",
		  "chiefJudge": null,
		  "caseCause": "请求确认人民调解协议效力",
		  "trialLimitDate": "2015-05-27",
		  "clerk": "陈采红",
		  "judge": "杨伟雄",
		  "actionObject": "0",
		  "pname": "徐云青，女，1976年8月26日出生，汉族，丰顺县汤坑镇汤坑路349－14号。身份证号码：44142319760826****,张秀珍，女，1935年10月2日",
		  "caseNo": "（2014）梅丰法附调确字第27号",
		  "effectiveDate": null
		}
	  ]])
	  this.$set(this.fahaiReportData, 'wdhmd', [[
		{
		  "sortTime": 1446307200000,
		  "body": null,
		  "sex": null,
		  "phone": null,
		  "updateTime": null,
		  "execCourt": null,
		  "relatedParty": null,
		  "whfx": null,
		  "idcardNo": "99152219950625****",
		  "birthPlace": null,
		  "bjbx": "3000.00",
		  "caseCode": null,
		  "address": "福建省宁德市蕉城区木材公司",
		  "email": "qyl_yl_888@126.com",
		  "sourceName": "拍来贷",
		  "age": null,
		  "pname": "张冬澍",
		  "wdhmdId": "AVMH_Ld5fu8bWnowhLd5",
		  "datasource": null,
		  "yhje": "7647.33",
		  "mobile": "18605051668"
		}
	  ]])
	  this.$set(this.fahaiReportData, 'ktgg', [[
		{
		  "sortTime": 1525622400000,
		  "body": null,
		  "ktggId": "AU2AWyb76aXWqCOGevnG",
		  "plaintiff": null,
		  "organizer": null,
		  "courtroom": null,
		  "relatedParty": null,
		  "court": "舟山市普陀区人民法院",
		  "party": null,
		  "title": null,
		  "caseCause": "本院执行的申请执行人陈燕琼、陈伟国与被执行人杨方龙、林国存、史平原、舟山市普陀汇信对外经济贸易有限公司股权转让侵权纠纷",
		  "judge": null,
		  "caseNo": "（2009）舟普民执字第636号",
		  "defendant": null
		}
	  ]])*/


	  console.log(111, this.data.data.data.data)

	  for (var attr in this.fahaiReportData) {
		console.log(attr)
		if (attr == 'shixin') {
		  this.shiXinDataList = this.fahaiReportData.shixin
		  console.log(99999, this.fahaiReportData.shixin)
		  if (this.shiXinDataList.length > 0) {
			this.shiXin = true
		  } else {
			this.shiXin = false
		  }
		} else if (attr == 'zxgg') {
		  console.log(788, this.fahaiReportData.zxgg)
		  //this.zhiXingDataList = this.fahaiReportData.zxgg
		  //this.zhiXingDataList.push(this.fahaiReportData.zxgg[0][0]);
		  for (let a = 0; a < this.fahaiReportData.zxgg.length; a++) {
			this.zhiXingDataList.push(this.fahaiReportData.zxgg[a][0])
		  }

		  console.log(354353, this.zhiXingDataList)
		  if (this.zhiXingDataList.length > 0) {
			this.zhiXing = true
		  } else {
			this.zhiXing = false
		  }
		} else if (attr == 'cpws') {
		  console.log(444, this.fahaiReportData.cpws[0][0])
		  this.caiPanDataList.push(this.fahaiReportData.cpws[0][0])
		  this.arr = this.caiPanDataList[0].body.split("<p>");
		  if (this.caiPanDataList.length > 0) {
			this.caiPan = true
		  } else {
			this.caiPan = false
		  }
		} else if (attr == 'fygg') {
		  this.faYuanDataList.push(this.fahaiReportData.fygg[0][0])
		  if (this.faYuanDataList.length > 0) {
			this.faYuan = true
		  } else {
			this.faYuan = false
		  }
		} else if (attr == 'bgt') {
		  this.baoGuangDataList.push(this.fahaiReportData.bgt[0][0])
		  if (this.baoGuangDataList.length > 0) {
			this.baoGuang = true
		  } else {
			this.baoGuang = false
		  }
		} else if (attr == 'ajlc') {
		  this.anJianDataList.push(this.fahaiReportData.ajlc[0][0])
		  if (this.baoGuangDataList.length > 0) {
			this.anJian = true
		  } else {
			this.anJian = false
		  }
		} else if (attr == 'wdhmd') {
		  this.yuQiDataList.push(this.fahaiReportData.wdhmd[0][0])
		  if (this.yuQiDataList[0].body) {
			this.yuQiArr = this.yuQiDataList[0].body.split("<p>");
		  }
		  if (this.yuQiDataList.length > 0) {
			this.yuQi = true
		  } else {
			this.yuQi = false
		  }
		} else if (attr == 'ktgg') {
		  this.kaiTingDataList.push(this.fahaiReportData.ktgg[0][0])
		  if (this.kaiTingDataList[0].body) {
			this.kaiTingDataList[0].body = that.kaiTingDataList[0].body.replace(/\{|}/g, '');
		  }
		  if (this.kaiTingDataList.length > 0) {
			this.faYuan = true
		  } else {
			this.faYuan = false
		  }
		}
	  }
	},
	activated(){

	}

  }
</script>

<style lang="scss" scoped>
	.faYuanInFormation {
		.NoData {
			width: 100%;
			text-align: center;
			margin: 10px 0;
		}
		.courtInformation {
			.fayuanDiv {
				height: 25px;
				padding: 12.5px 0;
				.fayuanSpan {
					font-size: 16px;
					font-weight: bold;
				}
				span {
					margin-left: 10px;

				}
			}
			.fenGe {
				height: 12px;
				width: 100%;
				background: #f2f2f2;
			}
			.fanYuanContainer div:last-child {
				height: 30px;
				background: #ffffff;
			}
			.fanYuanContainer {
				.bodyDiv, p {
					border: 1px solid #eaeefb;
					display: flex;
					border-bottom: none;
					align-items: center;
					span {
						display: inline-block;
						min-height: 40px;
						line-height: 40px;
						padding-left: 20px;
					}
					span:first-child {
						width: 20%;
						/*background: #EFF2F7;*/
					}
					span:last-child {
						border-left: 1px solid #ccc;
						width: 80%;
					}
					b:first-child {
						display: none;
					}
				}
				.lastP {
					border: 1px solid #eaeefb;
				}

			}
		}
	}
</style>