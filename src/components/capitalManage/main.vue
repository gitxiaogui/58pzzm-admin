<template>
	<div class="loanManage">
		<el-row :gutter="6" class="block">
			<el-date-picker
					v-model="times"
					type="datetimerange"
					:picker-options="pickerOptions2"
					placeholder="选择时间范围"
					align="left">
			</el-date-picker>
			<el-col :span="4">
				<el-input v-model="invesName" placeholder="请输入资方名称" type="tel"></el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="linkMan" placeholder="请输入资方联系人" type="tel"></el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="linkPhone" placeholder="请输入资方手机号" type="tel"></el-input>
			</el-col>
			<el-col style="margin:20px 0;">
				<el-button type="success" @click="search()">搜索</el-button>
				<el-button type="warning" @click="reset()">重置</el-button>
				<el-button type="success" icon="plus" @click="addCapital()">新增资方</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-row>
				<el-table :data="capitalList" highlight-current-row border ref="multipleTable" style="width: 100%"
						  @row-click="getreturnedMoney">
					<el-table-column type="expand">
						<template scope="props">
							<el-form label-position="left" class="demo-table-expand">
								<CapitalManageChild :capitalId.once="props.row.id" :times.once="times"></CapitalManageChild>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column label="资方名称" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column label="资方标识" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.code }}</span>
						</template>
					</el-table-column>
					<!--<el-table-column label="资方金额" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.amount }}</span>
						</template>
					</el-table-column>-->
					<el-table-column label="联系人" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.linkMan }}</span>
						</template>
					</el-table-column>
					<el-table-column label="联系人手机号" header-align="center" label-class-name="table-header-bold"
									 width="130">
						<template scope="scope">
							<span>{{ scope.row.linkPhone }}</span>
						</template>
					</el-table-column>
					<el-table-column label="证件类型" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ certifyeList[scope.row.certifyType] }}</span>
						</template>
					</el-table-column>
					<el-table-column label="证件号" header-align="center" label-class-name="table-header-bold" width="180">
						<template scope="scope">
							<span>{{ scope.row.certifyNumber }}</span>
						</template>
					</el-table-column>
					<el-table-column label="地址" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ scope.row.address }}</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" header-align="center" label-class-name="table-header-bold">
						<template scope="scope">
							<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" header-align="center" label-class-name="table-header-bold" width="220">
						<template scope="scope">
							<el-button size="small" @click="modifyInvestor(scope.row)" type="warning">修改</el-button>
							<el-button size="small" @click="addChargeMoney(scope.row.id)" type="info">注资</el-button>
							<el-button size="small" @click="deleteInvestor(scope.row.id)" type="danger">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange" :current-page.sync="pageNum"
							   layout="total, prev, pager, next" :total="listTotalNumber">
				</el-pagination>
			</el-row>
		</el-row>

		<el-dialog :title="titleType" :visible.sync="showDialog" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px">
				<el-row>
					<el-form-item prop="name" label="资方名称:">
						<el-input v-model="formData.name" placeholder="请输入资方名称"></el-input>
					</el-form-item>
					<el-form-item prop="code" label="资方标识:">
						<el-input :disabled="!showDialogType" v-model="formData.code"
								  placeholder="请输入资方标识(字母数字)"></el-input>
					</el-form-item>
					<el-form-item prop="linkMan" label="联系人:">
						<el-input v-model="formData.linkMan" placeholder="请输入联系人"></el-input>
					</el-form-item>
					<el-form-item prop="linkPhone" label="手机号码:">
						<el-input v-model="formData.linkPhone" placeholder="请输入手机号码"></el-input>
					</el-form-item>
					<el-form-item prop="address" label="地址:">
						<el-input v-model="formData.address" placeholder="请输入地址"></el-input>
					</el-form-item>

					<el-form-item prop="certifyType" label="证件类型:">
						<el-select v-model="formData.certifyType" placeholder="请选择">
							<el-option v-for="item in certifyTypeList" :key="item.certifyType" :label="item.name"
									   :value="item.certifyType"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="certifyNumber" label="证件号码:">
						<el-input v-model="formData.certifyNumber" placeholder="请输入证件号码"></el-input>
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
  import {dateFormat} from "../../common/util";
  import {capitalRule} from '../../common/formRules'
  import CapitalManageChild from './capitalManageChild'

  export default {
	components: {
	  CapitalManageChild
	},
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
		times: '',
		invesName: '',
		linkMan: '',
		linkPhone: '',
		pageNum: 1,
		listTotalNumber: 0,
		capitalList: [],
		titleType: '',
		showDialog: false,
		formData: {
		  name: '',
		  code: '',
		  linkMan: '',
		  linkPhone: '',
		  address: '',
		  certifyType: '',
		  certifyNumber: ''
		},
		certifyTypeList: [
		  {name: '身份证', certifyType: 1},
		  {name: '护照', certifyType: 2},
		  {name: '军官证', certifyType: 3},
		  {name: '营业执照', certifyType: 4},
		  {name: '组织机构代码证', certifyType: 5},
		  {name: '社会统一信用代码', certifyType: 6}
		],
		certifyeList: {'1': '身份证', '2': '护照', '3': '军官证', '4': '营业执照', '5': '组织机构代码证', '6': '社会统一信用代码'},
		formRules: capitalRule,
		showDialogType: false,
		id: '',
	  }
	},
	methods: {
	  dateFormat,
	  search(){
		this.getList()
	  },
	  reset(){
		this.times = ''
		this.invesName = ''
		this.linkMan = ''
		this.linkPhone = ''
		this.getList()
	  },
	  //新增资方
	  addCapital(){
		this.showDialog = true
		this.formData.name = ''
		this.formData.code = ''
		this.formData.linkMan = ''
		this.formData.linkPhone = ''
		this.formData.address = ''
		this.formData.certifyType = ''
		this.formData.certifyNumber = ''
		this.titleType = '新增资方信息'
		this.showDialogType = true
	  },
	  //修改
	  modifyInvestor(row){
		this.showDialog = true
		this.titleType = '修改资方信息'
		this.showDialogType = false
		this.formData.name = row.name
		this.formData.code = row.code
		this.formData.linkMan = row.linkMan
		this.formData.linkPhone = row.linkPhone
		this.formData.address = row.address
		this.formData.certifyType = row.certifyType
		this.formData.certifyNumber = row.certifyNumber
		this.id = row.id
	  },
	  //保存
	  saveData(){
		this.$refs.ruleForm.validate((valid) =>{
		  if (valid) {
			if (this.showDialogType) {//新增
			  this.httpRequest.addInvestor(this.formData).then((res) =>{
				console.log('新增资方>>>>>>>', res)
				if (res.code == '00000000') {
				  this.getList()
				  this.$message.success('新增成功')
				  this.showDialog = false
				}
			  })

			} else {//修改
			  this.formData.id = this.id
			  this.httpRequest.modifyInvestor(this.formData).then((res) =>{
				console.log('修改资方====', res)
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
		  this.formData.code = ''
		  this.formData.linkMan = ''
		  this.formData.linkPhone = ''
		  this.formData.address = ''
		  this.formData.certifyType = ''
		  this.formData.certifyNumber = ''
		}
	  },
	  //注资
	  addChargeMoney(id){
		this.$prompt('请输入注资金额', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  inputPattern: /^(-|\+)?\d+(\.\d+)?$/,
		  inputErrorMessage: '注资金额格式不正确'
		}).then(({value}) =>{
		  this.httpRequest.addChargeMoney({
			amount: value,
			investorsId: id
		  }).then((res) =>{
			console.log('注资成功>>>>>>>>>>>', res)
			this.getList()
			this.$message.success('注资成功')
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '取消输入'
		  });
		});
	  },
	  getreturnedMoney(row, event, column){
		if (column.type === "expand") {
		  this.caseListLenderId = row.id;
		  console.log('打印当前id', this.caseListLenderId)
		  event.stopPropagation();
		  return false;
		}
	  },
	  //删除
	  deleteInvestor(id){
		this.$confirm('确定要删除此资方吗?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.deleteInvestor({
			investorId: id
		  }).then((res) =>{
			console.log('删除>>>>>>>>>>', res)
			if (res.code == '00000000') {
			  this.getList()
			  this.$message.success('删除成功')
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});
	  },
	  //初始化
	  getList(index = 1){
		this.httpRequest.getValidInvestors({
		  pageNum: index,
		  pageSize: 10,
		  beginTime: this.times[0] ? this.times[0].getTime() : '',
		  endTime: this.times[1] ? this.times[1].getTime() : '',
		  name: this.invesName,
		  linkMan: this.linkMan,
		  linkPhone: this.linkPhone,
		}).then((res) =>{
		  console.log('资方列表', res)
		  if (res.code == '00000000') {
			this.capitalList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  },
	  //分页
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  }
	},
	activated(){
	  this.getList()
	}
  }
</script>

<style lang="scss" scoped>
	.loanManage {
		.hint {
			line-height: 40px;
			font-size: 20px;
			font-weight: bold;
		}
	}

</style>