<template>
	<div class="abate-ment">
		<h3>减免管理</h3>
		<el-row>
      <el-button type="primary" icon="plus" @click="addabatement();">添加减免</el-button>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" v-if="addShow" :modal-append-to-body="true" title="添加减免" :visible.sync="addShow">
    	<el-form
    		:model="ruleForm">
    		<el-row :gutter="24">
		      <el-col :span="6">
		        <el-form-item prop="time" label="减免日期">
		        	<el-date-picker
		            v-model="ruleForm.datetime"
		            type="datetime"
		            :picker-options="timeRule"
		            placeholder="选择减免日期"
		            @change="changeCount">
		          </el-date-picker>
		        </el-form-item>
		      </el-col>
		      <el-col :span="9">
		        <el-form-item prop="time" label="逾期天数">
		        	<el-input type="number" v-model="ruleForm.overdueDay" placeholder="逾期天数" disabled>
		          </el-input>
		        </el-form-item>
		      </el-col>
		      <el-col :span="9">
		        <el-form-item label="应还金额">
		        	<el-input type="number" v-model="ruleForm.receivableAmount" placeholder="应还金额" disabled>
		          </el-input>
		        </el-form-item>
		      </el-col>
		    </el-row>
		    <el-row :gutter="24">
		      <el-col :span="6">
		        <el-form-item prop="amount" label="减免金额">
		          <el-input type="number" v-model="ruleForm.amount" :disabled="amountDisabled" @change="changeAmount" placeholder="请填写金额"></el-input>
		        </el-form-item>
		      </el-col>
		      <el-col :span="9">
		        <el-form-item prop="amount" label="减免后金额">
		          <el-input type="number" v-model="ruleForm.resultAmount" :disabled="amountDisabled" @change="changeResultAmount" placeholder="请填写金额"></el-input>
		        </el-form-item>
		      </el-col>
		    </el-row>
		    <el-row>
		      <el-col>
		        <el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
		        <el-button icon="check" type="success" :disabled="disabled" @click="submitForm()">保存</el-button>
		      </el-col>
		    </el-row>
    	</el-form>
    </el-dialog>
    		
    <el-row>
    	<el-table
    		class="list-table"
    		:data="currentList"
    		highlight-current-row
        border
        style="width: 100%">
        <el-table-column
          label="未还金额"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.discount }}</span>
          </template>
        </el-table-column>
    		<el-table-column
          label="减免金额"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="添加时间"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ dateTransform(new Date(scope.row.createTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="有效期限"
	        label-class-name="table-header-bold"
	        header-align="center">
          <template scope="scope">
            <span style="margin-left: 10px">{{ dateTransform(new Date(scope.row.expiration), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
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
        :page-size="6"
        :total="listTotalNumber"
        layout="prev, pager, next">
      </el-pagination>
    </el-row>
	</div>
</template>
<script>
  import { collectAbatement, colletReceivableAmoun } from '@/api/api'
  import { collectionOptionMixin } from '@/common/mixin'
  import { splitArray, dateFormat } from '@/common/util.js'
	export default {
    mixins: [collectionOptionMixin],
		data(){
			return {
				addShow: false,
        currentList: null,
        currentData: [],
				nowPage: 1,
				listTotalNumber: 0,
				disabled: true,
				amountDisabled: true,
				ruleForm: {
					amount: '',
					datetime: '',
					overdueDay: '',
					receivableAmount: ''
				}
			}
		},
		watch: {
			collectionCaseInfo: function () {
	      this.getList()
	    }

		},
		computed: {
			timeRule() {
        return {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      }
		},
		methods: {
			changeCount(value) {
				if(!!value) {
					this.amountDisabled = false
					this.disabled = false
				}
				colletReceivableAmoun({
					mitigateDate: new Date(value).getTime(),
					caseId: this.collectionCaseInfo.id
				}).then((res)=>{
					console.log(res)
					this.ruleForm.receivableAmount = res.receivableAmount;
					this.ruleForm.overdueDay = res.overdueDay;
					console.log(this.ruleForm.receivableAmount)
				})
			},
			changeAmount(value) {
				this.ruleForm.resultAmount = this.ruleForm.receivableAmount - value;
				if( this.ruleForm.resultAmount < 0 ||  this.ruleForm.amount < 0) {
					this.ruleForm.amount = 0;
					this.ruleForm.resultAmount = this.ruleForm.receivableAmount;
					this.$message.error('减免后金额不能为负')
				}
			},
			changeResultAmount(value) {
				this.ruleForm.amount = this.ruleForm.receivableAmount - value;
				if( this.ruleForm.amount < 0 || this.ruleForm.resultAmount < 0 ) {
					this.ruleForm.amount = 0;
					this.ruleForm.resultAmount = this.ruleForm.receivableAmount;
					this.$message.error('减免金额不能为负')
				}
			},
			addabatement() {
				this.addShow = true;
				this.ruleForm.amount = '';
				this.ruleForm.receivableAmount = '';
				this.ruleForm.resultAmount = '';
				this.ruleForm.overdueDay = '';
				this.ruleForm.datetime = '';
				this.amountDisabled = true;
				this.disabled = true;
			},
			cancelAdd() {
				this.addShow = false;
			},
			submitForm() {
				if(!this.ruleForm.amount || this.ruleForm.amount < 0) {
					this.$message.error('请正确填写金额！');
					return;
				}
				if(!this.ruleForm.datetime) {
					this.$message.error('请选择减免日期');
					return;

				}
				this.$confirm('确认保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	collectAbatement(
						{
							amount: this.ruleForm.amount,
							caseId: this.collectionCaseInfo.id,
							expiration: this.ruleForm.datetime.getTime() 
						},
						'POST'
					).then((res)=>{
						this.addShow = false;
						this.ruleForm.amount= ""
						this.ruleForm.datetime= ""
						this.$message({
			        type: 'success',
			        message: '添加成功'
			      });
			      this.getList()
					})
        }).catch(() => {
          this.$message.info('已取消')
        })
				
			},
			getList() {
				collectAbatement(
					{
						caseId: this.collectionCaseInfo.id
					},
					'GET'
				).then((res)=>{
					console.log(res)
					this.listTotalNumber = res.data.total
          this.currentData = splitArray(res.data.data, 6);
          this.currentList = this.currentData[0]
				})
			},//分页
      handlePageChange(pageNum){
        this.currentList = this.currentData[pageNum-1]
      },
      statusTransform(num){
      	if(num === 0){
      		return '拒绝'
      	} else if(num === 1){
      		return '待审核'
      	} else if(num === 2){
      		return '通过'
      	}
      },
      dateTransform(obj, fmt){
        return dateFormat(obj, fmt);
      }
		},
		activated() {
			console.log(this)
			// this.getList()
		}
	}
</script>
<style lang="scss" scoped>
  .abate-ment {
    .el-row {
      margin-bottom: 10px;
    }
    .el-form-item{
    	margin-bottom: 0;
    }
		.el-date-editor.el-input{
			width: auto;
		}
  }
</style>
