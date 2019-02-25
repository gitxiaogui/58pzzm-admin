<template>
	<div class="shopListContent">
		<el-row>
			<el-form>
				<el-row :gutter="10" style="display: flex;">
					<el-col :span="4" style="margin-left:10px;">
						<el-input v-model="goodsName" placeholder="请输入商品名称" ></el-input>
					</el-col>
					<!--<el-col :span="4" style="margin-left:10px;">
						<el-select v-model="orgId" placeholder="请选择机构">
							<el-option v-for="item in orgNameList" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
						</el-select>
					</el-col>-->
					<el-col :span="4" style="margin-left:10px;">
						<el-select v-model="proId" placeholder="请选择产品">
							<el-option v-for="item in productList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="16">
						<el-button @click="search()" type="info" icon="search">搜索</el-button>
						<el-button @click="replacement()" type="warning">重置</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row :span="16" style="margin:20px;">
			<el-button icon="plus" type="success" @click="addProduct()">新增商品</el-button>
		</el-row>
		<el-row class="product-list">
			<el-table class="list-table" :data="shopList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="机构" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.orgName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="产品" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.prodName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="商品名称" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="推荐价格" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.goodsPrice }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="商品规格" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.goodsSpec }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="type" label="参加人数" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.partyNumber }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="查看图片" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px;color:#4db3ff;text-decoration: underline;" @click="showImg(scope.row.goodsUrl)">点击查看</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="创建时间" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.createTimeStr }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="修改时间" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.updateTimeStr }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作" header-align="center" width="130px;">
					<template scope="scope">
						<el-button @click="compile(scope.row)" type="warning" size="mini">修改</el-button>
						<el-button @click="deteleProduct(scope.row.id)" type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="center">
			  <el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum" layout="total, prev, pager, next" :total="listTotalNumber">
			  </el-pagination>
			</el-row>
		</el-row>
		<div class="showImgBox">
			<el-dialog title="图片详情" :visible.sync="centerDialogVisible" center><img :src="imgUrl" alt=""></el-dialog>
		</div>
		<el-dialog :title="titleType" :visible.sync="compileStatus" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="formData" label-width="110px">
				<el-row>
					<!--<el-form-item prop="orgId" label="请选择机构:">
						<el-select v-model="formData.orgId" placeholder="请选择">
							<el-option v-for="item in orgNameList" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item prop="proId" label="请选择产品:">
						<el-select v-model="formData.proId" placeholder="请选择">
							<el-option v-for="item in productList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="goodsName" label="商品名称:">
						<el-input v-model="formData.goodsName" ></el-input>
					</el-form-item>
					<el-form-item prop="goodsPrice" label="推荐价格:">
						<el-input v-model="formData.goodsPrice" ></el-input>
					</el-form-item>
					<el-form-item prop="goodsSpec" label="商品规格:">
						<el-input v-model="formData.goodsSpec" ></el-input>
					</el-form-item>
					<form id="videoForm">
					<div class="topFrom">
						<span class="fileTitle">请上传商品图片：</span>
						<input @change="selectPic($event)" class="fileInput" name="image" accept="image/*" type="file"/>
					</div>
					</form>
					<div class="topFromShowImg"><img :src="showImgUrl" alt=""></div>
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
	import {integralMeaaage} from '@/common/formRules.js'

	export default {
		data(){
			return {
				shopList:[],
				pageNum: 1,
        		listTotalNumber: 0,
				imgUrl:'',
				goodsName:'',
				proId:'',
				formRules:integralMeaaage,
				centerDialogVisible:false,
				compileStatus:false,
				showDialogType:true,
				orgNameList:[],
				productList:[],
				formData:{
					//orgId:'',
					proId:'',
					goodsName:'',
					goodsPrice:'',
					goodsSpec:'',
				},
				titleType:'',
				showImgUrl:'',

			}
		},
		methods: {
			// 搜索
			search(){
				this.getShopList()
			},
			// 重置
			replacement(){
				this.proId = ''

				this.goodsName = ''
				this.getShopList()
			},
			//查看图片
			showImg(imgUrl){
				console.log(imgUrl)
				this.imgUrl = imgUrl
				if(!imgUrl){
					this.$message.error('暂未有图片')
					return
				}
				this.centerDialogVisible = true
			},
			// 分页
			changePaging(pageNum){
				this.getShopList(pageNum);
			},
			// 新增商品
			addProduct(){
				this.compileStatus = true
				this.titleType = '新增商品'
				this.showDialogType = true
				this.formData.proId = ''
				//this.formData.orgId = ''
				this.formData.goodsName = ''
				this.formData.goodsPrice = ''
				this.formData.goodsSpec = ''
			},
			// 修改
			compile(row){
				this.id = row.id
			  	document.getElementById('videoForm')&&document.getElementById('videoForm').reset();
				console.log(row)
				this.formData.proId = row.proId
				this.formData.partyNumber = row.partyNumber
				this.formData.goodsName = row.goodsName
				this.formData.goodsPrice = row.goodsPrice
				this.formData.goodsSpec = row.goodsSpec
			  	this.showImgUrl = row.goodsUrl
				this.showDialogType = false
				this.compileStatus = true
				this.titleType = '修改商品信息'
			},
			// 删除商品
			deteleProduct(id){
				this.$confirm('确定要删除此商品吗?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.httpRequest.deleteShop({
						goodsId:id
					}).then((res)=>{
						console.log('删除成功',res)
						if(res.code == '00000000'){
							this.$message.success('删除成功')
							this.getShopList()
						}
					})
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });
				});

			},
			//取消
			cancelData(formName){
				this.compileStatus = false
				if(this.showDialogType){
					this.$refs[formName].resetFields();
				}
			},
			//保存
			saveData(){
				this.$refs.formData.validate((valid) =>{
					if(valid){
						this.formData.goodsUrl = this.showImgUrl
						//this.formData.partyNumber = '22'
						if(this.showDialogType){
							if(!this.showImgUrl){
								this.$message.error('请先上传商品图片')
								return
							}
							this.httpRequest.addShop(this.formData).then((res)=>{
								console.log('新增商品',res)
								if(res.code == '00000000'){
									this.$message.success('新增商品成功')
									this.compileStatus = false
									this.getShopList()
								}
							})
						}else{
							this.formData.goodsId = this.id
							this.httpRequest.modifyShop(this.formData).then((res)=>{
								console.log('修改商品',res)
								if(res.code == '00000000'){
									this.$message.success('修改商品成功')
									this.compileStatus = false
									this.getShopList()
								}
							})
						}
					}
				})

			},
			//上传图片
			selectPic(event){
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
							if (res.code === '00000000') {
								_this.$message.success('图片上传成功')
								_this.showImgUrl = res.data.pic_url
							}
						})
					}
				})
			},
			// 初始化
			getShopList(index=0){
				this.httpRequest.getShopList({
					page: index,
            		rows: 10,
					goodsName: this.goodsName,
					//orgId: this.orgId,
					proId: this.proId
				}).then((res)=>{
					console.log('获取商品列表',res)
					if(res.code == '00000000'){
						this.shopList = res.goodsInfoList.list
						this.listTotalNumber = res.goodsInfoList.total
					}

				})
			},

			// 获取产品列表
			getProductList(){
				this.httpRequest.getProductList({
					rows:10,
					page:0,
					//orgId:this.formData.orgId
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
			/*orgId(){
				return this.formData.orgId
			}*/
		},
		watch:{
			/*orgId:function(a){
				console.log(a)
				this.getProductList()
			}*/
		},
		activated(){
			this.getShopList()
		  	this.getProductList()
		}
	}
</script>

<style lang="scss" >
	.shopListContent{
		.showImgBox {
			.el-dialog--small {
				width: 30%;
				text-align: center;
				img{
					height:100%;
					width:100%;
				}
			}
		}

		.topFrom {
			padding:0 10px;
			line-height: 40px;
			margin-left: 20px;
			.fileInput {
				border: 1px solid #ccc;
				padding: 5px;
			}
		}
		.topFromShowImg {
			margin-left:15%;
			margin-top:20px;
			height: 200px;
			width: 300px;
			img{
				height:100%;
				width:100%;
			}
		}
	}

</style>