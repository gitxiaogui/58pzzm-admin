<template>
	<!--产品数据源管理-->
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

		<el-row>
			<el-table :data="dataSouceProQueryList" highlight-current-row border ref="multipleTable" style="width: 100%"
					  @row-click="getreturnedMoney">
				<el-table-column type="expand">
					<template scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<ProductSourceChild :dataToChild.once="props.row.id" :dataList.once="dataList"
												:orgList.once="orgList" :productList.once="productList"
												:dataType.once="dataType"></ProductSourceChild>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="产品名称" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.prodName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="基本金额" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.basicAmount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="最大续期次数" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.maxRenewalCount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="是否已发布" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.isPublish === 1 ? '已发布' : '未发布' }}</span>
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
					<el-form-item prop="data_source_id" label="请选择数据源:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.data_source_id">
							<el-option v-for="item in dataList" :key="item.id" :label="item.data_source_name"
									   :value="item"></el-option>
						</el-select>
					</el-form-item>
					<!--<el-form-item prop="org_id" label="请选择机构:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.org_id">
							<el-option v-for="item in orgList" :key="item.id" :label="item.orgName"
									   :value="item"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item prop="pro_id" label="请选择产品:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.pro_id">
							<el-option v-for="item in productList" :key="item.id" :label="item.prodName"
									   :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="validity_type" label="请选择有效期类型:">
						<el-select placeholder="请选择" v-model="formData.validity_type">
							<el-option v-for="item in dataType" :key="item.id" :label="item.name"
									   :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="validity_num" label="请输入有效期值:">
						<el-input v-model="formData.validity_num" style="width:220px;"></el-input>
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
  import {dateFormat} from '@/common/util.js'
  import {machineRules} from '@/common/formRules.js'
  import {productinfoList} from '@/api/api.js'
  import ProductSourceChild from './productSourceChild.vue'

  export default {
	data(){
	  return {
		dataSouceProQueryList: [],
		listTotalNumber: 0,
		pageNum: 1,
		compileStatus: false,
		titleType: '',
		formRules: machineRules,
		org_name: '',
		pro_name: '',
		data_source_name: '',
		orgList: [],
		productList: [],
		//dataList:[{name:'运营商',id:'hulu'},{name:'饿了么',id:'eleme'},{name:'社保',id:'hulu_social'}],
		dataList: [],
		periodSpanOptions: {'0': '无', '1': '日', '2': '周', '3': '月', '4': '年'},
		dataType: [{name: '日', id: '1'}, {name: '周', id: '2'}, {name: '月', id: '3'}, {name: '年', id: '4'}],
		formData: {
		  data_source_id: '',
		  pro_id: '',
		  org_id: '',
		  validity_num: '',
		  validity_type: '',
		},

	  }
	},
	components: {
	  ProductSourceChild
	},
	methods: {
	  //新增数据源
	  addData(){
		this.compileStatus = true
		this.titleType = '新增产品数据源'
		this.showDialogType = true
		this.formData.validity_num = ''
		this.formData.validity_type = ''
		this.formData.data_source_id = ''
		// this.formData.org_id = ''
		this.formData.pro_id = ''
	  },
	  //取消
	  cancelData(formName){
		this.compileStatus = false
		if (this.showDialogType) {
		  this.$refs[formName].resetFields();
		}
	  },
	  //搜索
	  search(){
		this.getDataSouceProQueryList()
	  },
	  //重置
	  replacement(){
		this.data_source_name = ''
		this.org_name = ''
		this.pro_name = ''
		this.getDataSouceProQueryList()
	  },


	  //保存
	  saveData(){
		this.$refs.formData.validate((valid) =>{
		  if (valid) {

			this.httpRequest.addDataSoucePro({
			  data_source_id: this.formData.data_source_id.id,
			  data_source_name: this.formData.data_source_id.data_source_name,
			  data_source_code: this.formData.data_source_id.data_source_code,
			  // org_id: this.formData.org_id.id,
			  // org_name: this.formData.org_id.orgName,
			  pro_id: this.formData.pro_id.id,
			  pro_name: this.formData.pro_id.prodName,
			  validity_num: this.formData.validity_num,
			  validity_type: this.formData.validity_type
			}).then((res) =>{
			  console.log('新增产品数据源', res)
			  if (res.code == '00000000') {
				this.$message.success('新增产品数据源成功')
				this.compileStatus = false
				this.getDataSouceProQueryList()
			  }
			})

		  }
		})
	  },
	  getreturnedMoney(row, event, column){
		if (column.type === "expand") {
		  this.caseListLenderId = row.id;
		  console.log('打印当前id', this.caseListLenderId)
		  event.stopPropagation();
		  return false;
		}
	  },
	  // 初始化获取数据
	  getDataSouceProQueryList(index = 0){

		productinfoList({page: index, rows: 10}).then(((res) =>{
		  console.log('获取产品列表11111', res)
		  this.dataSouceProQueryList = res.products.list
		}))
	  },
	  changePaging(pageNum){
		this.getDataSourceRuleList(pageNum);
	  },
	  //获取机构列表
	  getOrgList(index = 0){
		this.httpRequest.getOrgList({
		  row: 10000,
		  page: index,
		  linkman: '',
		  orgName: '',
		  phone: '',
		}).then((res) =>{
		  console.log('机构列表', res)
		  if (res.code == '00000000') {
			this.orgList = res.data
		  }
		})
	  },
	  //获取数据源列表
	  getDataSourceList(index = 0){
		this.httpRequest.getQueryList({
		  data_source_code: '',
		  data_source_name: '',
		  data_source_status: '',
		  data_source_type: '',
		  begin_ime: '',
		  end_ime: '',
		  page: index,
		  row: 100,
		}).then((res) =>{
		  console.log('获取数据源列表', res)
		  if (res.code == '00000000') {
			this.dataList = res.data.list
			//this.dataSourceList = res.data.list
			//this.listTotalNumber = res.data.list.length
		  }
		})
	  },
	  // 获取产品列表
	  getProductList(){
		this.httpRequest.getProductList({
		  rows: 10000,
		  page: 0,
		  orgId: this.formData.org_id.id
		}).then((res) =>{
		  console.log('获取产品列表', res)
		  if (res.code == '00000000') {
			this.productList = res.products.list
		  }
		})
	  }
	},
	// 监听对象中的值
	computed: {
	  orgId(){
		return this.formData.org_id
	  }
	},
	watch: {
	  orgId: function (a){
		console.log(a)
		this.getProductList()
	  }
	},
	activated(){
	  this.getDataSouceProQueryList()
	  this.getOrgList()
	  this.getProductList()
	  this.getDataSourceList()
	}
  }
</script>

<style>

</style>