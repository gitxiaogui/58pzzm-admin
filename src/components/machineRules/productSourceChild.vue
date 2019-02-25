<template>
	<div>
		<el-row class="product-list">
			<el-table class="list-table" :data="getProductChildList" highlight-current-row border style="width: 100%"
					  sum-text>
				<el-table-column prop="type" label="数据源名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.data_source_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="阈值类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.validity_num }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="有效期类型" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ periodSpanOptions[scope.row.validity_type] }}</span>
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
	import {machineRules} from '@/common/formRules.js'
  export default {
	props: ['dataToChild', 'dataList', 'orgList', 'productList', 'dataType'],
	data(){
	  return {
		getProductChildList: [],
		listTotalNumber: 0,
		periodSpanOptions: {'0': '无', '1': '日', '2': '周', '3': '月', '4': '年'},
		compileStatus: false,
		titleType: '',
		pageNum: 1,
		formRules: machineRules,
		formData: {
		  data_source_id: '',
		  pro_id: '',
		  validity_num: '',
		  validity_type: '',
		},
	  }
	},
	methods: {
	  //删除
	  deleteDataSource(id){
		this.$confirm('确定要删除此产品数据源吗?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.deleteSoucePro({
			id: id
		  }).then((res) =>{
			console.log('产品数据源删除', res)
			if (res.code == '00000000') {
			  this.$message.success('产品数据源删除成功')
			  this.getProductChild()
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});

	  },

	  //修改
	  compile(row){
		console.log(row)
		this.id = row.id
		this.compileStatus = true
		this.titleType = '修改产品数据源'
		this.showDialogType = false
		this.formData.validity_num = row.validity_num
		this.formData.validity_type = row.validity_type
		this.formData.pro_id = row.pro_id
		this.formData.data_source_id = row.data_source_id
		this.formData.org_id = row.org_id
	  },
	  //保存
	  saveData(){
	    this.$refs.formData.validate((valid) =>{
		  if (valid) {
			this.httpRequest.updateSoucePro({
			  validity_num: this.formData.validity_num,
			  validity_type: this.formData.validity_type,
			  id: this.id
			}).then((res) =>{
			  console.log('数据源规则修改', res)
			  if (res.code == '00000000') {
				this.$message.success('数据源规则修改成功')
				this.compileStatus = false
				this.getProductChild()
			  }
			})
		  }
		})
	  },
	  //取消
	  cancelData(formName){
		this.compileStatus = false

	  },
	  changePaging(pageNum){
		this.getProductChild(pageNum);
	  },
	  getProductChild(index = 0){
		this.httpRequest.dataSouceProQueryList({
		  begin_time: '',
		  data_source_id: '',
		  data_source_name: '',
		  end_time: '',
		  org_id: '',
		  org_name: '',
		  page: index,
		  pro_id: this.dataToChild,
		  pro_name: '',
		  row: 10,
		  validity_num: '',
		  validity_type: '',
		}).then((res) =>{
		  console.log('获取产品数据源配置列表', res)
		  this.getProductChildList = res.data
		  this.listTotalNumber = res.data.length
		})
	  }
	},
	mounted(){
	  console.log(11111111, this.dataToChild)
	  this.getProductChild()
	}
  }
</script>

<style scoped>

</style>