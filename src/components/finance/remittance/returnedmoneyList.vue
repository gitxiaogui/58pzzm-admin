<template>
	<el-row class="product-list">
		<el-table class="list-table" :data="returnedmoneyData" highlight-current-row border style="width: 100%">
			<el-table-column label="回款ID">
				<template scope="scope">
					<span style="margin-left: 10px">{{scope.row.id}}</span>
				</template>
			</el-table-column>
			<el-table-column label="回款渠道">
				<template scope="scope">
					<span style="margin-left: 10px">{{ judgeCalculate(scope.row.channel) }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="回款金额">
				<template scope="scope">
					<span style="margin-left: 10px">{{ scope.row.amount }}</span>
				</template>
			</el-table-column>
			<el-table-column label="回款时间">
				<template scope="scope">
					<span style="margin-left: 10px">{{ Transformdate(new Date(parseInt(scope.row.returnTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
				</template>
			</el-table-column>
			<!--<el-table-column label="回款状态">
				<template scope="scope">
					<el-col>
						<el-button size="small" type="info" @click="getReturnedmoney(scope.row)">确认回款</el-button>
					</el-col>
				</template>
			</el-table-column>-->
		</el-table>
	</el-row>
</template>
<script>
	import { paymentconfirmData, referpaymentconfirmData } from '@/api/api'
	import { dateFormat } from '@/common/util.js'
	import Bus from '@/eventBus'
	export default {
		props: ['dataToChild'],
		data() {
			return {
				returnedmoneyData: [],
				getborrowmoneyId: '',
				chnagge: '',
				listMap: [],
				getscoperowData: '',
			}
		},
		methods: {
			getreturnedmoneydataList() {
				this.getborrowmoneyId = this.dataToChild
				console.log('借款ID22222222222222222222222222', this.getborrowmoneyId)
				this.httpRequest.amountList({
					lenderCaseId: this.dataToChild
				}).then((res) => {
					this.returnedmoneyData = res.data
					console.log('=========================回款确认记录更改的', res)
				})
			},
			judgeCalculate(judge) {
				if(judge === 0) {
					return '连连支付';
				} else if(judge === 1) {
					return '支付宝';
				} else if(judge === 2) {
					return '宝付';
				} else if(judge === 3) {
					return '微信支付';
				} else if(judge === 4) {
					return '对公账户';
				} else if(judge === 5) {
					return  '扫码';
				}
			},
			Transformdate(obj, fmt) {
				return dateFormat(obj, fmt)
			},
			getReturnedmoney(row) {
				this.listMap = []
				this.listMap.push({
					'lenderCaseId': row.id,
					'amount': row.amount,
					'type': '2',
					'userName': row.userName,
					'returnTime': row.repayTime,
					'channel': row.channel,
					'label': '1',
					'amountRecordId': row.aId,
					'phoneNumber': row.phoneNumber,
				});
				this.$confirm('此操作将确认回款申请, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					referpaymentconfirmData({
						data: this.listMap
					}).then((res) => {
						console.log(res)
						if(res.code === '00000000') {
							this.$message.success('操作成功')
							this.getreturnedmoneydataList();
							Bus.$emit('returnedmoneyRecord');
						}/* else {
							if(res.message) {
								this.$message.error(res.message);
							} else {
								this.$message.error('回款确认失败！');
							}
						}*/
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
		},
		watch: {},
		mounted() {
			console.log(this.dataToChild)
			this.getreturnedmoneydataList()
		},
	}
</script>

<style lang="scss" scoped>
	.product-list {
		.el-row {
			margin-bottom: 15px;
			&:last-child {
				margin-bottom: 0px;
			}
		}
		.list-table {
			margin-bottom: 10px;
			cursor: pointer;
		}
		.el-dialog {
			p {
				font-size: 14px;
				margin-bottom: 15px;
			}
		}
	}
</style>