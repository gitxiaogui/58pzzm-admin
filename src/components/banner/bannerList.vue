<template>
	<div class="bannerList">
		<el-row :gutter="6" class="block">
			<el-col :span="4">
				<el-input v-model="bannerName" placeholder="banner名称" type="tel"></el-input>
			</el-col>
			<el-col style="margin:20px 0;">
				<el-button type="success" @click="search()">搜索</el-button>
				<el-button type="warning" @click="reset()">重置</el-button>
				<el-button type="success" icon="plus" @click="addBanner()">新增轮播</el-button>
			</el-col>
		</el-row>

		<el-table :data="bannerList" stripe style="width: 100%" border>
			<el-table-column prop="bannerName" label="名称" header-align="center"></el-table-column>
			<el-table-column width="500" prop="bannerUrl" label="跳转链接" header-align="center"></el-table-column>
			<el-table-column label="图片信息" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span class="fontColor" @click="showImg(scope.row.bannerImgUrl)">查看图片</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" header-align="center" label-class-name="table-header-bold" width="160">
				<template scope="scope">
					<el-button size="small" @click="modifyBanner(scope.row)" type="warning">修改</el-button>
					<el-button size="small" @click="deleteBanner(scope.row.id)" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row type="flex" justify="center">
			<el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum"
						   layout="total, prev, pager, next" :total="listTotalNumber">
			</el-pagination>
		</el-row>
		<!---------------------------------------------轮播图片信息-->
		<el-dialog title="轮播图片信息" :visible.sync="showDialogImg" style="text-align: center;">
			<img class="img" :src="bannerImgUrl" alt="">
		</el-dialog>
		<!---------------------------------------------修改增加轮播-->
		<el-dialog :title="titleType" :visible.sync="showBanner" style="text-align: left;" size="tiny">
			<el-form :model="formData" :rules="formRules" ref="formData" label-width="110px">
				<el-row>
					<el-form-item prop="goodsSpec" label="轮播名称:">
						<el-input v-model="formData.bannerName"></el-input>
					</el-form-item>
					<el-form-item prop="proId" label="请选择模块:">
						<el-select v-model="formData.bannerType" placeholder="请选择">
							<el-option v-for="item in bannerModule" :key="item.id" :label="item.name"
									   :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="goodsSpec" label="跳转地址:">
						<el-input v-model="formData.bannerUrl"></el-input>
					</el-form-item>
					<form id="videoForm">
						<div class="topFrom">
							<span class="fileTitle">请上传轮播图片：</span>
							<input @change="selectPic($event)" class="fileInput" name="image" accept="image/*"
								   type="file"/>
						</div>
					</form>
					<div class="topFromShowImg"><img :src="showImgUrl" alt=""></div>
				</el-row>
				<el-row>
					<el-col>
						<el-button type="warning" @click="cancelData()"><i class="el-icon-close"
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
  export default {
	props: {},
	components: {},
	data(){
	  return {
		bannerName: '',
		bannerList: [],
		showDialogImg: false,
		showBanner: false,
		pageNum: 1,
		listTotalNumber: 0,
		formData: {
		  bannerName: '',
		  bannerType: '',
		  bannerUrl: '',
		},
		formRules: {},
		showImgUrl: '',
		titleType: '',
		showDialogType: false,
		bannerImgUrl: '',
		bannerModule: [
		  {name: '首页', id: 'indexPage'},
		  {name: '引导页', id: 'bootPage'},
		  {name: '发现页', id: 'discoveryPage'}
		],
		bannerImgId: ''
	  }
	},
	methods: {
	  // 搜索
	  search(){
		this.getBannerList()
	  },
	  // 重置
	  reset(){
		this.bannerName = ''
		this.getBannerList()
	  },
	  // 新增banner
	  addBanner(){
		this.showBanner = true
		this.showDialogType = true
		this.titleType = '新增轮播'
	  },
	  //修改banner
	  modifyBanner(row){
		this.showBanner = true
		this.showDialogType = false
		this.titleType = '修改轮播'
		this.formData.bannerName = row.bannerName
		this.formData.bannerUrl = row.bannerUrl
		this.formData.bannerType = row.moduleIdentity
		this.showImgUrl = row.bannerImgUrl
		this.bannerImgId = row.id
	  },
	  //保存
	  saveData(){

		if (this.showDialogType) {// 新增
		  this.httpRequest.addBannerInfo({
			bannerImgUrl: this.showImgUrl,
			bannerName: this.formData.bannerName,
			bannerUrl: this.formData.bannerUrl,
			moduleIdentity: this.formData.bannerType,
		  }).then((res) =>{
			console.log('添加成功', res)
			if (res.code == '00000000') {
			  this.$message.success('添加成功')
			  this.showBanner = false
			  this.getBannerList()
			}
		  })
		} else { //修改
		  this.httpRequest.modifyBanner({
			bannerImgUrl: this.showImgUrl,
			bannerName: this.formData.bannerName,
			bannerUrl: this.formData.bannerUrl,
			moduleIdentity: this.formData.bannerType,
			id: this.bannerImgId
		  }).then((res) =>{
			console.log('修改成功', res)
			if (res.code == '00000000') {
			  this.$message.success('修改成功')
			  this.showBanner = false
			  this.getBannerList()
			}
		  })
		}


	  },
	  //取消
	  cancelData(){
		this.showBanner = false
	  },

	  //删除banner
	  deleteBanner(id){
		this.$confirm('确定要删除此轮播吗?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() =>{
		  this.httpRequest.delBanner({
			bannerId: id
		  }).then((res) =>{
			console.log('删除成功', res)
			if (res.code == '00000000') {
			  this.$message.success('删除成功')
			  this.getBannerList()
			}
		  })
		}).catch(() =>{
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});

	  },
	  //查看图片
	  showImg(url){
		this.bannerImgUrl = url
		this.showDialogImg = true

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
			console.log(baseStr)

			//base64转二进制
			function dataURItoBlob(dataURI){
			  let byteString = atob(dataURI.split(',')[1]);
			  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
			  let ab = new ArrayBuffer(byteString.length);
			  let ia = new Uint8Array(ab);
			  for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			  }
			  return new Blob([ab], {type: mimeString});
			}

			//二进制变formData
			let fd = new FormData();
			let blob = dataURItoBlob(baseStr);
			fd.append('picture', blob, event.target.files[0].name);
			console.log('图片信息111111', JSON.stringify(fd))
			_this.httpRequest.uploadPictures(fd).then(picRes =>{
			  console.log(picRes)
			  if (picRes.code === '00000000') {
				_this.showImgUrl = picRes.data
				_this.$message.success('上传成功')
			  }
			})
		  }
		})
	  },
	  changePaging(pageNum){
		this.getBannerList(pageNum);
	  },
	  getBannerList(index = 1){
		this.httpRequest.getBanners({
		  pageNum: index,
		  pageSize: 10,
		  bannerName: this.bannerName,
		}).then((res) =>{
		  console.log('获取banner列表', res)
		  if (res.code == '00000000') {
			this.bannerList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  }

	},
	activated(){
	  this.getBannerList()
	}
  }
</script>

<style lang="scss" scoped>
	.bannerList {
		.fontColor {
			color: #20a0ff;
			text-decoration: underline;
		}
		.img {
			height: 300px;
			width: 600px;
		}
		.topFrom {
			padding: 0 10px;
			line-height: 40px;
			margin-left: 20px;
			.fileInput {
				border: 1px solid #ccc;
				padding: 5px;
			}
		}
		.topFromShowImg {
			margin-left: 15%;
			margin-top: 20px;
			height: 170px;
			width: 300px;
			img {
				height: 100%;
				width: 100%;
			}
		}
	}

	.el-dialog__body {
		img {
			max-height: 100%;
			max-width: 100%;
		}
	}
</style>
