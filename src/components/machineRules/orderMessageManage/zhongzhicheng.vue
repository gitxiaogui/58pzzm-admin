<template>
	<div class="zhongzhicheng">
		<div class="blackListAuthen">
			<div class="blackListAuthenCon">
				<el-row>
					<div class="headerTitle">手机号维度</div>
					<el-table :data="zhongzhichengData" highlight-current-row border ref="multipleTable"
							  style="width: 100%">
						<el-table-column label="查询类型" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column label="黑名单类型" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ zzcDataCn.blackLevel[scope.row.blacklist.mobile.blackLevel] }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最近6个月跨机构数" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.blacklist.mobile.last6MTenantCount }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最近6个月申请查询数" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.blacklist.mobile.last6MQueryCount }}</span>
							</template>
						</el-table-column>
						<el-table-column label="入库距离天数" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.blacklist.mobile.lastConfirmAtDays =="-1" ? "查询未命中" : scope.row.blacklist.mobile.lastConfirmAtDays }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最新欺诈／逾期状态" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ zzcDataCn.qizhayuqi[scope.row.blacklist.mobile.lastConfirmStatus] }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最近12个月身份证最严重逾期状态" header-align="center"
										 label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ zzcDataCn.qizhayuqi[scope.row.blacklist.mobile.last12MMaxConfirmStatus] }}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row>
					<div class="headerTitle">身份证维度</div>
					<el-table :data="zhongzhichengData" highlight-current-row border ref="multipleTable"
							  style="width: 100%">
						<el-table-column label="查询类型" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column label="黑名单类型" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ zzcDataCn.blackLevel[scope.row.blacklist.pid.blackLevel] }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最近6个月跨机构数" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.blacklist.pid.last6MTenantCount }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最近6个月申请查询数" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.blacklist.pid.last6MQueryCount }}</span>
							</template>
						</el-table-column>
						<el-table-column label="入库距离天数" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.blacklist.pid.lastConfirmAtDays =="-1" ? "查询未命中" : scope.row.blacklist.pid.lastConfirmAtDays }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最新欺诈／逾期状态" header-align="center" label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ zzcDataCn.qizhayuqi[scope.row.blacklist.pid.lastConfirmStatus] }}</span>
							</template>
						</el-table-column>
						<el-table-column label="最近12个月身份证最严重逾期状态" header-align="center"
										 label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ zzcDataCn.qizhayuqi[scope.row.blacklist.pid.last12MMaxConfirmStatus] }}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
	props: ['data', 'hidden'],
	data(){
	  return {
	    zhongzhichengData:[],
		zzcDataCn:{
                    blackLevel:{//黑名单类型标签定义
                        none :"不是黑名单",
                        DLQX :"早期逾期",
                        DLQ90plus: "严重逾期",
                        fraud :"欺诈",
                    },
                    qizhayuqi:{//欺诈／逾期状态标签定义
                        M1: "逾期1－30天",
                        M2: "逾期31-60天",
                        M3: "逾期61-90天",
                        M4: "逾期91-120天",
                        M5: "逾期121-150天",
                        M6: "逾期151-180天",
                        "M6+": "逾期181天及以上",
                        suspected_fraud: "疑似欺诈",
                        fraud: "欺诈"
                    },

                },
	  }
	},
	methods: {},
	mounted(){
	  this.zhongzhichengData = this.data.data.data.data
		console.log(this.data.data.data.data)
	}
  }
</script>

<style lang="scss" scoped>
	.zhongzhicheng {
		.headerTitle{
			font-size:22px;
			line-height: 40px;
		}
	}
</style>