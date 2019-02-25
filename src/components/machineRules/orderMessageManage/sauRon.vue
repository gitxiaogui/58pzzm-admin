<template>
	<div class="sauRon">
		<div v-show="!suolunStatus" style="text-align: center;margin: 10px 0px;font-size: 16px;">
			<p>未匹配银联数据</p>
		</div>
		<div class="suolunContent" v-if="suolunStatus">
			<!--基本信息-->
			<div class="suolunHeaderTitle">基本信息<span style="font-size:12px;">（根据身份证等信息进行基本分析)</span></div>
			<el-row style="margin:0;">
				<el-table :data="user_basic" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="姓名" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(user_name)}}</span></template>
					</el-table-column>
					<el-table-column label="年龄" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.age) }}</span></template>
					</el-table-column>
					<el-table-column label="性别" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.gender) }}</span></template>
					</el-table-column>
					<el-table-column label="生日日期" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.birthday) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证是否有效" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.idcard_validate==1? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="身份证户籍省份" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_province) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证户籍城市" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_city) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证户籍地区" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_region) }}</span></template>
					</el-table-column>
					<el-table-column label="手机运营商" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.phone_operator) }}</span></template>
					</el-table-column>

				</el-table>
			</el-row>
			<el-row>
				<el-table :data="user_basic" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="手机归属地省份" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.phone_province) }}</span></template>
					</el-table-column>
					<el-table-column label="手机归属地城市" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.phone_city) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证记录天数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.record_idcard_days) }}</span></template>
					</el-table-column>
					<el-table-column label="手机号记录天数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.record_phone_days) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证最新出现时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.last_appear_idcard) }}</span></template>
					</el-table-column>
					<el-table-column label="手机号最近出现时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.last_appear_phone) }}</span></template>
					</el-table-column>
					<el-table-column label="关联身份证数量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.used_idcards_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="关联手机号数量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.used_phones_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="—" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>—</span></template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--社交风险点-->
			<div class="suolunHeaderTitle">社交风险点<span style="font-size:12px;">（根据社交网络进行分析）</span></div>
			<el-row>
				<el-table :data="risk_social_network " highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="葫芦分" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.sn_score) }}</span></template>
					</el-table-column>
					<el-table-column label="直接联系人" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.sn_order1_contacts_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="直接联系人在黑名单中的数量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.sn_order1_blacklist_contacts_cnt) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="间接联系人在黑名单中的数量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.sn_order2_blacklist_contacts_cnt) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="认识间接黑人的直接联系人个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.sn_order2_blacklist_routers_cnt) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="认识间接黑人的直接联系人比例" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.sn_order2_blacklist_routers_pct) }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--黑名单-->
			<div class="suolunHeaderTitle">黑名单<span style="font-size:12px;">（根据网贷、法院、银行黑名单匹配分析）</span></div>
			<el-row>
				<el-table :data="risk_blacklist " highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="身份证是否命中黑名单" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.idcard_in_blacklist ? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="手机号是否命中黑名单" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.phone_in_blacklist ? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="是否命中法院黑名单" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.in_court_blacklist ? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="是否命中网贷黑名单" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.in_p2p_blacklist ? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="是否命中银行黑名单" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.in_bank_blacklist ? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="最近该手机出现在黑名单中时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.last_appear_idcard_in_blacklist) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="最近该身份证出现在黑名单中时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.last_appear_phone_in_blacklist) }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--历史类型-->
			<div class="suolunHeaderTitle">历史类型<span style="font-size:12px;">（根据查询记录分析）</span></div>
			<el-row>
				<el-table :data="history_org " highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="线上消费分期出现次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.online_installment_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="线下消费分期出现次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.offline_installment_cnt) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="信用卡代还出现次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.credit_card_repayment_cnt) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="小额快速贷出现次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.payday_loan_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="线上现金贷出现次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.online_cash_loan_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="线下现金贷出现次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.offline_cash_loan_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="其他" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.others_cnt) }}</span></template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--查询历史-->
			<div class="suolunHeaderTitle">查询历史<span style="font-size:12px;">（根据查询记录分析）</span></div>
			<el-row style="margin:0;">
				<el-table :data="history_search " highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="历史查询总次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="最近7天查询次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt_recent_7_days) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="最近14天查询次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt_recent_14_days) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="最近30天查询次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt_recent_30_days) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="最近60天查询次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt_recent_60_days) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="最近90天查询次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt_recent_90_days) }}</span>
						</template>
					</el-table-column>
					<el-table-column label="最近180天查询次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_cnt_recent_180_days) }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row style="margin:0;">
				<el-table :data="history_search " highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="历史查询总机构数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="最近7天查询机构次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt_recent_7_days) }}</span></template>
					</el-table-column>
					<el-table-column label="最近14天查询机构次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt_recent_14_days) }}</span></template>
					</el-table-column>
					<el-table-column label="最近30天查询机构次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt_recent_30_days) }}</span></template>
					</el-table-column>
					<el-table-column label="最近60天查询机构次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt_recent_60_days) }}</span></template>
					</el-table-column>
					<el-table-column label="最近90天查询机构次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt_recent_90_days) }}</span></template>
					</el-table-column>
					<el-table-column label="最近180天查询机构次数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.org_cnt_recent_180_days) }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--手机可疑身份-->
			<div class="suolunHeaderTitle">手机可疑身份<span style="font-size:12px;">（除本机以外其他的手机绑定情况）</span></div>
			<el-row>
				<el-table :data="binding_phones " highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="绑定其他手机号码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.other_phone) }}</span></template>
					</el-table-column>
					<el-table-column label="此号码绑定其他姓名个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.other_names_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="查询此手机号的机构数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_orgs_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="手机运营商" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.phone_operator) }}</span></template>
					</el-table-column>
					<el-table-column label="手机归属地省份" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.phone_province) }}</span></template>
					</el-table-column>
					<el-table-column label="手机归属地城市" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.phone_city) }}</span></template>
					</el-table-column>
					<el-table-column label="最近此手机号出现时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.last_appear_phone) }}</span></template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--身份证可疑身份-->
			<div class="suolunHeaderTitle">身份证可疑身份<span style="font-size:12px;">（除本机以外其他的身份证绑定情况）</span></div>
			<el-row>
				<el-table :data="binding_idcards " highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="绑定其他身份证号码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.other_idcard) }}</span></template>
					</el-table-column>
					<el-table-column label="此号码绑定其他姓名个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.other_names_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="查询此身份证的机构数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.search_orgs_cnt) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证是否是有效身份证" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.idcard_validate == 1 ? '是' : '否' }}</span></template>
					</el-table-column>
					<el-table-column label="身份证户籍省份" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_province) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证户籍城市" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_city) }}</span></template>
					</el-table-column>
					<el-table-column label="身份证户籍地区" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_region) }}</span></template>
					</el-table-column>
					<el-table-column label="年龄" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_age) }}</span></template>
					</el-table-column>
					<el-table-column label="性别" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.idcard_gender) }}</span></template>
					</el-table-column>
					<el-table-column label="最近此身份证出现时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ zhuanhua(scope.row.last_appear_idcard) }}</span></template>
					</el-table-column>
				</el-table>
			</el-row>
		</div>
	</div>
</template>

<script>
  export default {
	props: ['data'],
	data(){
	  return {
		suolunStatus: false,
		sauRonData: [],
		user_basic: [],
		risk_social_network: [],
		risk_blacklist: [],
		history_org: [],
		history_search: [],
		binding_phones: [],
		binding_idcards: [],
	  }
	},
	methods: {
	  zhuanhua(row){
		return row ? row : '—'
	  },
	},
	mounted(){
	  console.log('黑名单=========', this.data.data.data.data)
	  let dataList = this.data.data.data.data
	  console.log(111111111111111,dataList)
	  if (!this.data.data.data.data) {
		this.sauRonData = []
		this.suolunStatus = false
	  } else {
		this.suolunStatus = true
		this.sauRonData = this.data.data.data.data
		this.user_name = this.sauRonData.user_name
		//基本信息
		this.user_basic.push(this.sauRonData.user_basic)
		//社交风险点
		this.risk_social_network.push(this.sauRonData.risk_social_network)
		//黑名单
		this.risk_blacklist.push(this.sauRonData.risk_blacklist)
		//历史类型
		this.history_org.push(this.sauRonData.history_org)
		//查询历史
		this.history_search.push(this.sauRonData.history_search)
		//手机可疑身份
		this.binding_phones=this.sauRonData.binding_phones
		//身份证可疑身份
		this.binding_idcards=this.sauRonData.binding_idcards
	  }
	}
  }
</script>

<style lang="scss">
	.sauRon {
		.suolunHeaderTitle{
				padding:10px 0;
				font-size:18px;
			}
	}
</style>