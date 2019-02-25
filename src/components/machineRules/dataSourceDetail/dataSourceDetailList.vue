<template>
	<div class="dataSourceDetailList">
		<el-row>
			<el-row :gutter="10">
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="data_source_name" placeholder="请输入数据源名称"></el-input>
				</el-col>
				<el-col :span="10">
					<el-button @click="search()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
			<el-row :span="16" style="margin:20px;">
				<el-button icon="plus" type="success" @click="addData()">新增</el-button>
			</el-row>
		</el-row>

		<el-row>
			<el-row class="product-list">
				<el-table class="list-table"
						  :data="ruleDetailData"
						  highlight-current-row
						  border
						  style="width: 100%">
					<el-table-column prop="type" label="规则名称">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.rule_name }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="数据源">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.datasource_name }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="规则代码" min-width="600px">
						<template scope="scope">
							<span style="margin-left: 10px">{{ scope.row.rule_detail }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="操作">
						<template scope="scope">
							<el-button type="success" size="small" @click="expressExprot(scope.row)">修改</el-button>
							<!--<el-button type="success" size="small" @click="expressExprot(scope.row.id)">删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="inquirechangData" :current-page.sync="pageNum" layout="total, prev, pager, next" :total="inquireTotalNumber"></el-pagination>
			</el-row>
		</el-row>


		<el-dialog :title="titleType" :visible.sync="compileStatus" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="formData" label-width="140px">
				<el-row>
					<el-form-item prop="rule_name" label="请输入名称:">
						<el-input v-model="formData.rule_name" :disabled="!dialogType" style="width:220px;"></el-input>
					</el-form-item>
					<el-form-item prop="datasource_code" label="请选择数据源:">
						<el-select placeholder="请选择" :disabled="!dialogType" value-key="id" v-model="formData.datasource_code">
							<el-option v-for="item in dataList" :key="item.data_source_code" :label="item.data_source_name" :value="item.data_source_code"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="rule_detail" label="请输入详细代码:">
						<el-input :disabled="!dialogType" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formData.rule_detail" style="width:220px;"></el-input>
					</el-form-item>
					<el-form-item prop="sort" label="请输入排序:">
						<el-input v-model="formData.sort"  style="width:220px;"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelData()"><i class="el-icon-close" style="padding-right: 4px;"></i>取消
						</el-button>
						<el-button type="success" @click="saveData()"><i class="el-icon-check" style="padding-right: 4px;"></i>保存
						</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {  machineRules } from '@/common/formRules'
  export default {
	data(){
	  return {
	    data_source_name:'',
		data: '',
		compileStatus: false,
		dialogType:false,
		titleType: '',
		formRules: machineRules,
		inquireTotalNumber:0,
		pageNum:1,
		formData: {
		  rule_name: '',
		  rule_detail: '',
		  datasource_code:'',
		  sort:''
		},
		id:'',
		ruleDetailData: [],
		dataList:[],
	  }
	},
	methods: {
	  // 搜索
	  search(){
		this.getList()
	  },
	  // 重置
	  replacement(){
		this.data_source_name = ''
		this.getList()
	  },
	  // 修改
	  expressExprot(row){
	    console.log(row)
	    this.compileStatus = true
	    this.titleType = '修改规则'
		this.dialogType = false
		this.id = row.id
		this.formData.datasource_code = row.datasource_code
		this.formData.rule_name = row.rule_name
		this.formData.rule_detail = row.rule_detail
		this.formData.sort = row.sort

	  },
	  // 新增规则
	  addData(){
	    this.titleType = '新增规则'
		this.compileStatus = true
		this.dialogType = true
		this.formData.rule_name = ''
		this.formData.rule_detail = ''
		this.formData.datasource_code = ''
		this.formData.sort = ''
	  },
	  // 保存
	  saveData(){
		this.$refs.formData.validate((valid) => {
		  if(valid){
			if(this.dialogType){
				this.httpRequest.dataSourceRuleDetailAdd(this.formData).then((res)=>{
				  console.log('新增数据规则========',res)
				  if(res.code == '00000000'){
				    this.$message.success('新增成功')
					this.getList()
					this.compileStatus = false
				  }
				})

			}else{
				this.formData.id = this.id
			  	console.log(this.httpRequest.dataSourceRuleDetailUpdate)
				this.httpRequest.dataSourceRuleDetailUpdate(this.formData).then((res)=>{
				  console.log('修改数据规则--------',res)
				  if(res.code == '00000000'){
				    this.$message.success('修改成功')
					this.getList()
					this.compileStatus = false
				  }
				})
			}
		  }
		})
	  },
	  // 取消
	  cancelData(){
		this.compileStatus = false
		if(this.dialogType){
		  this.formData.rule_name = ''
		  this.formData.rule_detail = ''
		  this.formData.datasource_code = ''
		}
	  },

	  // 分页
	  inquirechangData(pageNum){
		this.getList(pageNum)
	  },
	  getDataSourceList(index=0){
			this.httpRequest.getQueryList({
				data_source_code:'',
				data_source_name:'',
				data_source_status:'',
				data_source_type:'',
				begin_ime:'',
				end_ime:'',
				page:index,
				row:100,
			}).then((res)=>{
				console.log('获取数据源列表',res)
				if(res.code == '00000000'){
					this.dataList = res.data.list
					//this.dataSourceList = res.data.list
					//this.listTotalNumber = res.data.list.length
				}
			})
			},
	  // 获取列表
	  getList(index = 1){
		this.httpRequest.dataSourceRuleDetailList({
		  row: 10,
		  page: index,
		  rule_name: this.data_source_name
		}).then((res) =>{
		  console.log('获取列表------', res)
		  if(res.code == '00000000'){
		    this.ruleDetailData = res.data.list
			this.inquireTotalNumber = res.data.total
		  }
		})
	  }
	},
	activated(){
		this.getDataSourceList()
	  	this.getList()
	}

  }
</script>

<style scoped>

</style>