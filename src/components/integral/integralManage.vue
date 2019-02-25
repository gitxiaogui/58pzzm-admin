<template>
	<div class="integralContent">
		<!--<el-form>
			<el-row :gutter="10">
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="phone" placeholder="请输入手机号" type="tel"></el-input>
				</el-col>
			</el-row>
			<el-row :gutter="16">
				<el-col :span="16">
					<el-button @click="search()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
		</el-form>-->
		<el-row :span="16" style="margin:20px;">
			<el-button icon="plus" type="success" @click="addition()">新增</el-button>
		</el-row>
		<el-row class="product-list">
			<el-table class="list-table" :data="integralList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="规则名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.flopName }}</span>
					</template>
				</el-table-column>
				<!--<el-table-column prop="type" label="规则算法" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.flopNum }}</span>
					</template>
				</el-table-column>-->

				<!--<el-table-column prop="type" label="操作时间" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ Transformdate(new Date(Number(scope.row.optTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>-->
				<el-table-column prop="type" label="积分数值" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.flopNumber }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="type" label="状态" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.flopStatus == 1 ? '有效' : '无效' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="概率" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.flopRate }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="查看图片" header-align="center">
					<template scope="scope">
						<span @click="showImg(scope.row.flopPic)"
						  style="margin-left: 10px;color:#4db3ff;text-decoration: underline;">点击查看</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作" header-align="center" width="260px">
					<template scope="scope">
						<el-button @click="compile(scope.row)" type="warning" size="mini">修改</el-button>
						<!--<el-button type="primary" size="mini">积分卡</el-button>-->
						<!--<el-button v-if="scope.row.flopStatus==1" @click="blockUp(scope.row)" type="danger" size="mini">停用</el-button>-->
						<el-button  @click="startUsing(scope.row)" :type="scope.row.flopStatus==0 ? 'success' : 'danger'" size="mini">{{ scope.row.flopStatus==0 ? '启用' : '停用' }}</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
		<div class="showImgBox">
			<el-dialog title="图片详情" :visible.sync="centerDialogVisible" center><img :src="imgUrl" alt=""></el-dialog>
		</div>
		<el-dialog :title="titleType" :visible.sync="compileStatus" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="110px">
				<el-row>
					<el-form-item prop="flopName" label="规则名称:">
						<el-input v-model="formData.flopName" ></el-input>
					</el-form-item>
					<el-form-item prop="flopRate" label="概率:">
						<el-input v-model="formData.flopRate" ></el-input>
					</el-form-item>
					<el-form-item prop="flopStatus" label="选择状态:">
						<el-select v-model="formData.flopStatus" placeholder="请选择">
							<el-option v-for="item in flopStatusList" :key="item.id" :label="item.name"
									   :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="flopNumber" label="积分数值:">
						<el-input v-model="formData.flopNumber" ></el-input>
					</el-form-item>
					<div class="topFrom">
						<span class="fileTitle">请上传积分照片：</span>
						<input @change="selectPic($event)" class="fileInput" name="image" accept="image/*"
							   type="file"/>
					</div>
					<div class="topFromShowImg"><img :src="showImgUrl" alt=""></div>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelDition()"><i class="el-icon-close" style="padding-right: 4px;"></i>取消
						</el-button>
						<el-button type="success" @click="revampChannel()"><i class="el-icon-check" style="padding-right: 4px;"></i>保存
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
	import $ from 'jquery'

	export default {
		data(){
			return {
				phone: '',
				integralList: [],
				pageNum: 1,
				listTotalNumber: 0,
				imgUrl: '',
				showImgUrl: '',
				centerDialogVisible: false,
				compileStatus: false,
				addOrcompile:true,
				titleType:'',
				formRules: integralMeaaage,
				flopStatusList: [{name: '有效', id: '1'}, {name: '无效', id: '0'}],
				formData: {
					flopName: '',
					flopRate: '',
					flopStatus: '',
					flopNumber: '',
				},
				id:'',
			}
		},
		methods: {
			//搜索
			search(){

			},
			//停用
			blockUp(){
				let flopStatus = row.flopStatus == '0' ? '1' : '0'
				console.log(flopStatus)
				this.httpRequest.updateFlopConfig({
					id:row.id,
					flopStatus:flopStatus
				}).then((res)=>{
					console.log('启用成功',res)
					if(res.code == '00000000'){
						this.getIntegralList()
					}
				})
			},
			//启用
			startUsing(row){
				let flopStatus = row.flopStatus == '0' ? '1' : '0'
				console.log(flopStatus)
				this.httpRequest.updateFlopConfig({
					id:row.id,
					flopStatus:flopStatus
				}).then((res)=>{
					console.log('启用成功',res)
					if(res.code == '00000000'){
						this.getIntegralList()
					}
				})
			},
			// 新增
			addition(){
				this.compileStatus = true
				this.titleType = '新增积分类型'
				this.addOrcompile = true
				this.formData.flopName = ''
				this.formData.flopRate = ''
				this.formData.flopStatus = ''
				this.formData.flopNumber = ''
				this.showImgUrl = ''
			},

			// 重置
			replacement(){

			},
			// 保存修改
			revampChannel(){
				this.$refs.ruleForm.validate((valid) =>{
					if (valid) {
						if(this.addOrcompile){
							if(!this.showImgUrl){
								this.$message.error('请先上传图片')
								return
							}
							this.httpRequest.addFlopConfig({
								flopName: this.formData.flopName,
								flopRate: this.formData.flopRate,
								flopStatus: this.formData.flopStatus,
								flopNumber: this.formData.flopNumber,
								flopPic:this.showImgUrl
							}).then((res)=>{
								console.log('新增翻牌类型',res)
								if(res.code == '00000000'){
									this.compileStatus = false
									this.$message.success('新增信息成功')
									this.getIntegralList()
								}
							})
						}else{
							this.httpRequest.updateFlopConfig({
								flopName: this.formData.flopName,
								flopRate: this.formData.flopRate,
								flopStatus: this.formData.flopStatus,
								flopNumber: this.formData.flopNumber,
								id:this.id,
								flopPic:this.showImgUrl
							}).then((res)=>{
								console.log('修改翻牌类型',res)
								if(res.code == '00000000'){
									this.compileStatus = false
									this.$message.success('修改信息成功')
									this.getIntegralList()
								}
							})
						}
					}
				})
			},
			// 修改
			compile(row){
				this.addOrcompile = false
				console.log(row)
				this.id = row.id
				this.titleType = '修改积分类型'
				console.log(this.id)
				this.formData.flopName = row.flopName
				this.formData.flopRate = row.flopRate
				this.formData.flopStatus = row.flopStatus
				this.formData.flopNumber = row.flopNumber
				this.showImgUrl = row.flopPic
				this.compileStatus = true
			},
			// 取消修改
			cancelDition(){
				this.compileStatus = false;
			},
			//查看图片
			showImg(imgUrl){
				this.imgUrl = imgUrl
				if(!imgUrl){
					this.$message.error('暂未有图片')
					return
				}
				this.centerDialogVisible = true
			},
			//上传图片
			selectPic(event){
				//this.pictureFlag = false
				this.fileEvent = event
				let compressNumber = 1
				//压缩目标 貌似没作用
				const targetNum = 0.7
				let _this = this
				if (!event.target.files[0]) {
					return
				} else {
					const size = event.target.files[0].size
					compressNumber = 1024 * 1024 * targetNum / size
				}
				canvasResize(event.target.files[0], {
					crop: false,    // 是否裁剪
					quality: compressNumber,   // 压缩质量  0 - 1
					rotate: 0,      // 旋转角度
					callback(baseStr){
						console.log(11111111111,baseStr)
						_this.httpRequest.uploadPic({
							picBase:baseStr,
						}).then((res) =>{
							console.log(res)
							// alert(picRes.code)
							if (res.code === '00000000') {
								_this.$message.success('图片上传成功')
								_this.showImgUrl = res.data.pic_url
							}
						})
					}
				})
			},
			// 转化时间
			Transformdate(obj, fmt){
				return dateFormat(obj, fmt);
			},
			// 获取初始列表
			getIntegralList(index = 0){
				this.httpRequest.queryFlopConfigList({
					page: index,
					rows: 10,
				}).then((res) =>{
					console.log('查询翻牌列表', res)
					if (res.code == '00000000') {
						this.integralList = res.data
						this.listTotalNumber = res.data.length
					}
				})
			},
			// 分页
			changePaging(pageNum){
				this.getIntegralList(pageNum);
			},
		},
		activated(){
			this.getIntegralList()
			console.log(1111111, this.httpRequest)
		}
	}
</script>

<style lang="scss">
	.integralContent {
		.showImgBox {
			.el-dialog--small {
				width: 30%;
				text-align: center;
			}
		}
		.topFrom {
			padding: 10px;
			line-height: 40px;
			margin-left: 20px;
			.fileInput {
				border: 1px solid #ccc;
				padding: 5px;
			}
		}
		.topFromShowImg {
			margin-left:25%;

			height: 250px;
			width: 160px;
		}
	}

</style>