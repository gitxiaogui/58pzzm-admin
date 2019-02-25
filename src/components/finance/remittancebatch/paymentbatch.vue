<template>
	<el-row class="">
		<h3 style="margin-top: 0px;">批量回款</h3>
		<div class="uptemp">
			<el-upload class="upload-demo" ref="upload" multiple="false" action="uploadFiles"
					   :on-preview="handlePreview" :on-remove="handleRemove"
					   :on-change="handleChange" :before-upload="beforeUpload"
					   :file-list="fileList" :auto-upload="false" :multiple="false">
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
			</el-upload>
		</div>
		<el-row>
			<el-tabs type="card">
				<el-tab-pane label="已匹配">
					<el-table class="list-table" highlight-current-row
							  v-loading="loading2"
							  element-loading-text="拼命加载中"
							  :data="alreadymarryData" border @selection-change="handleSelectionChange"
							  style="width: 100%">
						<el-table-column type="expand">
							<template scope="props">
								<el-form label-position="left" inline class="demo-table-expand">
									<el-table class="list-table" highlight-current-row :data="props.row.data" border
											  style="width: 100%">
										<!--<el-table-column v-for="(item,index) in headerData.headerhead" v-if="index > 1 && index < 9" :prop="item" :key="index" :label="chinese[item]">
										</el-table-column>-->
										<el-table-column label="回款渠道">
											<template scope="scope">
												<span>{{ scope.row.channel }}</span>
											</template>
										</el-table-column>
										<el-table-column label="名称">
											<template scope="scope">
												<span>{{ scope.row.userName }}</span>
											</template>
										</el-table-column>
										<el-table-column label="手机号">
											<template scope="scope">
												<span>{{ scope.row.phoneNumber }}</span>
											</template>
										</el-table-column>
										<el-table-column label="回款金额">
											<template scope="scope">
												<span>{{ scope.row.amount }}</span>
											</template>
										</el-table-column>
										<el-table-column label="回款时间">
											<template scope="scope">
												<span>{{ Transformdate(new Date(parseInt(scope.row.returnTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
											</template>
										</el-table-column>
										<!--<el-table-column label="操作">
											<template scope="scope">
												<el-button size="small" type="info" @click="getsonReturnedmoneybatch([scope.row])">回款确认</el-button>
											</template>
										</el-table-column>-->
									</el-table>
								</el-form>
							</template>
						</el-table-column>
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="借款ID">
							<template scope="scope">
								{{ scope.row.id }}
							</template>
						</el-table-column>
						<el-table-column label="用户名">
							<template scope="scope">
								{{ scope.row.userName }}
							</template>
						</el-table-column>
						<el-table-column label="身份证">
							<template scope="scope">
								{{ scope.row.idCard }}
							</template>
						</el-table-column>
						<el-table-column label="手机号">
							<template scope="scope">
								{{ scope.row.phoneNumber }}
							</template>
						</el-table-column>
						<el-table-column label="借款金额">
							<template scope="scope">
								{{ scope.row.lenderAmount }}
							</template>
						</el-table-column>
						<el-table-column label="到期时间">
							<template scope="scope">
								{{ Transformdate(new Date(parseInt(scope.row.endTime)), 'yyyy-MM-dd hh:mm:ss') }}
							</template>
						</el-table-column>
						<!--<el-table-column label="">
							<template scope="scope">
								&lt;!&ndash;<el-switch v-model="value2" on-text="结清" off-text="续期" on-color="#13ce66" off-color="#ff4949" name="scope.$index">
								</el-switch>&ndash;&gt;

								<label for="">续期</label>
								<input type="radio"  :name="scope.$index" @click="getValye()" :ref="scope.row.id + '1'" value="1"/>
								<label for="">结清</label>
								<input type="radio" :name="scope.$index" :ref="scope.row.id + '1'" value="2" checked />
							</template>
						</el-table-column>-->
						<el-table-column label="操作">
							<template scope="scope">
								<el-col>
									<el-button size="small" type="info" @click="getReturnedmoneybatch(scope.row)">回款确认
									</el-button>
								</el-col>
							</template>
						</el-table-column>
					</el-table>
					<el-row type="flex" justify="center" style='text-align: center;margin-top: 10px;'>
						<el-pagination
								:current-page.sync="unmatchPage1"
								@current-change="unmatchChange1"
								:total="unmatchTotal1"
								layout="total, prev, pager, next">
						</el-pagination>
					</el-row>
					<el-button style='margin-top: 20px;' size="small" type="success"
							   @click="ALLgetReturnedmoneybatch()">批量确认回款
						<span style="font-size: 16px;color: greenyellow;padding: 2px;">{{getNum}}</span>个
					</el-button>
				</el-tab-pane>
				<el-tab-pane label="未匹配">
					<el-table class="list-table" highlight-current-row
							  v-loading="loading2"
							  element-loading-text="拼命加载中"
							  :data="notalreadymarryData" empty-text='暂无数据' border style="width: 100%">
						<el-table-column type="expand">
							<template scope="props">
								<el-form label-position="left" inline class="demo-table-expand">
									<el-form-item v-for="(items,index) in headerData.headerbody" :key='index'
												  :label="chinese[items]">
										<!--<span style="font-size: 14px;color: #190707;">{{   props.row[items]  }}</span>-->
										<span style="font-size: 14px;color: #190707;">{{  items=='returnTime' ? Transformdate(new Date(parseInt(props.row[items])), 'yyyy-MM-dd hh:mm:ss') : props.row[items] }}</span>
									</el-form-item>
								</el-form>
							</template>
						</el-table-column>
						<el-table-column
								label="结束时间"
								align="center"
								label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ Transformdate(new Date(parseInt(scope.row.returnTime)), 'yyyy-MM-dd hh:mm:ss')  }}</span>
							</template>
						</el-table-column>
						<el-table-column
								label="名称"
								align="center"
								label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.userName  }}</span>
							</template>
						</el-table-column>
						<el-table-column
								label="回款渠道"
								align="center"
								label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.channel  }}</span>
							</template>
						</el-table-column>
						<el-table-column
								label="手机号"
								align="center"
								label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.phoneNumber  }}</span>
							</template>
						</el-table-column>
						<el-table-column
								label="金额"
								align="center"
								label-class-name="table-header-bold">
							<template scope="scope">
								<span>{{ scope.row.amount  }}</span>
							</template>
						</el-table-column>
						<!--<el-table-column v-for="(item,index) in headerData.headerbody" v-if="index < 5" :key="index" :prop="item" :label="chinese[item]">

						</el-table-column>-->
						<el-table-column label="操作">
							<template scope="scope">
								<el-col>
									<el-button size="small" type="info" @click="getbatchdemandData(scope.row)">查询借款信息
									</el-button>
								</el-col>
							</template>
						</el-table-column>
					</el-table>
					<el-row type="flex" justify="center" style='text-align: center;margin-top: 10px;'>
						<el-pagination
								:current-page.sync="unmatchPage"
								@current-change="unmatchChange"
								:total="unmatchTotal"
								layout="total, prev, pager, next">
						</el-pagination>
					</el-row>
					<!--<el-button type="info" style='margin: 10px 0;'>未匹配&nbsp;{{notgetNum}}&nbsp;条数据</el-button>-->
				</el-tab-pane>
			</el-tabs>
			<el-dialog size="timy" :visible.sync="inquireborrowmoneyData" :close-on-click-modal="true"
					   :modal-append-to-body="false" title="借款信息详情">
				<p v-model="idData" class="message"><span>借款id：</span>{{this.idData}}</p>
				<p v-model="usernameData" class="message"><span>用户名：</span>{{this.usernameData}}</p>
				<p v-model="phonenumberData" class="message"><span>手机号：</span>{{this.phonenumberData}}</p>
				<p v-model="timeData" class="message"><span>放款时间：</span>{{ Transformdate(new
					Date(parseInt(this.timeData)), 'yyyy-MM-dd hh:mm:ss') }}</p>
				<p v-model="endtimeData" class="message"><span>到期时间：</span>{{ Transformdate(new
					Date(parseInt(this.endtimeData)), 'yyyy-MM-dd hh:mm:ss') }}</p>
				<p v-model="identitycardData" class="message"><span>身份证号：</span>{{this.identitycardData}}</p>
				<p v-model="moneyData" class="message"><span>借款金额：</span>{{this.moneyData}}</p>
			</el-dialog>
		</el-row>
	</el-row>
</template>
<script>
  import {uploadFiles, referpaymentconfirmData, batchreferpaymentconfirmData, batchdemandData} from '@/api/api'
  import {caseChannelType} from '@/common/formRules.js'
  import {dateFormat} from '@/common/util.js'
  import {splitArray} from '@/common/util'

  export default {
	data(){
	  return {
		chinese: {'returnTime': ' 结束时间', 'userName': '名称', 'channel': ' 回款渠道', 'phoneNumber': ' 手机号', 'amount': ' 金额'},
		fileList: [],
		alreadymarryData: [],
		notalreadymarryData: [],
		headerData: {
		  headerhead: [],
		  headerbody: [],
		},
		selection: 0,
		value2: true,
		chnagge: '',
		zijialreadymarryData: [],
		singularData: '',
		evennumbersData: '',
		inquireborrowmoneyData: false,
		idData: '',
		usernameData: '',
		phonenumberData: '',
		timeData: '',
		identitycardData: '',
		moneyData: '',
		endtimeData: '',
		unmatchPage: 1,
		unmatchTotal: 0,
		unmatchPage1: 1,
		unmatchTotal1: 0,
		changeunmatchData: [],
		changeunmatchData2: [],
		inputRadio: '',
		loading2: false,
		caseChannelType
	  }
	},
	methods: {
	  getValye(index){
		let c = document.getElementsByTagName("input");
		for (let i = 0; i < c.length; i++) {
		  if (c[i].type == "radio" && c[i].checked) {
			this.inputRadio = c[i].value
			console.log('你好啊', this.inputRadio);
		  }
		}
		//console.log('radio值',index)
	  },
	  unmatchChange(pageNum){
		this.notalreadymarryData = this.changeunmatchData[pageNum - 1];
	  },
	  unmatchChange1(pageNum){
		this.alreadymarryData = this.changeunmatchData2[pageNum - 1];
	  },
	  getbatchdemandData(data){
		console.log('===================================', data)
		this.$confirm('此操作将查询借款信息, 是否继续?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  batchdemandData({
			remarks: data.备注,
		  }).then((res) =>{
			console.log(res)
			if (res.lenderCaseBasicInfo) {
			  for (let item in res.lenderCaseBasicInfo) {
				this.idData = res.lenderCaseBasicInfo.id;
				this.usernameData = res.lenderCaseBasicInfo.userName;
				this.phonenumberData = res.lenderCaseBasicInfo.phoneNumber;
				this.timeData = res.lenderCaseBasicInfo.beginTime;
				this.endtimeData = res.lenderCaseBasicInfo.endTime;
				this.identitycardData = res.lenderCaseBasicInfo.idCard;
				this.moneyData = res.lenderCaseBasicInfo.lenderAmount;
			  }
			  this.inquireborrowmoneyData = true;
			} else {
			  this.$message('暂无借款信息！');
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消'
		  });
		});
	  },
	  handleSelectionChange(selection){
		this.selection = selection;
		console.log(999999, selection)
		/*const dataType = {
			returnTime: '发生时间',
			amount: '收入金额（+元）',
			channel: '交易渠道',
		}
		this.listMap = [];
		for(let i = 0; i < this.selection.length; i++) {
			let sendData = [];
			this.selection[i].data.forEach(item => {
				let obj = {};
				for(let name in item) {
					let dataName = name;
					let dataValue = item[name];
					for(let attr in dataType) {
						let transData;
						let typeAttr = dataType[attr];
						if(dataName === typeAttr) {
							if(attr === 'returnTime') {
								transData = dataValue.split("");
								transData = String(new Date(transData.join('')).getTime())
							}else if (attr === 'channel') {
								transData = String(this.caseChannelType.indexOf(dataValue))
							}else {
								transData = dataValue;
							}
						} else {
							continue;
						}
						obj[attr] = transData;
					}
				}
				sendData.push(obj)
			});
			this.listMap.push({
				'lenderCaseId': this.selection[i].id,
				'flag': '1',
				'userName': this.selection[i].userName,
				'phoneNumber': this.selection[i].phoneNumber,
				'operationType': this.inputRadio == 1 ? '1' : '0',
				'returnedData': sendData,
				'label': '2',
			});
		}*/
	  },
	  judgeCalculate(judge, chnagge){
		if (judge === 0) {
		  return this.chnagge = '连连支付';
		} else if (judge === 1) {
		  return this.chnagge = '支付宝';
		} else if (judge === 2) {
		  return this.chnagge = '宝付';
		} else if (judge === 3) {
		  return this.chnagge = '微信支付';
		} else if (judge === 4) {
		  return this.chnagge = '对公账户';
		} else if (judge === 5) {
		  return this.chnagge = '扫码';
		}
	  },
	  Transformdate(obj, fmt){
		return dateFormat(obj, fmt)
	  },
	  changeData(index){
		this.nowIndexdata = index;
	  },
	  submitUpload(){
		this.$refs.upload.submit();
	  },
	  handleRemove(file, fileList){
		console.log('是不是你=======================', file, fileList);
	  },
	  handlePreview(file){
		console.log(file);
	  },
	  handleChange(file, fileList){
		if (fileList.length > 1) {
		  this.$message.error('每次只可传入一个文件');
		  this.fileList = []
		}
	  },
	  beforeUpload: function (file){
		let fd = new FormData()
		this.loading2 = true;
		let _this = this
		fd.append('file', file)
		fd.append('label', '2')
		this.httpRequest.excelReturnDataMatch(
			fd
		).then((res) =>{
		  console.log('上传文件', res)
		  let resFailData = [];
		  for (let i = 0; i < res.data.match_ok.length; i++) {
			res.data.match_ok[i].data.forEach((val, index) =>{
			  _this.headerData.headerhead = []
			  for (let items in val) {
				_this.headerData.headerhead.push(items);
			  }
			})
		  }
		  this.alreadymarryData = res.data.match_ok;
		  this.unmatchTotal1 = this.alreadymarryData.length
		  this.changeunmatchData2 = splitArray(this.alreadymarryData, 10);
		  this.alreadymarryData = this.changeunmatchData2[0]
		  res.data.match_fail.forEach((val, index) =>{
			console.log(val)
			this.notalreadymarryData.unshift(val)
			_this.headerData.headerbody = []
			for (let item in val) {
			  _this.headerData.headerbody.unshift(item);
			}
		  })
		  this.unmatchTotal = this.notalreadymarryData.length
		  this.changeunmatchData = splitArray(this.notalreadymarryData, 10);
		  this.notalreadymarryData = this.changeunmatchData[0]

		  setTimeout(() =>{
			this.loading2 = false
		  }, 1000)
		}).catch((err) =>{
		  setTimeout(() =>{
			this.loading2 = false
		  }, 1000)
		})
		this.fileList.push(file)
		console.log(111111111, this.fileList, file)
		return false;
	  },
	  /*getsonReturnedmoneybatch(data) {
		  console.log(2,'打印发送的值子集的值===========================', data);
		  /!*const dataType = {
			  returnTime: '发生时间',
			  amount: '收入金额（+元）',
			  channel: '交易渠道',
			  remarks: '备注',
		  }*!/
		  this.$confirm('是否确认放款?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
		  }).then(() => {

			  //api发送数据
			  this.httpRequest.returnFinanceConfirm({
				  //data: sendData
				  data:data
			  }).then((res) => {
				  console.log('子集回款确认',res)
				  if(res.code === '0000') {
					  this.$message.success('操作成功')
					  this.beforeUpload(this.fileList[0])
					  this.fileList.shift();
				  } else {
					  if(res.message) {
						  this.$message.error(res.message);
					  } else {
						  this.$message.error('回款确认失败！');
					  }
				  }
			  })

		  }).catch(() => {
			  this.$message.info('已取消')
		  })
	  },*/
	  //更改的
	  getReturnedmoneybatch(data){
		this.notalreadymarryData = [];
		let newData = []
		newData.push(data)
		console.log(1, '获取的data值33333333333333333333', data, newData)
		this.$confirm('此操作将确认回款申请, 是否继续?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  //api发送数据
		  this.httpRequest.returnFinanceConfirm({
			//data: this.listMap
			data: newData

		  }).then((res) =>{
			console.log('父集回款确认', res)
			if (res.code === '00000000') {
			  this.$message.success('操作成功')
			  console.log('this.fileList[0]', this.fileList[0])
			  this.beforeUpload(this.fileList[0])
			  this.fileList.shift();
			} else {
			  if (res.message) {
				this.$message.error(res.message);
				this.beforeUpload(this.fileList[0])
				this.fileList.shift();
			  } else {
				this.$message.error('回款确认失败！');
			  }
			}
		  })
		}).catch(() =>{
		  this.$message.info('已取消')
		})
	  },
	  ALLgetReturnedmoneybatch(){
		console.log(this.selection)
		this.notalreadymarryData = [];
		if (this.selection.length > 0) {
		  this.$confirm('此操作将确认回款申请, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		  }).then(() =>{
			this.httpRequest.returnFinanceConfirm({
			  data: this.selection
			}).then((res) =>{
			  console.log(res)
			  if (res.code === '00000000') {
				this.$message.success('操作成功')
				this.beforeUpload(this.fileList[0])
				this.fileList.shift();
			  } else {
				if (res.message) {
				  this.$message.error(res.message);
				  this.beforeUpload(this.fileList[0])
				  this.fileList.shift();
				} else {
				  this.$message.error('批量回款确认失败！');
				}
			  }
			})
		  }).catch(() =>{
			this.$message({
			  type: 'info',
			  message: '已取消',
			});
		  });
		} else {
		  this.$message({
			message: '请选择后再进行操作！',
			type: 'warning'
		  });
		}
	  },
	},
	computed: {
	  getNum(){
		if (this.selection.length > 0) {
		  return this.selection.length;
		}
		return 0
	  },
//			notgetNum() {
//				if(this.notalreadymarryData.length > 0) {
//					return this.notalreadymarryData.length;
//				}
//				return 0
//			},
	},
	watch: {},
	activated(){
	  Object.assign(this.$data, this.$options.data.call(this));
	}
  }
</script>

<style lang="scss">
	.loan-chart {
		.el-row {
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.el-card {
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	.uptemp {
		margin: 20px 0px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 120px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.el-table__expanded-cell {
		background-color: #b2e2dd6e;
	}

	.message {
		margin: 15px 0px;
		font-size: 14px;
		font-family: "微软雅黑";
		color: #08090a;
	}

</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  