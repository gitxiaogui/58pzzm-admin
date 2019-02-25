<template>
	<div class="repay-ment">
		<h3>还款管理</h3>
		<el-row>
      <el-button type="primary" icon="plus" @click="addRepayment();">添加还款记录</el-button>
    </el-row>
    <!-- 添加还款记录 -->
    <el-dialog size="small" :close-on-click-modal="true" v-if="addShow" :modal-append-to-body="true" title="添加还款记录" :visible.sync="addShow">
    	<el-form
      	:rules="formRules"
    		:model="ruleForm"
      	ref="ruleForm">
    		<el-row :gutter="50">
		      <el-col :span="5">
		        <el-form-item label="还款金额:" prop="amount">
		          <el-input type="number" v-model="ruleForm.amount" placeholder="请输入还款金额"></el-input>
		        </el-form-item>
		      </el-col>
		      <el-col :span="7">
		        <el-form-item label="备注信息:" prop="content">
		          <el-input type="text" v-model="ruleForm.content" placeholder="请输入备注信息"></el-input>
		        </el-form-item>
		      </el-col>
		      <el-col :span="6">
		        <el-form-item label="还款人姓名:"  prop="repaymentName">
		          <el-input type="text" v-model="ruleForm.repaymentName" placeholder="请输入还款人姓名"></el-input>
		        </el-form-item>
		      </el-col>
		      <el-col :span="6">
		        <el-form-item label="与还款人关系:" prop="repaymentRelation">
		          <el-input type="text" v-model="ruleForm.repaymentRelation" placeholder="请输入与还款人关系"></el-input>
		        </el-form-item>
		      </el-col>
		    </el-row>
		    <el-row>
		    	<el-col :span="7">
		        <el-form-item label="还款方式:">
		        	<el-select v-model="ruleForm.type" placeholder="选择还款方式">
		            <el-option
		              v-for="item in options"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value">
		            </el-option>
		          </el-select>
		        </el-form-item>
		      </el-col>
		     	<el-col :span="4">
		      	<el-form-item label="还款时间:">
				      <el-date-picker
						    v-model="ruleForm.timeValue"
						    type="datetime"
						    placeholder="选择还款时间">
						  </el-date-picker>
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
    </el-dialog>
    
    		
    <!-- 还款记录展示 -->
    <el-row>
    	<el-table
    		class="list-table"
    		:data="currentList"
    		highlight-current-row
        border
        style="width: 100%">
    		<el-table-column
          label="还款金额"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="还款人姓名"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.repaymentName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="与还款人关系"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.repaymentRelation }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="还款渠道"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ channelTransform(scope.row.channel) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="还款时间"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ dateTransform(new Date(scope.row.repaymentTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="备注信息">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column -->
        <el-table-column
          label="审核状态"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ statusTransform(scope.row.status) }}</span>
          </template>
        </el-table-column>
    	</el-table>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="nowPage"
        :page-size="10"
      	:total="listTotalNumber"
        layout="prev, pager, next">
      </el-pagination>
    </el-row>
	</div>
</template>
<script>
  import { collectRepayment } from '@/api/api'
  import { splitArray, dateFormat } from '@/common/util.js'
  import { collectionParamsRule, caseChannelType } from '@/common/formRules'
  import { collectionOptionMixin } from '@/common/mixin'
	export default{
    mixins: [collectionOptionMixin],
		data() {
			return {
				addShow: false,
				currentList: null,
        currentData: null,
        listTotalNumber: 0,
        pageNum: 1,
        nowPage: 1,
				ruleForm: {
					amount: '',
					content: '',
					repaymentName: '',
					repaymentRelation: '',
					timeValue: '',
					type: 0
				},
        formRules: collectionParamsRule,
        options:[]
			}
		},
    watch: {
      collectionCaseInfo: function () {
        this.getList()
      }
    },
		methods: {
			getList() {
				collectRepayment(
					{
						caseId: this.collectionCaseInfo.id
					},
					'GET'
				).then((res)=>{
					console.log(res)
					this.listTotalNumber = res.data.total
          this.currentData = splitArray(res.data.data, 10);
          this.currentList = this.currentData[0]
				})
			},
			addRepayment() {
				this.addShow = true;
				this.ruleForm.amount= ""
				this.ruleForm.content= ""
				this.ruleForm.repaymentName= ""
				this.ruleForm.repaymentRelation= ""
				this.ruleForm.timeValue= ""
				this.options = []
    		caseChannelType.forEach((val, index)=>{
    			this.options.push({
    				value: index,
    				label: val,
    			})
    		})
			},
			cancelAdd() {
				this.addShow = false;
			},
			submitForm() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						if(this.ruleForm.amount <= 0) {
							this.$message.error('还款金额必须大于0');
							return;
						}
						collectRepayment(
							{
								caseId: this.collectionCaseInfo.id,
								amount: this.ruleForm.amount,
								content: this.ruleForm.content,
								repaymentName: this.ruleForm.repaymentName,
								repaymentRelation: this.ruleForm.repaymentRelation,
								repaymentTime: this.ruleForm.timeValue?this.ruleForm.timeValue.getTime():null,
								channel: this.ruleForm.type
							},
							'POST',
				      true
						).then((res)=>{
							this.addShow = false;
							this.ruleForm.amount= ""
							this.ruleForm.content= ""
							this.ruleForm.repaymentName= ""
							this.ruleForm.repaymentRelation= ""
							this.ruleForm.timeValue= ""
							this.$message({
		            type: 'success',
		            message: '添加成功'
		           });
		           this.getList()
						})
					}else {
						this.$message.error('请填写正确的参数！');
            return false;
					}
				});

			},//分页
      handlePageChange(pageNum){
        this.currentList = this.currentData[pageNum-1]
      },
      statusTransform(num){
      	if(num === 0){
      		return '待审核'
      	} else if(num === 1){
      		return '确认还款'
      	} else if(num === 2){
      		return '打回还款'
      	}
      },
      dateTransform(obj, fmt){
        return dateFormat(obj, fmt);
      },
      channelTransform(obj) {
      	return caseChannelType[obj]
      }
		},
    activated() {
    	// this.options
      this.getList()
    }
	}
</script>
<style lang="scss" scoped>
  .repay-ment {
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
</style>
