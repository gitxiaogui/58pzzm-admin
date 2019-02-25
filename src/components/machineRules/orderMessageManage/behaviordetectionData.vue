<template>
	<!--<div style="margin-bottom: 5px;border-bottom:1px solid #d0d0d0;">

	   &lt;!&ndash;<p v-if="check_point">分析点：{{check_point}}</p>
	   <p v-if="this.num > 0">结果：<span style="background-color: red;color: white;">{{result}}	</span></p>
	   <p v-else-if="this.num <= 0">结果：{{result}}</p>
	   <p>证据：{{evidence}}</p>&ndash;&gt;
	   &lt;!&ndash;<p>标记：{{ caseChannelType[Number(items.score)] }}</p>&ndash;&gt;
	</div>-->
	<div>
		<ul class="secondLevelUl secondLevelUlTwo" >
			<li v-if="check_point">{{check_point}}</li>
			<li v-if="this.num > 0"><span style="background-color: red;color: white;">{{result}}	</span></li>
			<li v-else-if="this.num <= 0">{{result}}</li>
			<li v-if="num1">{{evidence}}</li>
			<li v-if="!num1"><span style="background-color: red;color: white;">{{evidence}}</span></li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: ['behaviordetection'],
		data() {
			return {
				check_point:'',
				result:'',
				evidence:'',
				num:'',
			  	num1:'',
			}
		},
		methods: {
			changeColer(data){
//				console.log('出错的数据============',data)
				if(data.indexOf('未超过') == -1){
				  this.num= data.replace(/[^0-9]/ig,"");
				}


//              console.log('关机情况============',this.num);
			},
		  changeCole(data){
			  if(data.indexOf('互通过电话的号码数量') == -1){
				  this.num1= true
				}
		  }
		},
		mounted() {
			for(let ite in this.behaviordetection) {
				this.check_point = this.behaviordetection.check_point;
				this.result = this.behaviordetection.result;
				this.evidence = this.behaviordetection.evidence;
				this.changeColer(this.behaviordetection.result);
				this.changeCole(this.behaviordetection.check_point);

			}


		},
	}
</script>
<style>

</style>