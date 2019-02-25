<template>
	<div>
		<el-form>
			<el-row :gutter="10">
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="orgName" placeholder="请输入机构名称" type="tel"></el-input>
				</el-col>
				<el-col :span="16">
					<el-button @click="search()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
		</el-form>
		<el-row :span="16" style="margin:20px;">
			<el-button icon="plus" type="success" @click="addOrg()">新增机构</el-button>
		</el-row>
		<el-row class="product-list">
			<el-table class="list-table" :data="orgList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="机构名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.orgName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="机构联系人" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.linkman }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="type" label="手机号" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="地址" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.address }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="证件号码" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.certifyNumber }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="证件类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ certifyTypeList[scope.row.certifyType] }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作" header-align="center" width="260px">
					<template scope="scope">
						<el-button @click="compile(scope.row)" type="warning" size="mini">修改</el-button>
						<el-button @click="deteleOrg(scope.row.id)" type="danger" size="mini">删除</el-button>
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
			<el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px">
				<el-row>
					<el-form-item prop="orgName" label="机构名称:">
						<el-input v-model="formData.orgName" ></el-input>
					</el-form-item>
					<el-form-item prop="linkman" label="机构联系人:">
						<el-input v-model="formData.linkman" ></el-input>
					</el-form-item>
					<el-form-item prop="phone" label="手机号:">
						<el-input v-model="formData.phone" :maxlength='11'></el-input>
					</el-form-item>
					<el-form-item prop="address" label="地址:">
						<el-input v-model="formData.address" ></el-input>
					</el-form-item>
					<el-form-item prop="publicNumberFlag" label="机构标识:">
						<el-input v-model="formData.publicNumberFlag" ></el-input>
					</el-form-item>
					<el-form-item prop="authorization" label="请输入授权码:">
						<el-input v-model="formData.authorization" ></el-input>
					</el-form-item>
					<el-form-item prop="certifyType" label="请选择证件类型:">
						<el-select v-model="formData.certifyType" placeholder="请选择">
							<el-option v-for="item in certifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="certifyNumber" label="证件号码:">
						<el-input v-model="formData.certifyNumber" ></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelData('ruleForm')"><i class="el-icon-close" style="padding-right: 4px;"></i>取消</el-button>
						<el-button type="success" :disabled="disabledType" @click="saveData()"><i class="el-icon-check" style="padding-right: 4px;"></i>保存</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import { orgManageRule } from '@/common/formRules.js'
	import {dateFormat} from '@/common/util.js'
	export default {
		data(){
			return {
				orgName:'',
				orgList:[],
				pageNum: 1,
				formRules:orgManageRule,
			  	disabledType:false,
				listTotalNumber: 0,
				compileStatus: false,
				showDialogType:true,
				titleType:'',
			  dataSourceList:[],
				certifyList:[{name:'身份证',id:'1'},{name:'护照',id:'2'},{name:'军官证',id:'3'},{name:'营业执照',id:'4'},{name:'组织机构代码',id:'5'},{name:'社会统一信用代码',id:'6'}],
				certifyTypeList:{'1':'身份证','2':'护照','3':'军官证','4':'营业执照','5':'组织机构代码','6':'社会统一信用代码'},
				formData:{
					orgName:'',
					linkman:'',
					phone:'',
					address:'',
					certifyType:'',
					certifyNumber:'',
				  	authorization:'',
				 	 publicNumberFlag:'',

				}
			}
		},
		methods: {
			//搜索
			search(){
				this.getOrgList()
			},
			//重置
			replacement(){
				this.formData.orgName = ''
				this.getOrgList()
			},
			// 删除机构信息
			deteleOrg(id){
				this.$confirm('确定要删除此机构吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.httpRequest.deteleOrg({
						id:id
					}).then((res)=>{
						console.log('删除成功',res)
						if(res.code == '00000000'){
							this.$message.success('删除成功')
							this.getOrgList()
						}
					})
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });
				});
			},
			//新增机构
			addOrg(){
				this.compileStatus = true
				this.titleType = '新增机构'
				this.showDialogType = true
				this.formData.orgName = ''
				this.formData.linkman = ''
				this.formData.phone = ''
				this.formData.address = ''
				this.formData.certifyType = ''
				this.formData.certifyNumber = ''
				this.formData.authorization = ''
				this.formData.publicNumberFlag = ''

			},
			// 修改
			compile(row){
				this.compileStatus = true
				this.showDialogType = false
				this.titleType = '修改机构信息'
				this.id = row.id
				this.formData.orgName = row.orgName
				this.formData.linkman = row.linkman
				this.formData.phone = row.phone
				this.formData.address = row.address
				this.formData.certifyType = row.certifyType
				this.formData.certifyNumber = row.certifyNumber
				this.formData.authorization = row.authorization
				this.formData.publicNumberFlag = row.publicNumberFlag

			},
			// 保存
			saveData(){
				this.$refs.ruleForm.validate((valid) =>{
					if(valid){
					  	this.disabledType = true
						this.formData.weixinAppId = '1'
						this.formData.weixinAppSecret = '1'
						this.formData.city = '1' //这些是一些必填项  此值无意义
						this.formData.province = '1'
						if(this.showDialogType){
							this.httpRequest.addOrg(this.formData).then((res)=>{
								console.log('新增机构',res)
								if(res.code == '00000000'){
									this.$message.success('机构新增成功')
									this.compileStatus = false
									this.getOrgList()
								}
								this.disabledType = false
							}).catch((err)=>{
							  this.disabledType = false
							})
						}else{
							this.formData.id = this.id
							this.httpRequest.orgUpdate(this.formData).then((res)=>{
								console.log('修改机构信息',res)
								if(res.code == '00000000'){
									this.$message.success('修改机构信息成功')
									this.compileStatus = false
									this.getOrgList()
								}
							})
						}
					}
				})
			},
			//取消
			cancelData(formName){
				this.compileStatus = false
				if(this.compileStatus){
					this.$refs[formName].resetFields();
				}
			},
			// 分页
			changePaging(pageNum){
				this.getIntegralList(pageNum);
			},
			//初始化
			getOrgList(index=0){
				this.httpRequest.getOrgList({
					row:10,
					page:index,
					linkman:'',
					orgName:this.orgName,
					phone:'',
				}).then((res)=>{
					console.log('机构列表',res)
					if(res.code == '00000000'){
						this.orgList = res.data
						this.listTotalNumber = res.data.length
					}
				})
			},
		},
		activated(){
			this.getOrgList()
		}
	}
</script>

<style scoped>

</style>