<template>
	<div class="sy_black_Report">
		<div class="syScore">雨点分：<span>{{ syReport.syScore }}</span></div>
		<div v-for="(item,index) in syReport.syReport" :key="index" v-if="item">
			<h3>{{ item.name }}</h3>
			<div class="content" v-for="(ite,inde) in item.loanInfo" :key="inde">
				<div class="title">
					{{ dataType[inde] }}
				</div>
				<div class="table_wrap" v-if="ite.all">
					<div class="inner_content" v-for="(it,ind) in ite.all.timeScopes" :key="ind">
						<div class="inner_title">
							{{ dataType[ind] }}
						</div>
						<div class="table_inner">
							<table>
								<thead>
								<tr>
									<td v-for="(i,d,a) in it"  v-if="a<7" :key="d">{{ shenYueData[d] }}{{ a }}</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td v-for="(i,d,a) in it" v-if="a<7" :key="d">{{ i==-1? '-' : i }}</td>
								</tr>
								</tbody>
							</table>
							<table>
								<thead>
								<tr>
									<td v-for="(i,d,a) in it" v-if="a>7 && a<=14" :key="d">{{ shenYueData[d] }}{{ a }}
									</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td v-for="(i,d,a) in it" v-if="a>7 && a<=14" :key="d">{{ i==-1? '-' : i }}</td>
								</tr>
								</tbody>
							</table>
							<table>
								<thead>
								<tr>
									<td v-for="(i,d,a) in it" v-if="a>14" :key="d">{{ shenYueData[d] }}{{ a }}</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td v-for="(i,d,a) in it" v-if="a>14" :key="d">{{ i==-1? '-' : i }}</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="table_wrap" v-if="!ite.all">
					<div class="inner_content">
						<div class="inner_title">
							90天维度报告
						</div>
						<div class="table_inner">
							<table>
								<thead>
								<tr>
									<td>报告查询次数</td>
									<td>贷款笔数</td>
									<td>贷款机构数</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>暂无数据</td>
									<td>暂无数据</td>
									<td>暂无数据</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="inner_content">
						<div class="inner_title">
							360天维度报告
						</div>
						<div class="table_inner">
							<table>
								<thead>
								<tr>
									<td>报告查询次数</td>
									<td>贷款笔数</td>
									<td>贷款机构数</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>暂无数据</td>
									<td>暂无数据</td>
									<td>暂无数据</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="inner_content">
						<div class="inner_title">
							历史上全部维度报告
						</div>
						<div class="table_inner">
							<table>
								<thead>
								<tr>
									<td>贷款笔数</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>暂无数据</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!--<div class="table_wrap" v-if="!ite.all">
					<div class="inner_content">
						<div class="inner_title">
							360天维度报告
						</div>
						<div class="table_inner">
							<table>
								<thead>
								<tr>
									<td>报告查询次数</td>
									<td>贷款笔数</td>
									<td>贷款机构数</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>暂无数据</td>
									<td>暂无数据</td>
									<td>暂无数据</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="table_wrap" v-if="!ite.all">
					<div class="inner_content">
						<div class="inner_title">
							历史上全部维度报告
						</div>
						<div class="table_inner">
							<table>
								<thead>
								<tr>
									<td>贷款笔数</td>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>暂无数据</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>-->
			</div>
		</div>

	</div>
</template>

<script>
  import shenYueData from './shenyueData'

  export default {
	props: ['data'],
	data(){
	  return {
		syReport: this.data.data.data.data,
		orderList: [],
		shenYueData: shenYueData,
		// dataType:['IP地址维度','手机号维度','身份证维度'],
		dataType: {
		  'pid': '身份证维度',
		  'mobile': '手机号维度',
		  'deviceId': '设备ID维度',
		  'ipAddress': 'IP地址维度',
		  'D90': '90天维度报告',
		  'D360': '360天维度报告',
		  'ALL': '历史上全部维度报告'
		}
	  }
	},
	watch: {
	  data(a){
		this.syReport = a.data.data.data
	  }
	},
	methods: {},
	mounted(){
	  console.log(this.data.data.data.data)
	  console.log(shenYueData)
	}
  }
</script>

<style lang="scss" scoped>
	.sy_black_Report {
		.syScore{
			font-size:20px;
			text-align: right;
			padding:0 10px;
			span{
				color:red;
			}
		}
		.content {
			display: flex;

			margin: 10px 0;
			.title {
				width: 20px;
				font-size: 16px;
				font-weight: bold;
				min-width: 20px;
				padding: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #ccc;
			}

			.table_wrap {
				flex: 1;
				.inner_content {
					display: flex;
					.inner_title {
						width: 80px;
						min-width: 80px;
						padding: 10px;
						display: flex;
						justify-content: center;
						align-items: center;
						border-top: 1px solid #ccc;
						border-bottom: 1px solid #ccc;
					}
					.table_inner {
						flex: 1;
						border-top:1px solid #ccc;
						table {
							width: 100%;
							border-collapse: collapse;
							border: 1px solid #ccc;
							border-spacing: 0;
							border-right: none;
							border-bottom: none;
							border-right: 0;
							border-top:0;
							border-bottom: 0;
							thead, tbody {
								display: flex;
							}
							tr {
								flex: 1;
								display: flex;
							}
							td {
								flex: 1;
								border: 1px solid #ccc;
								line-height: 32px;
								text-align: center;
								border-left: none;
								border-top: none;
								border-left: 0;
								border-top: 0;
							}
							thead {
								background: #f2f2f2;
							}
						}
					}
				}

			}

		}
	}
</style>