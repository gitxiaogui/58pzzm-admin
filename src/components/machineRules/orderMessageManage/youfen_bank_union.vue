<template>
	<div class="youfen_bank_union">
		<div v-show="!unionFlag" style="text-align: center;margin: 10px 0px;font-size: 16px;">
			<p>未匹配银联数据</p>
		</div>
		<div v-show="unionFlag" class="bankDataList " v-for="(item,index) in bankData" :key="index">
			<div @click="cupdListClick(index)" style="display: flex;align-items: center;padding:10px 0;">
				<span class="Informationspan">持卡ID{{item.cardId}}</span>
				<span style="margin-left:10px;"><i class="iconfont" :class="item.flag ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i></span>
			</div>

			<div class="bankDataCenter" v-show="item.flag" style="text-indent: .32rem;">
				<p>最近一次交易时间（代扣）：<span>{{ item.transLastDate }}</span></p>
				<p>第一次交易时间（代扣）：<span>{{ item.transFirstDate }}</span></p>
				<p>最近1个月扣款机构数量：<span>{{ item.latest_1M_OrgCount }}</span></p>
				<p>最近1个月扣款失败机构数量：<span>{{ item.latest_1M_FailOrgCount }}</span></p>
				<p>最近1个月扣款交易次数：<span>{{ item.latest_1M_TransCount }}</span></p>
				<p>最近1个月机构扣款失败次数：<span>{{ item.latest_1M_FailTransCount }}</span></p>
				<p>最近1个月机构因余额不足扣款失败次数：<span>{{ item.lowBalance_1M_FailCount }}</span></p>
				<p>最近1个月成功扣款总额：<span>{{ item.success_1M_PayTotalAmount }}</span></p>
				<p>最近1个月单笔代扣最大交易金额：<span>{{ item.success_1M_PayMaxAmount }}</span></p>
				<p>最近1个月单笔代扣金额均值：<span>{{ item.success_1M_PayAvgAmount }}</span></p>
				<p>最近1个月代付机构数量：<span>{{ item.latest_1M_OtherPayOrgCount }}</span></p>
				<p>最近1个月成功代付总额：<span>{{ item.success_1M_OtherPayTotalAmount }}</span></p>
				<p>最近1个月代付单笔交易最大交易金额：<span>{{ item.success_1M_OtherPayMaxAmount }}</span></p>
				<p>最近1个月代付单笔交易金额均值：<span>{{ item.success_1M_OtherPayAvgAmount }}</span></p>
				<p>最近3个月扣款机构数量：<span>{{ item.latest_3M_OrgCount }}</span></p>
				<p>最近3个月扣款失败机构数量：<span>{{ item.latest_3M_FailOrgCount }}</span></p>
				<p>最近3个月扣款交易次数：<span>{{ item.latest_3M_TransCount }}</span></p>
				<p>最近3个月机构扣款失败次数：<span>{{ item.latest_3M_FailTransCount }}</span></p>
				<p>最近3个月机构因余额不足扣款失败次数：<span>{{ item.lowBalance_3M_FailCount }}</span></p>
				<p>最近3个月成功扣款总额：<span>{{ item.success_3M_PayTotalAmount }}</span></p>
				<p>最近3个月单笔代扣最大交易金额：<span>{{ item.success_3M_PayMaxAmount }}</span></p>
				<p>最近3个月单笔代扣金额均值：<span>{{ item.success_3M_PayAvgAmount }}</span></p>
				<p>最近3个月代付机构数量：<span>{{ item.latest_3M_OtherPayOrgCount }}</span></p>
				<p>最近3个月成功代付总金额：<span>{{ item.success_3M_OtherPayTotalAmount }}</span></p>
				<p>最近3个月代付单笔交易最大交易金额：<span>{{ item.success_3M_OtherPayMaxAmount }}</span></p>
				<p>最近3个月代付单笔交易金额均值：<span>{{ item.success_3M_OtherPayAvgAmount }}</span></p>
				<p>最近6个月扣款机构数量：<span>{{ item.latest_6M_OrgCount }}</span></p>
				<p>最近6个月扣款失败机构数量：<span>{{ item.latest_6M_FailOrgCount }}</span></p>
				<p>最近6个月扣款交易次数：<span>{{ item.latest_6M_TransCount }}</span></p>
				<p>最近6个月机构扣款失败次数：<span>{{ item.latest_6M_FailTransCount }}</span></p>
				<p>最近6个月机构因余额不足扣款失败次数：<span>{{ item.lowBalance_6M_FailCount }}</span></p>
				<p>最近6个月成功扣款总额：<span>{{ item.success_6M_PayTotalAmount }}</span></p>
				<p>最近6个月单笔代扣最大交易金额：<span>{{ item.success_6M_PayMaxAmount }}</span></p>
				<p>最近6个月单笔代扣金额均值：<span>{{ item.success_6M_PayAvgAmount }}</span></p>
				<p>最近6个月代付机构数量：<span>{{ item.latest_6M_OtherPayOrgCount }}</span></p>
				<p>最近6个月成功代付总金额：<span>{{ item.success_6M_OtherPayTotalAmount }}</span></p>
				<p>最近6个月代付单笔交易最大交易金额：<span>{{ item.success_6M_OtherPayMaxAmount }}</span></p>
				<p>最近6个月代付单笔交易金额均值：<span>{{ item.success_6M_OtherPayAvgAmount }}</span></p>
				<p>最近12个月扣款机构数量：<span>{{ item.latest_12M_OrgCount }}</span></p>
				<p>最近12个月扣款失败机构数量：<span>{{ item.latest_12M_FailOrgCount }}</span></p>
				<p>最近12个月扣款交易次数：<span>{{ item.latest_12M_TransCount }}</span></p>
				<p>最近12个月机构扣款失败次数：<span>{{ item.latest_12M_FailTransCount }}</span></p>
				<p>最近12个月机构因余额不足扣款失败次数：<span>{{ item.lowBalance_12M_FailCount }}</span></p>
				<p>最近12个月成功扣款总金额：<span>{{ item.success_12M_PayTotalAmount }}</span></p>
				<p>最近12个月单笔代扣最大交易金额：<span>{{ item.success_12M_PayMaxAmount }}</span></p>
				<p>最近12个月单笔代扣金额均值：<span>{{ item.success_12M_PayAvgAmount }}</span></p>
				<p>最近12个月代付机构数量：<span>{{ item.latest_12M_OtherPayOrgCount }}</span></p>
				<p>最近12个月成功代付总金额：<span>{{ item.success_12M_OtherPayTotalAmount }}</span></p>
				<p>最近12个月代付单笔交易最大交易金额：<span>{{ item.success_12M_OtherPayMaxAmount }}</span></p>
				<p>最近12个月代付单笔交易金额均值：<span>{{ item.success_12M_OtherPayAvgAmount }}</span></p>
				<p>最近半年新开过户：<span>{{ item.fundOpen6mHave }}</span></p>
				<p>最近半年新开户次数：<span>{{ item.fundOpen6mCount }}</span></p>
				<p>最近1个月申购基金数量：<span>{{ item.fundPur1m }}</span></p>
				<p>最近1个月申购股票型基金数量：<span>{{ item.fundPurEqy1m }}</span></p>
				<p>最近1个月申购货币型基金数量：<span>{{ item.fundPurMoy1m }}</span></p>
				<p>最近1个月申购债券型基金数量：<span>{{ item.fundPurBond1m }}</span></p>
				<p>最近1个月基金申购交易笔数：<span>{{ item.transCountPur1m }}</span></p>
				<p>最近1个月基金申购成功交易笔数：<span>{{ item.successCountPur1m }}</span></p>
				<p>最近1个月基金成功申购总金额：<span>{{ item.amountSuccessPur1m }}</span></p>
				<p>最近1个月基金申购成功交易最大金额：<span>{{ item.amountMaxPur1m }}</span></p>
				<p>最近1个月基金申购成功交易笔均金额：<span>{{ item.amountAvgPur1m }}</span></p>
				<p>最近1个月定投基金数量：<span>{{ item.fundApi1m }}</span></p>
				<p>最近1个月定投股票型基金数量：<span>{{ item.fundApiEqy1m }}</span></p>
				<p>最近1个月定投货币型基金数量：<span>{{ item.fundApiMoy1m }}</span></p>
				<p>最近1个月定投债券型基金数量：<span>{{ item.fundApiBond1m }}</span></p>
				<p>最近1个月基金定投交易笔数：<span>{{ item.transCountApi1m }}</span></p>
				<p>最近1个月基金定投成功交易笔数：<span>{{ item.successCountApi1m }}</span></p>
				<p>最近1个月基金成功定投总金额：<span>{{ item.amountSuccessApi1m }}</span></p>
				<p>最近1个月基金定投成功交易最大金额：<span>{{ item.amountMaxApi1m }}</span></p>
				<p>最近1个月基金定投成功交易笔均金额：<span>{{ item.amountAvgApi1m }}</span></p>
				<p>最近1个月分红基金数量：<span>{{ item.fundDiv1m }}</span></p>
				<p>最近1个月分红股票型基金数量：<span>{{ item.fundDivEqy1m }}</span></p>
				<p>最近1个月分红货币型基金数量：<span>{{ item.fundDivMoy1m }}</span></p>
				<p>最近1个月分红债券型基金数量：<span>{{ item.fundDivBond1m }}</span></p>
				<p>最近1个月基金分红交易笔数：<span>{{ item.transCountDiv1m }}</span></p>
				<p>最近1个月基金分红成功交易笔数：<span>{{ item.successCountDiv1m }}</span></p>
				<p>最近1个月基金成功分红总金额：<span>{{ item.amountSuccessDiv1m }}</span></p>
				<p>最近1个月基金分红成功交易最大金额：<span>{{ item.amountMaxDiv1m }}</span></p>
				<p>最近1个月基金分红成功交易笔均金额：<span>{{ item.amountAvgDiv1m }}</span></p>
				<p>最近1个月赎回基金数量：<span>{{ item.fundRedm1m }}</span></p>
				<p>最近1个月赎回股票型基金数量：<span>{{ item.fundRedmEqy1m }}</span></p>
				<p>最近1个月赎回货币型基金数量：<span>{{ item.fundRedmMoy1m }}</span></p>
				<p>最近1个月赎回债券型基金数量：<span>{{ item.fundRedmBond1m }}</span></p>
				<p>最近1个月基金赎回交易笔数：<span>{{ item.transCountRedm1m }}</span></p>
				<p>最近1个月基金赎回成功交易笔数：<span>{{ item.successCountRedm1m }}</span></p>
				<p>最近1个月基金成功赎回总金额：<span>{{ item.amountSuccessRedm1m }}</span></p>
				<p>最近1个月基金赎回成功交易最大金额：<span>{{ item.amountMaxRedm1m }}</span></p>
				<p>最近1个月基金赎回成功交易笔均金额：<span>{{ item.amountAvgRedm1m }}</span></p>
				<p>最近12个月申购基金数量：<span>{{ item.fundPur12m }}</span></p>
				<p>最近12个月申购股票型基金数量：<span>{{ item.fundPurEqy12m }}</span></p>
				<p>最近12个月申购货币型基金数量：<span>{{ item.fundPurMoy12m }}</span></p>
				<p>最近12个月申购债券型基金数量：<span>{{ item.fundPurBond12m }}</span></p>
				<p>最近12个月基金申购交易笔数：<span>{{ item.transCountPur12m }}</span></p>
				<p>最近12个月基金申购成功交易笔数：<span>{{ item.successCountPur12m }}</span></p>
				<p>最近12个月基金成功申购总金额：<span>{{ item.amountSuccessPur12m }}</span></p>
				<p>最近12个月基金申购成功交易最大金额：<span>{{ item.amountMaxPur12m }}</span></p>
				<p>最近12个月基金申购成功交易笔均金额：<span>{{ item.amountAvgPur12m }}</span></p>
				<p>最近12个月定投基金数量：<span>{{ item.fundApi12m }}</span></p>
				<p>最近12个月定投股票型基金数量：<span>{{ item.fundApiEqy12m }}</span></p>
				<p>最近12个月定投货币型基金数量：<span>{{ item.fundApiMoy12m }}</span></p>
				<p>最近12个月定投债券型基金数量：<span>{{ item.fundApiBond12m }}</span></p>
				<p>最近12个月基金定投交易笔数：<span>{{ item.transCountApi12m }}</span></p>
				<p>最近12个月基金定投成功交易笔数：<span>{{ item.successCountApi12m }}</span></p>
				<p>最近12个月基金成功定投总金额：<span>{{ item.amountSuccessApi12m }}</span></p>
				<p>最近12个月基金定投成功交易最大金额：<span>{{ item.amountMaxApi12m }}</span></p>
				<p>最近12个月基金定投成功交易笔均金额：<span>{{ item.amountAvgApi12m }}</span></p>
				<p>最近12个月分红基金数量：<span>{{ item.fundDiv12m }}</span></p>
				<p>最近12个月分红股票型基金数量：<span>{{ item.fundDivEqy12m }}</span></p>
				<p>最近12个月分红货币型基金数量：<span>{{ item.fundDivMoy12m }}</span></p>
				<p>最近12个月分红债券型基金数量：<span>{{ item.fundDivBond12m }}</span></p>
				<p>最近12个月基金分红交易笔数：<span>{{ item.transCountDiv12m }}</span></p>
				<p>最近12个月基金分红成功交易笔数：<span>{{ item.successCountDiv12m }}</span></p>
				<p>最近12个月基金成功分红总金额：<span>{{ item.amountSuccessDiv12m }}</span></p>
				<p>最近12个月基金分红成功交易最大金额：<span>{{ item.amountMaxDiv12m }}</span></p>
				<p>最近12个月基金分红成功交易笔均金额：<span>{{ item.amountAvgDiv12m }}</span></p>
				<p>最近12个月赎回基金数量：<span>{{ item.fundRedm12m }}</span></p>
				<p>最近12个月赎回股票型基金数量：<span>{{ item.fundRedmEqy12m }}</span></p>
				<p>最近12个月赎回货币型基金数量：<span>{{ item.fundRedmMoy12m }}</span></p>
				<p>最近12个月赎回债券型基金数量：<span>{{ item.fundRedmBond12m }}</span></p>
				<p>最近12个月基金赎回交易笔数：<span>{{ item.transCountRedm12m }}</span></p>
				<p>最近12个月基金赎回成功交易笔数：<span>{{ item.successCountRedm12m }}</span></p>
				<p>最近12个月基金成功赎回总金额：<span>{{ item.amountSuccessRedm12m }}</span></p>
				<p>最近12个月基金赎回成功交易最大金额：<span>{{ item.amountMaxRedm12m }}</span></p>
				<p>最近12个月基金赎回成功交易笔均金额：<span>{{ item.amountAvgRedm12m }}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
	props: ['data'],
	data(){
	  return {
		bankData: [],
		text:'',
		unionpayFlag:false,
		unionFlag:false,

	  }
	},
	methods: {
	  cupdListClick(index){
		this.bankData[index].flag = !this.bankData[index].flag
	  },

	},
	mounted(){
	  let that = this
	  console.log('银联数据==========', this.data.data.data.data.detail)
	  if (!this.data.data.data.data) {
		this.bankData = []
		this.unionFlag = false
	  } else {
	    this.unionFlag = true
		this.bankData = this.data.data.data.data.detail
		this.bankData.map((item,index)=>{
		  console.log(item,index)
		  this.$set(item,'flag',false)
		})
	  }
	}
  }
</script>

<style lang="scss">
	.youfen_bank_union {
		padding:0 20px;
		font-size:16px;
		.bankDataList{

			.Informationspan{
				font-size:18px;
			}
			.iconfont{
				font-size:14px;
			}
		}
		.bankDataCenter{
			line-height: 32px;
			margin-bottom:30px;
			padding-left:28px;
		}
	}
</style>