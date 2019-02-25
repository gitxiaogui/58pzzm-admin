<template>
	<div class="youfen_full_check">
		<div>
			<div class="secondLevel"><span class="secondLevelTitle">
				贷款申请详情({{ S004TypeLength != "" ? S004TypeLength : 0 }}条)<span style="color:red;">{{ S004TypeLength != "" ? '' : '未命中风险项，风险等级低' }}</span>
			</span></div>
			<!--贷款申请详情-->
			<el-row>
				<el-table :data="longLoanFullCheckS004.data" highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="平台类型" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ arr[scope.row.platformType] }}</span>
						</template>
					</el-table-column>
					<el-table-column label="平台代码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.platformCode }}</span>
						</template>
					</el-table-column>
					<el-table-column label="申请时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.applicationTime }}</span>
						</template>
					</el-table-column>
					<el-table-column label="申请金额区间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.applicationAmount }}</span>
						</template>
					</el-table-column>
					<el-table-column label="申请结果" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.applicationResult == 'yes' ? '成功' : '失败' }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--贷款放款详情-->
			<div class="secondLevel"><span class="secondLevelTitle">
				贷款放款详情({{ S007TypeLength != "" ? S007TypeLength : 0 }}条)<span style="color:red;">{{ S007TypeLength != "" ? '' : '未命中风险项，风险等级低' }}</span>
			</span></div>
			<el-row>
				<el-table :data="longLoanFullCheckS007.data" highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="平台类型" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ arr[scope.row.platformType] }}</span>
						</template>
					</el-table-column>
					<el-table-column label="平台代码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.platformCode }}</span>
						</template>
					</el-table-column>
					<el-table-column label="放款时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.loanLendersTime }}</span>
						</template>
					</el-table-column>
					<el-table-column label="放款金额区间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.loanLendersAmount }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<!--贷款驳回详情-->
			<div class="secondLevel"><span class="secondLevelTitle">
				贷款驳回详情({{ S009TypeLength != "" ? S009TypeLength : 0 }}条)<span style="color:red;">{{ S009TypeLength != "" ? '' : '未命中风险项，风险等级低' }}</span>
			</span></div>
			<el-row>
				<el-table :data="longLoanFullCheckS009.data" highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="平台类型" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ arr[scope.row.platformType] }}</span>
						</template>
					</el-table-column>
					<el-table-column label="平台代码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.platformCode }}</span>
						</template>
					</el-table-column>
					<el-table-column label="驳回时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.rejectionTime }}</span>
						</template>
					</el-table-column>

				</el-table>
			</el-row>
			<!--逾期平台详情查询-->
			<div class="secondLevel"><span class="secondLevelTitle">
				逾期平台详情查询({{ S012TypeLength != "" ? S012TypeLength : 0 }}条)<span style="color:red;">{{ S012TypeLength != "" ? '' : '未命中风险项，风险等级低' }}</span>
			</span></div>
			<el-row>
				<el-table :data="longLoanFullCheckS012.data" highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="逾期数量" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.counts }}</span>
						</template>
					</el-table-column>
					<el-table-column label="逾期金额区间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.money }}</span>
						</template>
					</el-table-column>
					<el-table-column label="平台代码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.platformCode }}</span>
						</template>
					</el-table-column>

				</el-table>
			</el-row>
			<!--欠款查询-->
			<div class="secondLevel"><span class="secondLevelTitle">
				逾期平台详情查询({{ S013TypeLength != "" ? S013TypeLength : 0 }}条)<span style="color:red;">{{ S013TypeLength != "" ? '' : '未命中风险项，风险等级低' }}</span>
			</span></div>
			<el-row>
				<el-table :data="longLoanFullCheckS013.data" highlight-current-row border ref="multipleTable"
						  style="width: 100%">
					<el-table-column label="欠款金额区间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.money }}</span>
						</template>
					</el-table-column>

					<el-table-column label="平台代码" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.platformCode }}</span>
						</template>
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
		lendingStatistics: [],
		criminalInvestigation: [],
		longLoanFullCheck: [],
		longLoanFullCheckS004: [],
		longLoanFullCheckS007: [],
		longLoanFullCheckS009: [],
		longLoanFullCheckS012: [],
		longLoanFullCheckS013: [],
		cycleTime: '',
		arr: {
		  '0': '全部',
		  '1': "银行",
		  "2": "非银行"
		},
		S013Type: true,
		S012Type: true,
		S004Type: true,
		S007Type: true,
		S009Type: true,
		verificationFlag: true,

		S004TypeLength: '',
		S007TypeLength: '',
		S009TypeLength: '',
		S012TypeLength: '',
		S013TypeLength: '',
	  }
	},
	methods: {},
	mounted(){
	  console.log('全量核查========', this.data.data.data.data)
	  if (!this.data.data.data.data) {
		this.longLoanFullCheckS004 = []
		this.longLoanFullCheckS007 = []
		this.longLoanFullCheckS009 = []
		this.longLoanFullCheckS012 = []
		this.longLoanFullCheckS013 = []
	  } else {
		this.longLoanFullCheck = this.data.data.data.data
		this.cycleTime = this.longLoanFullCheck.data

		this.longLoanFullCheckS004 = this.longLoanFullCheck.data.S004
		this.longLoanFullCheckS007 = this.longLoanFullCheck.data.S007
		this.longLoanFullCheckS009 = this.longLoanFullCheck.data.S009
		this.longLoanFullCheckS012 = this.longLoanFullCheck.data.S012
		this.longLoanFullCheckS013 = this.longLoanFullCheck.data.S013

		this.S004TypeLength = this.longLoanFullCheckS004.data.length
		this.S007TypeLength = this.longLoanFullCheckS007.data.length
		this.S009TypeLength = this.longLoanFullCheckS009.data.length
		this.S012TypeLength = this.longLoanFullCheckS012.data.length
		this.S013TypeLength = this.longLoanFullCheckS013.data.length
		if (this.longLoanFullCheckS004.data.length) {
		  this.S004Type = true
		} else {
		  this.S004Type = false
		}
		if (this.longLoanFullCheckS007.data.length) {
		  this.S007Type = true
		} else {
		  this.S007Type = false
		}
		if (this.longLoanFullCheckS009.data.length) {
		  this.S009Type = true
		} else {
		  this.S009Type = false
		}
		if (this.longLoanFullCheckS012.data.length) {
		  this.S012Type = true
		} else {
		  this.S012Type = false
		}
		if (this.longLoanFullCheckS013.data.length) {
		  this.S013Type = true
		} else {
		  this.S013Type = false
		}
	  }

	}
  }
</script>

<style lang="scss">
	.youfen_full_check {
		.secondLevelTitle {
			font-size: 16px;
			line-height: 40px;
			span{
				font-size:12px;
			}
		}
	}
</style>