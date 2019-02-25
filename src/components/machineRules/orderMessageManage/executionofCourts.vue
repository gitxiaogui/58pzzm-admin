<template>
	<div>
		<p style="text-indent:.4rem;" v-if="num">多头借贷 ： <span>{{ num }}</span></p>
		<p style="text-indent:.4rem;" v-if="genre">规则类型 ：<span>{{genre}}</span></p>
		<p style="text-indent:.4rem;" v-if="fData">风险类型：<span>{{fData}}</span></p>
		<p style="text-indent:.4rem;" v-if="discredit">信贷逾期次数：<span>{{discredit}}</span></p>
		<p style="text-indent:.4rem;" v-if="overduedetails.length > 0">逾期详情
			<el-row  style="padding:10px 30px;">
				<el-table :data="overduedetails" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="逾期金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.overdue_amount_range }}</span></template>
					</el-table-column>
					<el-table-column label="逾期笔数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.overdue_count }}</span></template>
					</el-table-column>
					<el-table-column label="逾期天数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.overdue_day_range }}</span></template>
					</el-table-column>
					<el-table-column label="逾期入库时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.overdue_time }}</span></template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--<ul style="margin-left:20px;">
				<li v-for="items in overduedetails">
					<p>逾期金额：<span>{{items.overdue_amount_range}}</span></p>
					<p>逾期笔数：<span>{{items.overdue_count}}</span></p>
					<p>逾期天数：<span>{{items.overdue_day_range}}</span></p>
					<p>逾期入库时间：<span>{{items.overdue_time}}</span></p>
				</li>
			</ul>-->
		</p>
		<p v-if="platformdetail.length > 0" style="text-indent:.4rem;">借贷详情
			<ul>
				<li v-for="itemm in platformdetail">
					<p><span>{{itemm}}</span></p>
				</li>
			</ul>
		</p>
		<p v-if="platformdetaildimension.length > 0" style="text-indent:.4rem;">多平台细分维度详情
			<ul>
				<li v-for="(itemm,index) in platformdetaildimension">
					<p>维度命中多头个数：<span>{{itemm.count}}</span></p>
					<p>维度展示名 ：<span>{{itemm.dimension}}</span></p>
					<p>维度命中多头详情
						<ul>
							<li v-for="ite in itemm.detail">{{ite}}</li>
						</ul>
					</p>
				</li>
			</ul>
		</p>
		<p v-if="highriskareas.length > 0" style="text-indent:.4rem;">高风险区域：
			<ul>
				<li v-for="items in highriskareas">
					{{items}}
				</li>
			</ul>
		</p>
		<p v-if="hitlistdatas.length > 0" style="text-indent:.4rem;">列表数据：
			<ul>
				<li v-for="items in hitlistdatas">
					{{items}}
				</li>
			</ul>
		</p>
		<p v-if="frequencydetaillist.length > 0">频度详情：
			<ul>
				<li v-for="items in frequencydetaillist">
					<p>{{items.detail}}</p>
					<!--<p v-for="ite in items.data">频度规则列表详情:{{ite}}</p>-->
					<p>频度规则列表详情:</p>
					<ul>
						<li v-for="ite in items.data" style="border-bottom: 1px solid #d0d0d0;">
							<p>{{ite}}</p>
						</li>
					</ul>
				</li>
			</ul>
		</p>
		<div>
			<p v-if="namelisthitdetails.length > 0" style="margin-top: 5px;text-indent:.4rem;">命中名单详情列表：
				<ul>
					<li v-for="(items,index) in namelisthitdetails" >
						<p style="text-indent:.8rem;">描述：<span>{{items.description}}</span></p>
						<p style="text-indent:.8rem;">风险类型：<span>{{items.fraud_type}}</span></p>
						<p style="text-indent:.8rem;">匹配类型：<span>{{items.hit_type_displayname}}</span></p>
						<p style="text-indent:.8rem;">规则标识：<span>{{itemstype}}</span></p>
						<p v-if="items.court_details" style="margin-top: 5px;text-indent:.8rem;">法院详情：
							<ul>
								<li v-for="ite in items.court_details" style="margin-left: 20px;margin: 5px 0px;">
									<p style="text-indent:1.2rem;">风险类型:{{ite.fraud_type}}</p>
									<p style="text-indent:1.2rem;">被执行人姓名:{{ite.name}}</p>
									<p style="text-indent:1.2rem;">年龄:{{ite.age}}</p>
									<p style="text-indent:1.2rem;">性别:{{ite.gender}}</p>
									<p style="text-indent:1.2rem;">省份:{{ite.province}}</p>
									<p style="text-indent:1.2rem;">立案时间:{{ite.filing_time}}</p>
									<p style="text-indent:1.2rem;">执行法院:{{ite.court_name}}</p>
									<p style="text-indent:1.2rem;">做出执行依据单位:{{ite.execution_department}}</p>
									<p style="text-indent:1.2rem;">生效法律文书确定的义务:{{ite.duty}}</p>
									<p style="text-indent:1.2rem;">被执行人的履行情况:{{ite.situation}}</p>
									<p style="text-indent:1.2rem;">失信被执行人行为具体情形:<span style="text-align:justify;">{{ite.discredit_detail}}</span></p>
									<p style="text-indent:1.2rem;">执行依据文号:{{ite.execution_base}}</p>
									<p style="text-indent:1.2rem;">执行标的:{{ite.execution_number}}</p>
									<p style="text-indent:1.2rem;">执行状态:{{ite.execution_status}}</p>
								</li>
							</ul>
						</p>
						<p v-if="items.fuzzy_detail_hits">模糊名单命中详情
							<ul>
								<li v-for="ites in items.fuzzy_detail_hits">
									<p>风险类型：{{ites.fraud_type}}</p>
									<p>模糊身份证：{{ites.fuzzy_id_number}}</p>
									<p>姓名：{{ites.fuzzy_name}}</p>
								</li>
							</ul>
						</p>
					</li>
				</ul>
			</p>
		</div>
		<p v-if="suspectteamdetaillist.length > 0">复杂网络风险详情
			<el-row  style="padding:10px 30px 0;margin:0;">
				<el-table :data="suspectteamdetaillist" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="匹配字段值" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.dim_value }}</span></template>
					</el-table-column>
					<el-table-column label="风险群体编号" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.group_id }}</span></template>
					</el-table-column>
					<el-table-column label="风险群体的节点个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.total_cnt }}</span></template>
					</el-table-column>
					<el-table-column label="风险群体的节点分布" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.node_dist }}</span></template>
					</el-table-column>
					<el-table-column label="风险名单个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.black_cnt }}</span></template>
					</el-table-column>

					<el-table-column label="风险名单占比" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.black_rat }}</span></template>
					</el-table-column>
					<el-table-column label="风险名单分布" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.fraud_dist }}</span></template>
					</el-table-column>
					<el-table-column label="关注名单个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.grey_cnt }}</span></template>
					</el-table-column>
					<el-table-column label="关注名单分布" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.grey_rat }}</span></template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row  style="padding:0 30px 10px;">
				<el-table :data="suspectteamdetaillist" highlight-current-row border ref="multipleTable" style="width: 100%">
					<el-table-column label="一层关联节点个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.degree }}</span></template>
					</el-table-column>
					<el-table-column label="二层关联节点个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.total_cnt_two }}</span></template>
					</el-table-column>
					<el-table-column label="一层风险名单个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.black_cnt_one }}</span></template>
					</el-table-column>
					<el-table-column label="一层风险名单分布" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.fraud_dist_one }}</span></template>
					</el-table-column>

					<el-table-column label="二层风险名单个数" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.black_cnt_two }}</span></template>
					</el-table-column>
					<el-table-column label="二层风险名单分布" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.fraud_dist_two }}</span></template>
					</el-table-column>
					<el-table-column label="风险名单距离" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.black_dst }}</span></template>
					</el-table-column>
					<el-table-column label="核心节点距离" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.core_dst }}</span></template>
					</el-table-column>
					<el-table-column label="节点风险分" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.node_score }}</span></template>
					</el-table-column>
					<el-table-column label="群体风险分" header-align="center" label-class-name="table-header-bold">
						<template scope="scope"><span>{{ scope.row.group_score }}</span></template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--<ul>
				<li v-for="items in suspectteamdetaillist">
					<p>匹配字段值：{{items.dim_value}}</p>
					<p>风险群体编号：{{items.group_id}}</p>
					<p>风险群体的节点个数：{{items.total_cnt}}</p>
					<p>风险群体的节点分布：{{items.node_dist}}</p>
					<p>风险名单个数：{{items.black_cnt}}</p>
					<p>风险名单占比：{{items.black_rat}}</p>
					<p>风险名单分布：{{items.fraud_dist}}</p>
					<p>关注名单个数：{{items.grey_cnt}}</p>
					<p>关注名单分布：{{items.grey_rat}}</p>
					<p>一层关联节点个数：{{items.degree}}</p>
					<p>二层关联节点个数：{{items.total_cnt_two}}</p>
					<p>一层风险名单个数：{{items.black_cnt_one}}</p>
					<p>一层风险名单分布：{{items.fraud_dist_one}}</p>
					<p>二层风险名单个数：{{items.black_cnt_two}}</p>
					<p>二层风险名单分布：{{items.fraud_dist_two}}</p>
					<p>风险名单距离：{{items.black_dst}}</p>
					<p>核心节点距离：{{items.core_dst}}</p>
					<p>节点风险分：{{items.node_score}}</p>
					<p>群体风险分：{{items.group_score}}</p>
				</li>
			</ul>-->
		</p>
	</div>
</template>
<script>
	export default {
		props: ['scoreahitData'],
		data() {
			return {
				debitandcredit: '',
				ftData: "",
				num: "",
				fData: '',
				genre: '',
				discredit: '',
				overduedetails: [],
				platformdetail: [],
				platformdetaildimension: [],
				highriskareas: [],
				hitlistdatas: [],
				frequencydetaillist: [],
				namelisthitdetails: [],
				itemstype: '',
				suspectteamdetaillist: [],
			}
		},
		methods: {
			changgeData(data) {
				if(data == 'platform_detail') {
					this.genre = '多平台规则 ';
				} else if(data == 'frequency_detail') {
					this.genre = '频度规则 ';
				} else if(data == 'discredit_count') {
					this.genre = '信贷逾期规则 ';
				} else if(data == 'custom_list') {
					this.genre = '自定义列表规则 ';
				} else if(data == 'cross_frequency_detail') {
					this.genre = '跨事件频度规则 ';
				} else if(data == 'cross_event_detail') {
					this.genre = '跨事件字段比较规则 ';
				} else if(data == 'suspect_team_detail') {
					this.genre = '复杂网络规则 ';
				}

			},
			changetype(data) {
				console.log('规则表示333333333===========================', data)
				if(data == 'black_list') {
					this.itemstype = '风险名单规则';
				} else if(data == 'grey_list') {
					this.itemstype = '关注名单规则';
				} else if(data == 'fuzzy_list') {
					this.itemstype = '模糊名单规则';
				}
			},
		},
		mounted() {
			console.log('黑名单传值显示--------',this.scoreahitData)
			for(let key in this.scoreahitData) {
				if(key === 'platform_count') {
					this.num = this.scoreahitData[key];
				} else if(key === 'fraud_type') {
					this.fData = this.scoreahitData[key];
				} else if(key === 'type') {
					this.changgeData(this.scoreahitData[key]);
				} else if(key === 'discredit_times') {
					this.discredit = this.scoreahitData[key];
				} else if(key === 'overdue_details') {
					this.overduedetails = this.scoreahitData[key];
				} else if(key === 'platform_detail') {
					this.platformdetail = this.scoreahitData[key];
				} else if(key === 'platform_detail_dimension') {
					this.platformdetaildimension = this.scoreahitData[key];
				} else if(key === 'high_risk_areas') {
					this.highriskareas = this.scoreahitData[key];
				} else if(key === 'hit_list_datas') {
					this.hitlistdatas = this.scoreahitData[key];
					console.log('列表数据=====', this.hitlistdatas);
				} else if(key === 'frequency_detail_list') {
					this.frequencydetaillist = this.scoreahitData[key];
					console.log('频度详情：=====', this.frequencydetaillist);
				} else if(key === 'namelist_hit_details') {
					this.namelisthitdetails = this.scoreahitData[key];
					console.log('被法院执行===========',this.namelisthitdetails)
					for(var i = 0; i < this.namelisthitdetails.length; i++) {
						this.changetype(this.namelisthitdetails[i].type);
					}
					console.log(' 命中名单详情列表=====', this.namelisthitdetails);
				} else if(key === 'suspect_team_detail_list') {
					this.suspectteamdetaillist = this.scoreahitData[key];
					console.log('复杂网络风险详情', this.suspectteamdetaillist)
				}
			}
		},
	}
</script>
<style>
.tongyong{
	border-bottom: 1px solid #d0d0d0;
}
</style>