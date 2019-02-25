<template>
	<div class="deductMoney">
		<el-row>
			<el-row :gutter="8" style="display: flex;">
				<div class="block">
					<el-date-picker
							v-model="stateTime"
							type="datetimerange"
							:picker-options="pickerOptions2"
							placeholder="选择时间范围"
							align="left">
					</el-date-picker>
				</div>
				<!--<el-col :span="4">
					<el-input v-model="userName" placeholder="请输入借款人名称"></el-input>
				</el-col>-->
			</el-row>
			<el-row>
				<el-button type="success" @click="search()">搜索</el-button>
				<el-button type="warning" @click="reset()">重置</el-button>
				<el-button @click="addRule()">添加</el-button>
			</el-row>
		</el-row>
		<el-row class="product-list">
			<el-table class="list-table" :data="dataList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="扣款月份" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ zhuanhua(scope.row.month) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="扣款日期" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ zhuanhua(scope.row.day) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="扣款时间" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ zhuanhua(scope.row.hour) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="扣款金额" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ zhuanhua(scope.row.amount) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="创建时间" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.createTime ? dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') : '-' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作" header-align="center" width="260px">
					<template scope="scope">
						<el-button @click="compile(scope.row)" type="warning" size="mini">修改</el-button>
						<el-button @click="detele(scope.row.id)" type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePage" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
		<!--修改---------增加-->
		<el-dialog :title="titleType" :visible.sync="compileStatus" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="formData" label-width="140px">
				<el-row>
					<el-form-item prop="validity_num" label="请输入扣款月份:">
						<el-input v-model="formData.month" placeholder="规范(月)：1,2,3,4,5...12"
								  style="width:220px;"></el-input>
					</el-form-item>
					<el-form-item prop="validity_num" label="请输入扣款日期:">
						<el-input v-model="formData.day" placeholder="规范(日)：1,3,4,5,6,7...31"
								  style="width:220px;"></el-input>
					</el-form-item>
					<el-form-item prop="validity_num" label="请输入扣款时间:">
						<el-input v-model="formData.hour" placeholder="规范(小时)：0,1,2,3,4...23"
								  style="width:220px;"></el-input>
					</el-form-item>
					<el-form-item prop="validity_num" label="请输入扣款金额:">
						<el-input v-model="formData.amount" style="width:220px;"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelData('formData')"><i class="el-icon-close"
																					 style="padding-right: 4px;"></i>取消
						</el-button>
						<el-button type="success" @click="saveData()"><i class="el-icon-check"
																		 style="padding-right: 4px;"></i>保存
						</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
  import {dateFormat} from "../../../common/util";
  import {deductMoneyRule} from '../../../common/formRules'

  export default {
	data(){
	  return {
		pickerOptions2: {
		  shortcuts: [{
			text: '最近一周',
			onClick(picker){
			  const end = new Date();
			  const start = new Date();
			  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			  picker.$emit('pick', [start, end]);
			}
		  }, {
			text: '最近一个月',
			onClick(picker){
			  const end = new Date();
			  const start = new Date();
			  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			  picker.$emit('pick', [start, end]);
			}
		  }, {
			text: '最近三个月',
			onClick(picker){
			  const end = new Date();
			  const start = new Date();
			  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			  picker.$emit('pick', [start, end]);
			}
		  }]
		},
		stateTime: '',
		dataList: [],
		listTotalNumber: 0,
		pageNum: 1,
		titleType: '',
		compileStatus: false,
		formData: {
		  month: '',
		  day: '',
		  hour: '',
		  amount: '',
		},
		formRules: deductMoneyRule,
		dialogType: false,
		id: ''

	  }
	},
	methods: {
	  zhuanhua(data){
		return data ? data : '-'
	  },
	  dateFormat,
	  //搜索
	  search(){

	  },

	  //重置
	  reset(){

	  },

	  //新增
	  addRule(){
		this.compileStatus = true
		this.dialogType = false
		this.titleType = '新增扣款规则'
		this.formData.month = ''
		this.formData.day = ''
		this.formData.hour = ''
		this.formData.amount = ''
		this.formData.id = ''
		this.id = ''
	  },
	  //修改
	  compile(row){
		this.compileStatus = true
		this.dialogType = true
		this.titleType = '修改扣款规则'
		this.formData.month = row.month
		this.formData.day = row.day
		this.formData.hour = row.hour
		this.formData.amount = row.amount
		this.id = row.id
	  },
	  //保存
	  saveData(){
		this.$refs.formData.validate((valid) =>{
		  if (valid) {
			if (!this.dialogType) {
			  this.formData.id = ''
			  this.httpRequest.withholdRuleAdd(this.formData).then((res) =>{
				console.log('添加扣款规则', res)
				if (res.code == '00000000') {
				  this.compileStatus = false
				  this.getList()
				  this.$message.success('添加扣款规则成功')
				}
			  })
			} else {
			  this.formData.id = this.id
			  this.httpRequest.withholdRuleModify(this.formData).then((res) =>{
				console.log('修改扣款规则', res)
				if (res.code == '00000000') {
				  this.compileStatus = false
				  this.getList()
				  this.$message.success('修改扣款规则成功')
				}
			  })
			}
		  }
		})

	  },
	  //取消
	  cancelData(){
		if (!this.dialogType) {
		  this.formData.month = ''
		  this.formData.day = ''
		  this.formData.hour = ''
		  this.formData.amount = ''
		}
	  },
	  //删除
	  detele(id){
		this.$confirm('是否删除?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.withholdRuleDel({
			id: id
		  }).then((res) =>{
			console.log('删除成功', res)
			if (res.code == '00000000') {
			  this.getList()
			  this.$message.success('删除成功')
			}
		  })
		}).catch((err) =>{
			this.$message.success('已取消删除')
		})
	  },
	  getList(index = 1){
		this.httpRequest.withholdRuleList({
		  page: index,
		  rows: 10,
		}).then((res) =>{
		  console.log('获取扣款规则列表', res)
		  if (res.code == '00000000') {
			this.dataList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  },
	  //分页
	  changePage(pageNum){
		this.getList(pageNum)
	  },
	},
	activated(){
	  this.getList()
	}
  }
</script>

<style scoped>

</style>