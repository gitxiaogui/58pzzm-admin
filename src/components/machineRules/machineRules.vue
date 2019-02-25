<template>
	<!--数据源规则主界面-->
	<div>
		<el-form>
			<el-row :gutter="10">
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="org_name" placeholder="请输入机构名称"></el-input>
				</el-col>
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="pro_name" placeholder="请输入产品名称"></el-input>
				</el-col>
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="data_source_name" placeholder="请输入数据源名称"></el-input>
				</el-col>
				<el-col :span="10">
					<el-button @click="search()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
		</el-form>
		<el-row :span="16" style="margin:20px;">
			<el-button icon="plus" type="success" @click="addData()">新增</el-button>
		</el-row>
		<el-row class="product-list">
			<el-table class="list-table" :data="dataSourceList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="机构名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.org_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="产品名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.pro_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="数据源名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.data_source_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="有效区域" header-align="center">
				<template scope="scope">
					<span style="margin-left: 10px">{{ scope.row.contain_area }}</span>
				</template>
			</el-table-column>

				<el-table-column prop="type" label="阈值字段" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.data_source_col_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="规则阈值" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.rule_num }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="规则类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ ruleType[scope.row.rule_type] }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作" header-align="center" width="200px">
					<template scope="scope">
						<el-button @click="compile(scope.row)" type="warning" size="mini">修改</el-button>
						<!--<el-button type="primary" size="mini">积分卡</el-button>-->
						<!--<el-button @click="deleteDataSource(scope.row.id)" type="danger" size="mini">删除</el-button>-->
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
		<el-dialog :title="titleType" :visible.sync="compileStatus" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="formData" label-width="140px">
				<el-row>
					<el-form-item prop="contain_area" label="请输入包含区域:">
						<el-input v-model="formData.contain_area" ></el-input>
					</el-form-item>
					<el-form-item prop="data_source_id" label="请选择数据源:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.data_source_id">
							<el-option v-for="item in dataList" :key="item.id" :label="item.data_source_name" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="data_source_col" label="请输入阈值字段:">
						<!--<el-input v-model="formData.data_source_col" ></el-input>-->
						<!--<el-input type="textarea" v-model="formData.data_source_col"></el-input>-->
						<el-select v-model="formData.data_source_col" placeholder="请选择">
							<el-option v-for="item in queryRulesList" :key="item.id" :label="item.rule_name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item prop="org_id" label="请选择机构:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.org_id">
							<el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="pro_id" label="请选择产品:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.pro_id">
							<el-option v-for="item in productList" :key="item.id" :label="item.prodName" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="rule_num" label="请输入规则阈值:">
						<el-input v-model="formData.rule_num" ></el-input>
					</el-form-item>
					<el-form-item prop="rule_type" label="请选择规则类型:">
						<el-select v-model="formData.rule_type" placeholder="请选择">
							<el-option v-for="item in ruleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelData('formData')"><i class="el-icon-close" style="padding-right: 4px;"></i>取消
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
	import {dateFormat} from '@/common/util.js'
	import {machineRules} from '@/common/formRules.js'
	export default {
		data(){
			return {
				titleType:'',
				formRules:machineRules,
				compileStatus:false,
				showDialogType:true,//弹框类型
				listTotalNumber:0,
				pageNum:1,
				org_name:'',
				pro_name:'',
				data_source_name:'',
				dataSourceList:[],
				//dataList:[{name:'运营商',id:'hulu'},{name:'饿了么',id:'eleme'},{name:'社保',id:'hulu_social'}],
				dataList:[],
				ruleList:[{name:'小于',id:'0'},{name:'大于',id:'1'}],
				ruleType:{'0':'小于','1':'大于'},
				id:'',
				formData:{
					contain_area:'',
					data_source_id:'',
					data_source_col:'',
					org_id:'',
					pro_id:'',
					rule_num:'',
					rule_type:'',
				},
				orgList:[],
				productList:[],
				queryRulesList:[],

			}
		},
		methods: {
			deleteDataSource(id){
				this.$confirm('确定要删除此数据源规则吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.httpRequest.deleteSourceRule({
						id:id
					}).then((res)=>{
						console.log('数据源规则删除',res)
						if(res.code == '00000000'){
							this.$message.success('数据源规则删除成功')
							this.getDataSourceRuleList()
						}
					})
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });
				});

			},
			//新增数据源
			addData(){
				this.compileStatus = true
				this.titleType = '新增数据源规则'
				this.showDialogType = true
				this.formData.contain_area = ''
				this.formData.data_source_col = ''
				this.formData.rule_num = ''
				this.formData.rule_type = ''
				this.formData.data_source_id = ''
				this.formData.org_id = ''
				this.formData.pro_id = ''
			},
			//修改
			compile(row){
				console.log(row)
				this.id= row.id
				this.compileStatus = true
				this.titleType = '修改数据源规则'
				this.showDialogType = false
				this.formData.contain_area = row.contain_area
				this.formData.data_source_col = row.data_source_col
				this.formData.rule_num = row.rule_num
				this.formData.rule_type = row.rule_type
				this.dataList.map((item,index)=>{
					if(item.id == row.data_source_id){
						this.formData.data_source_id = item
						return
					}
				})
				this.orgList.map((item,index)=>{
					if(item.id == row.org_id){
						this.formData.org_id = item
						return
					}
				})
				this.productList.map((item,index)=>{
					if(item.id == row.pro_id){
						this.formData.pro_id = item
						return
					}
				})
			},
			//保存
			saveData(){
				this.$refs.formData.validate((valid) =>{
					if(valid){
						if(this.showDialogType){
							this.httpRequest.addDataSourceRule({
								contain_area:this.formData.contain_area,
								data_source_col:this.formData.data_source_col,
								data_source_id:this.formData.data_source_id.id,
								data_source_name:this.formData.data_source_id.data_source_name,
								org_id:this.formData.org_id.id,
								org_name:this.formData.org_id.orgName,
								pro_id:this.formData.pro_id.id,
								pro_name:this.formData.pro_id.prodName,
								rule_num:this.formData.rule_num,
								rule_type:this.formData.rule_type
							}).then((res)=>{
								console.log('数据源规则添加',res)
								if(res.code == '00000000'){
									this.$message.success('数据源规则添加')
									this.compileStatus = false
									this.getDataSourceRuleList()
								}
							})
						}else{
							this.httpRequest.upDataSourceRule({
								contain_area:this.formData.contain_area,
								data_source_col:this.formData.data_source_col,
								data_source_id:this.formData.data_source_id.id,
								data_source_name:this.formData.data_source_id.data_source_name,
								org_id:this.formData.org_id.id,
								org_name:this.formData.org_id.orgName,
								pro_id:this.formData.pro_id.id,
								pro_name:this.formData.pro_id.prodName,
								rule_num:this.formData.rule_num,
								rule_type:this.formData.rule_type,
								id:this.id
							}).then((res)=>{
								console.log('数据源规则修改',res)
								if(res.code == '00000000'){
									this.$message.success('数据源规则修改成功')
									this.compileStatus = false
									this.getDataSourceRuleList()
								}
							})
						}
					}
				})
			},
			//取消
			cancelData(formName){
				this.compileStatus = false
				if(this.showDialogType){
					this.$refs[formName].resetFields();
				}
			},
			//搜索
			search(){
				this.getDataSourceRuleList()
				this.pageNum = 1
			},
			//重置
			replacement(){
				this.data_source_name = ''
				this.org_name = ''
				this.pro_name = ''
			 	 this.pageNum = 1
				this.getDataSourceRuleList()
			},
			changePaging(pageNum){
				this.getDataSourceRuleList(pageNum);
			},
			// 获取数据源规则列表
			getDataSourceRuleList(index=1){
				this.httpRequest.getDataSourceRuleList({
					pro_name:this.pro_name,
					begin_time:'',
					contain_area:'',
					data_source_type:'',
					data_source_col:'',
					data_source_id:'',
					data_source_name:this.data_source_name,
					org_id:'',
					org_name:this.org_name,
					pro_id:'',
					rule_num:'',
					rule_type:'',
					end_time:'',
					page:index,
					row:10,
				}).then((res)=>{
					console.log('获取数据源列表',res)
					if(res.code == '00000000'){
						this.dataSourceList = res.data.list
						this.listTotalNumber = res.data.total
					}
				})
			},
			//获取机构列表
			getOrgList(index=0){
				this.httpRequest.getOrgList({
					row:10000,
					page:index,
					linkman:'',
					orgName:'',
					phone:'',
				}).then((res)=>{
					console.log('机构列表',res)
					if(res.code == '00000000'){
						this.orgList = res.data
					}
				})
			},
		  //获取数据规则列表
		  	getList(datasource_code=''){
				this.httpRequest.dataSourceRuleDetailList({
				  row: 100,
				  page: 1,
				  datasource_code:datasource_code

				}).then((res) =>{
				  console.log('获取数据规则列表------', res)
				  if(res.code == '00000000'){
					if(res.data){
					  this.queryRulesList = res.data.list
					  return
					}
					this.queryRulesList = []
					//this.inquireTotalNumber = res.data.total
				  }
				})
			  },
			//获取数据源列表
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

			// 获取产品列表
			getProductList(){
				this.httpRequest.getProductList({
					rows:10000,
					page:0,
					orgId:this.formData.org_id.id
				}).then((res)=>{
					console.log('获取产品列表',res)
					if(res.code== '00000000'){
						this.productList = res.products.list
					}
				})
			}
		},
		// 监听对象中的值
		computed:{
			data_source_id(){
				return this.formData.data_source_id
			}
		},
		watch:{
			data_source_id:function(a){
				console.log(a.data_source_code)
			  	this.getList(a.data_source_code)
			}
		},
		activated(){
			this.getDataSourceRuleList()
			this.getProductList()
			this.getOrgList()
			this.getDataSourceList()
		    //this.getQueryRules()
		  	this.getList()
		}
	}
</script>

<style scoped>

</style>