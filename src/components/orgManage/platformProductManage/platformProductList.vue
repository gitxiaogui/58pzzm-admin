<template>
	<div class="diversion">
		<el-row>
			<el-col :span="12" style="margin:10px;">
				<el-button icon="plus" type="success" @click="add()">新增关系</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20">

		<el-col :span="3">
		<el-row class="product-list">
			<el-table class="list-table" :data="platformList" highlight-current-row border @row-click="selectProduct" style="width: 100%"
					  sum-text>
				<el-table-column prop="type" label="平台名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.platName }}</span>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		</el-col>
			<el-col :span="21">
		<el-row class="product-list">
			<el-table class="list-table" :data="dataList" highlight-current-row border style="width: 100%"
					  sum-text>
				<el-table-column prop="type" label="产品名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.prodName }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="type" label="操作" header-align="center" width="260px">
					<template scope="scope">
						<!--<el-button @click="compile(scope.row)" type="warning" size="mini">修改</el-button>-->
						<el-button @click="detele(scope.row.id)" type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
			</el-col>
			</el-row>
		<el-dialog :title="titleType" :visible.sync="showDialog" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px">
				<el-row>
					<el-form-item prop="data_source_id" label="请选择平台:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.platName">
							<el-option v-for="item in platformList" :key="item.id" :label="item.platName"
									   :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="data_source_id" label="请选择产品:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.product">
							<el-option v-for="item in productList" :key="item.id" :label="item.prodName"
									   :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelData('ruleForm')"><i class="el-icon-close"
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
  import {diversionRules} from '@/common/formRules'
  import {dateFormat} from '@/common/util.js'

  export default {
	data(){
	  return {
		platId: '',
		dataList: [],
		platformList: [],
		productList: [],
		listTotalNumber: 0,
		pageNum: 1,
		titleType: '',
		showDialog: false,
		formData: {
		  platName: '',
		  product: '',
		},
		showDialogType: true,
		formRules: diversionRules,
		id:'',
	  }
	},
	methods: {
	  //新增
	  add(){
		this.showDialog = true
		this.titleType = '新增平台产品关系'
		this.showDialogType = true
		this.formData.platName = ''
		this.formData.product = ''
	  },
	  selectProduct(row, event, column){
		this.platId = row.id
		this.getList()
	  },

	  //保存
	  saveData(){
		this.$refs.ruleForm.validate((valid) =>{
		  if (valid) {
			if (this.showDialogType) {//新增
			  this.httpRequest.addPlatformProductRelation({
				platId: this.formData.platName.id,
				platName: this.formData.platName.platName,
				prodId: this.formData.product.id,
				prodName: this.formData.product.prodName
			  }).then((res) =>{
				console.log('新增平台产品关系====', res)
				if (res.code == '00000000') {
				  this.getList()
				  this.$message.success('新增成功')
				  this.showDialog = false
				}
			  })

			}
		  }
		})
	  },
	  //取消
	  cancelData(){
		this.showDialog = false
		if (this.showDialogType) {
		  this.formData.diversionName = ''
		  this.formData.diversionCode = ''
		  this.formData.diversionUrl = ''
		}
	  },

	  //删除
	  detele(id){
		this.$confirm('确定要删除此导流吗?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.deletePlatformProductRelation({
			id: id
		  }).then((res) =>{
			console.log('删除成功=====', res)
			if (res.code === '00000000') {
			  this.$message.success('删除成功')
			  this.getList()
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});

	  },

	  //分页
	  changePaging(pageNum){
		this.getList(pageNum);
	  },
	  getList(page = 1){
		this.httpRequest.platformProductRelationList({
		  page: page,
		  row: 10,
		  platId: this.platId ? this.platId : '1',
		  prodName: ''
		}).then((res) =>{
		  console.log('获取导流平台列表========', res)
		  if (res.code === '00000000') {
			this.dataList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  },
	  getPlatformList(){
		this.httpRequest.getPlatformList({
		  page: 1,
		  row: 100,
		  platCode: '',
		  platName: '',
		}).then((res) =>{
		  console.log('获取平台列表', res)
		  if (res.code === '00000000') {
			this.platformList = res.data.list
		  }
		})
		this.httpRequest.productinfoList({
		  page: 1,
		  prodName: "",

		  rows: 100,
		}).then((res) =>{
		  console.log('产品列表------', res)
		  if (res.code === '00000000') {
			this.productList = res.products.list
		  }
		})
	  }

	},
	activated(){
	  this.getList()
	  this.getPlatformList()
	}
  }
</script>

<style scoped>

</style>