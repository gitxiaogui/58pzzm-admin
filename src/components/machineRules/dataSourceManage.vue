<template>
	<!--机审数据源配置管理-->
	<div>
		<el-form>
			<el-row :gutter="10">
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
			<el-table class="list-table" :data="dataSourceList" highlight-current-row border style="width: 100%"
					  sum-text>
				<el-table-column prop="type" label="数据源名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.data_source_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="数据源编码" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.data_source_code }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="数据源状态" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dataStatusListO[scope.row.data_source_status] }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="数据源类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ dataTypeListO[scope.row.data_source_type] }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作" header-align="center" width="260px">
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

					<el-form-item v-if="showDialogType" prop="data_source_data" label="请选择数据源:">
						<el-select placeholder="请选择" value-key="id" v-model="formData.data_source_data">
							<el-option v-for="item in dataCodeList" :key="item.id" :label="item.applyBname"
									   :value="item"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item prop="data_source_status" label="请选择数据源状态:" label-width="140px">
						<el-select v-model="formData.data_source_status" placeholder="请选择">
							<el-option v-for="item in dataStatusList" :key="item.id" :label="item.name"
									   :value="item.id"></el-option>
						</el-select>
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
  import {integralMeaaage} from '@/common/formRules.js'

  export default {
	data(){
	  return {
		phone: '',
		titleType: '',
		formRules: integralMeaaage,
		compileStatus: false,
		showDialogType: true,//弹框类型
		data_source_name: '',
		listTotalNumber: 0,
		pageNum: 1,
		dataSourceList: [],
		id: '',
		data_source_show: false,
		formData: {
		  data_source_status: '',
		  data_source_type: '',
		  data_source_data: '',
		},
		dataStatusList: [{name: '有效', id: '1'}, {name: '无效', id: '0'}],
		dataStatusListO: {'0': '无效', '1': '有效'},
		dataTypeListO: {'0': '非强授权', '1': '强授权'},
		dataTypeList: [{name: '非强授权', id: '0'}, {name: '强授权', id: '1'}],
		dataCodeList: [
		  {
			"applyBname": "实名认证",
			"id": "SFJY",
			"type": 1
		  },
		  {
			"applyBname": "运营商",
			"id": "hulu",
			"type": 1
		  },
		  {
			"applyBname": "饿了么",
			"id": "eleme",
			"type": 1
		  },
		  {
			"applyBname": "黑名单1",
			"id": "sauRon",
			"type": 0
		  },
		  {
			"applyBname": "黑名单2",
			"id": "zhongzhicheng",
			"type": 0
		  },
		  {
			"applyBname": "黑名单3",
			"id": "tongdun_antifraud_info",
			"type": 0
		  },
		  {
			"applyBname": "法院信息",
			"id": "fahai",
			"type": 0
		  },
			{
			"applyBname": "神月报告",
			"id": "sy_black_Report",
			"type": 0
		  },
		 /* {
			"applyBname": "刑事案底",
			"id": "youfen_crime_info",
			"type": 0
		  },
		  {
			"applyBname": "银联数据",
			"id": "youfen_bank_union",
			"type": 0
		  },
		  {
			"applyBname": "全量核查",
			"id": "youfen_full_check",
			"type": 0
		  },*/
		]
	  }
	},
	methods: {
	  //删除此机构
	  deleteDataSource(id){
		this.$confirm('确定要删除此机构吗?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.deleteDateSource({
			id: id
		  }).then((res) =>{
			console.log('删除数据源', res)
			if (res.code == '00000000') {
			  this.$message.success('删除成功')
			  this.getDataSourceList()
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});

	  },
	  //新增数据源
	  addData(){

		this.compileStatus = true
		this.titleType = '新增数据源'
		this.showDialogType = true
		this.formData.data_source_status = ''
		this.formData.data_source_data = ''

	  },
	  //修改数据源信息
	  compile(row){
		console.log(row)
		this.id = row.id
		this.compileStatus = true
		this.titleType = '修改数据源'
		this.showDialogType = false
		this.formData.data_source_name = row.data_source_name
		this.formData.data_source_code = row.data_source_code
		this.formData.data_source_status = row.data_source_status
		this.formData.data_source_type = row.data_source_type
	  },
	  //保存
	  saveData(){
		console.log(this.formData.data_source_data)

		this.$refs.formData.validate((valid) =>{
		  if (valid) {
			if (this.showDialogType) {
			  this.httpRequest.addDataSource({
				data_source_name: this.formData.data_source_data.applyBname,
				data_source_code: this.formData.data_source_data.id,
				data_source_type: this.formData.data_source_data.type,
				data_source_status: this.formData.data_source_status,
			  }).then((res) =>{
				console.log('数据源添加', res)
				if (res.code == '00000000') {
				  this.$message.success('数据源添加成功')
				  this.compileStatus = false
				  this.getDataSourceList()
				}
			  })
			} else {
			  this.formData.id = this.id
			  this.httpRequest.upDateSource(this.formData).then((res) =>{
				console.log('数据源修改', res)
				if (res.code == '00000000') {
				  this.$message.success('数据源修改成功')
				  this.compileStatus = false
				  this.getDataSourceList()
				}
			  })
			}
		  }
		})
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
		this.getDataSourceList()
	  },
	  //重置
	  replacement(){
		this.data_source_name = ''
		this.getDataSourceList()
	  },
	  changePaging(pageNum){
		this.getDataSourceList(pageNum);
	  },
	  //获取数据源列表
	  getDataSourceList(index = 1){
		this.httpRequest.getQueryList({
		  data_source_code: '',
		  data_source_name: this.data_source_name,
		  data_source_status: '',
		  data_source_type: '',
		  begin_ime: '',
		  end_ime: '',
		  page: index,
		  row: 10,
		}).then((res) =>{
		  console.log('获取数据源列表', res)
		  if (res.code == '00000000') {
			this.dataSourceList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  },
	},
	activated(){
	  this.getDataSourceList()
	}
  }
</script>

<style scoped>

</style>