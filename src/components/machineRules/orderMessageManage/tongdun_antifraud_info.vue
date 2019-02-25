<template>
	<div class="tongdun_antifraud_info">
		<div class="tongdunTitle"><p><span>同盾分：</span><span>{{ tongdunFen.final_score }}</span></p><p><span>风险结果：</span><span>{{ suggestType[tongdunFen.final_decision] }}</span></p></div>
		<!--同盾-->
		<div class="basicInformations" style="background-color: white;">
			<ul>
				<li v-for="item in blacklistData" style="margin-bottom: 5px;border-bottom:1px solid #d0d0d0;"><!--v-if="item.item_name == '身份证命中法院结案名单' || item.item_name == '身份证命中法院执行名单' || item.item_name == '身份证法院模糊执行名单' ||
					item.item_name == '身份证命中法院失信名单' || item.item_name == '手机号命中信贷逾期名单' || item.item_name == '身份证命中信贷逾期名单' "-->
					<div style="display: flex;justify-content: space-between;padding:0 30px;">
						<p>检查项分组：<span>{{item.group}}</span></p>
						<p>检查项编号：<span>{{item.item_id}}</span></p>
						<p>检查项名称 ：<span>{{item.item_name}}</span></p>
					</div>
					<div style="background-color: #fdfdfd;">
						<p style="text-align: left;margin: 10px 0px;">检查详情</p>
						<executionofCourts :scoreahitData='item.item_detail'></executionofCourts>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import executionofCourts from './executionofCourts.vue'

  export default {
	props: ['data'],
	components: {
	  executionofCourts
	},
	data(){
	  return {
		notmatch: false,
		blacklistData: [],
		tongdunFen:{},
		suggestType:{'Reject':'建议拒绝','Review':'建议审核','Accept':'建议通过'}
	  }
	},
	methods: {},
	mounted(){

	  if (this.data.data.data.data.risk_items) {
		this.tongdunFen = this.data.data.data.data
		this.blacklistData = this.data.data.data.data.risk_items;
		if (this.blacklistData.length > 0) {
		  for (var i = 0; i < this.blacklistData.length; i++) {
			if (this.blacklistData[i].item_name == '身份证命中法院结案名单' || this.blacklistData[i].item_name == '身份证命中法院执行名单' || this.blacklistData[i].item_name == '身份证法院模糊执行名单' || this.blacklistData[i].item_name == '身份证命中法院失信名单' || this.blacklistData[i].item_name == '手机号命中信贷逾期名单' || this.blacklistData[i].item_name == '身份证命中信贷逾期名单') {
			  return;
			} else {
			  this.unmatchData = true;
			  return;
			}
		  }
		} else if (this.blacklistData.length === 0) {
		  this.unmatchData = true;
		}
	  }
	}
  }
</script>

<style lang="scss">
	.tongdun_antifraud_info {
		.tongdunTitle{
			padding:0 20px;
			font-size:18px;
			margin-bottom:30px;
			display: flex;
			justify-content: space-between;
			p{
				span:nth-of-type(2){
					color:red;
				}
			}

		}
		.basicInformations {
			width: 100%;
			.basicInformationsUlLi {

			}
			p {
				line-height: 26px;
			}
		}

	}

</style>