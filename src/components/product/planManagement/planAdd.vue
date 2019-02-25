<template>
	<el-card class="plan-add" v-show="currentAddPlanState">
		<h3>新增套餐</h3>
		<el-form
				:model="ruleForm"
				:rules="formRules"
				ref="ruleForm"
		>
			<el-row :gutter="50">
				<el-col :span="7">
					<el-form-item prop="prodId" label="产品id:">
						<el-input v-model="ruleForm.prodId" disabled></el-input>
					</el-form-item>
					<el-form-item prop="setName" label="套餐名称:">
						<el-input v-model="ruleForm.setName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item prop="prodName" label="产品名称:">
						<el-input v-model="ruleForm.prodName" disabled></el-input>
					</el-form-item>
					<el-form-item prop="priority" label="优先级:">
						<el-input type="number" v-model.number="ruleForm.priority"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item prop="beginTime" label="起始有效时间:">
						<el-date-picker
								ref="beginTime"
								v-model="ruleForm.beginTime"
								type="datetime"
								:picker-options="beginTimeRule"
								placeholder="选择起始有效时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="endTime" label="结束有效时间:">
						<el-date-picker
								ref="endTime"
								v-model="ruleForm.endTime"
								type="datetime"
								:picker-options="endTimeRule"
								placeholder="选择结束有效时间">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item prop="memo" label="备注:">
						<el-input v-model="ruleForm.memo"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
					<el-button icon="check" type="success" @click="submitForm()">保存</el-button>
				</el-col>
			</el-row>
		</el-form>
	</el-card>
</template>

<script>
  import {planParamsRule} from '@/common/formRules'
  import {planAdd, productInfoGet} from '@/api/api'
  import Bus from '@/eventBus'

  export default {
	data(){
	  return {
		ruleForm: {
		  prodId: '',
		  prodName: '',
		  setName: '',
		  beginTime: '',
		  endTime: '',
		  priority: '',
		  memo: ''
		},
		formRules: planParamsRule
	  }
	},
	methods: {
	  //取消添加
	  cancelAdd(){
		this.$refs.ruleForm.resetFields();
		this.getProdInfo()
		this.$store.commit("cancelCurrentAddPlan");
	  },
	  submitForm(){
		// console.log(this.ruleForm.beginTime.getTime())
		this.$refs.ruleForm.validate((valid) =>{
		  if (valid) {
			this.$confirm('是否确认保存?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() =>{
			  planAdd({
				prodId: this.ruleForm.prodId,
				setName: this.ruleForm.setName,
				beginTime: this.ruleForm.beginTime.getTime(),
				endTime: this.ruleForm.endTime.getTime(),
				priority: this.ruleForm.priority,
				memo: this.ruleForm.memo
			  }).then((res) =>{
				console.log(res)
				if (res.code === '00000000') {
				  this.$message({
					type: 'success',
					message: '增加套餐成功！'
				  });
				  this.$refs.ruleForm.resetFields();
				  this.getProdInfo();
				  this.$store.commit("cancelCurrentAddPlan");
				  Bus.$emit('planListReload');
				} /*else {
				  this.$message.error(res.message);
				  return false;
				}*/
			  })
			}).catch(() =>{
			  this.$message.info('已取消')
			})
		  } else {
			this.$message.error('请填写正确的套餐参数！');
			return false;
		  }
		});
	  },
	  getProdInfo(){
		this.ruleForm.prodId = this.$route.query.prodId;
		productInfoGet({
		  prodId: this.ruleForm.prodId
		}).then((res) =>{
		  if (res.prodBasicInfo) {
			this.ruleForm.prodName = res.prodBasicInfo.prodName;
		  }
		})
	  }
	},
	mounted(){
	  this.getProdInfo()
	},
	watch: {
	  '$route': function (){
		this.getProdInfo()
	  }
	},
	computed: {
	  beginTimeRule(){
		return {
		  disabledDate(time){
			return time.getTime() < Date.now();
		  }
		}
	  },
	  endTimeRule(){
		let _this = this;
		return {
		  disabledDate(time){
			return time.getTime() < _this.ruleForm.beginTime;
		  }
		}
	  },
	  currentAddPlanState(){
		return this.$store.state.currentAddPlanState;
	  }
	},
	activated(){
	  this.$refs.ruleForm.resetFields();
	  this.getProdInfo()
	  this.$store.commit("cancelCurrentAddPlan");
	},
	created(){
	  Bus.$on('planAddReload', () =>{
		this.$refs.ruleForm.resetFields();
		this.getProdInfo()
	  })
	}
  }
</script>

<style lang="scss" scoped>
	.plan-add {
		.el-form {
		}
	}
</style>
