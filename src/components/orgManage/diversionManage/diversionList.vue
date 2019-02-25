<template>
	<div class="diversion">
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
				<el-col :span="4">
					<el-input v-model="diversionName" placeholder="请输入导流名称"></el-input>
				</el-col>
			</el-row>
			<el-col :span="12">
				<el-button @click="search()" type="info" icon="search">搜索</el-button>
				<el-button @click="reset()" type="warning">重置</el-button>
				<el-button icon="plus" type="success" @click="addDiversion()">新增导流</el-button>
			</el-col>
		</el-row>
		<el-row class="product-list">
			<el-table class="list-table" :data="diversionList" highlight-current-row border style="width: 100%"
					  sum-text>
				<el-table-column prop="type" label="导流名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.diversionName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="导流编码" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.diversionCode }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="导流地址" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.diversionUrl }}</span>
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
			<el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
		<el-dialog :title="titleType" :visible.sync="showDialog" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px">
				<el-row>
					<el-form-item prop="diversionName" label="导流名称:">
						<el-input v-model="formData.diversionName" placeholder="请输入导流名称"></el-input>
					</el-form-item>
					<el-form-item prop="diversionCode" label="导流编码:">
						<el-input v-model="formData.diversionCode" :disabled="!showDialogType" placeholder="请输入导流编码"></el-input>
					</el-form-item>

					<el-form-item prop="platId" label="请选择平台:" v-if="showDialogType">
						<el-select placeholder="请选择"  v-model="formData.platId">
							<el-option v-for="item in platformList" :key="item.id" :label="item.platName" :value="item.id"></el-option>
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
		diversionName: '',
		diversionList: [],
		platformList:[],
		listTotalNumber: 0,
		pageNum: 1,
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
		titleType: '',
		showDialog: false,
		formData: {
		  diversionName: '',
		  diversionCode: '',
		  platId: ''
		},
		showDialogType: true,
		formRules: diversionRules
	  }
	},
	methods: {
	  //新增
	  addDiversion(){
		this.showDialog = true
		this.titleType = '新增导流平台'
		this.showDialogType = true
		this.formData.diversionName = ''
		this.formData.diversionCode = ''
		this.formData.platId = ''
	  },
	  //修改
	  compile(row){
		this.showDialog = true
		this.titleType = '修改导流平台'
		this.showDialogType = false
		this.formData.diversionName = row.diversionName
		this.formData.diversionCode = row.diversionCode
		this.formData.platId = row.platId
		this.formData.id = row.id
	  },
	  //保存
	  saveData(){
		this.$refs.ruleForm.validate((valid) =>{
		  if (valid) {
			if (this.showDialogType) {//新增
			  this.httpRequest.addDiversion(this.formData).then((res) =>{
				console.log('新增导流平台====', res)
				if (res.code == '00000000') {
				  this.getList()
				  this.$message.success('新增成功')
				  this.showDialog = false
				}
			  })

			} else {//修改
			  this.httpRequest.updataDiversion(this.formData).then((res) =>{
				console.log('修改导流平台====', res)
				if (res.code == '00000000') {
				  this.getList()
				  this.$message.success('修改成功')
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
		  this.formData.platId = ''
		}
	  },

	  //删除
	  detele(id){
		this.$confirm('确定要删除此导流吗?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.deleteDiversion({
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
	  //搜索
	  search(){
		this.getList()
	  },
	  //重置
	  reset(){
		this.stateTime = ''
		this.diversionName = ''
		this.getList()
	  },
	  //分页
	  changePaging(pageNum){
		this.getList(pageNum);
	  },
	  getList(page = 1){
		this.httpRequest.getDiversionList({
		  page: page,
		  row: 10,
		  beginTime: this.stateTime[0] ? this.stateTime[0].getTime() : '',
		  endTime: this.stateTime[1] ? this.stateTime[1].getTime() : '',
		  orgId: '',
		  diversionName: this.diversionName
		}).then((res) =>{
		  console.log('获取导流平台列表========', res)
		  if (res.code === '00000000') {
			this.diversionList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  },
	  getPlatformList(page = 1){
		this.httpRequest.getPlatformList({
		  page: page,
		  row: 100,
		  beginTime: this.stateTime[0] ? this.stateTime[0].getTime() : '',
		  endTime: this.stateTime[1] ? this.stateTime[1].getTime() : '',
		  platName: this.platName,
		}).then((res) =>{
		  console.log('获取平台列表========', res)
		  if (res.code === '00000000') {
			this.platformList = res.data.list
			//this.listTotalNumber = res.data.total
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