<template>
	<el-row class="riverDiversionList">
		<!--列表区域-->
		<el-select v-model="value" placeholder="请选择">
			<el-option
					v-for="item in options"
					:key="item.id"
					:label="item.name"
					:value="item.id">
			</el-option>
		</el-select>
		<!--注册量-->
		<el-row v-show="zhuce">
			<el-table :data="riverChildData" highlight-current-row border ref="multipleTable" style="width: 100%">
				<el-table-column label="手机号" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)),'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange" :current-page.sync="pageNum"
							   layout="total, prev, pager, next" :total="listTotalNumber">
				</el-pagination>
			</el-row>
		</el-row>
		<!--订单量-->
		<el-row v-show="dingdan">
			<el-table :data="orderCountData" highlight-current-row border ref="multipleTable" style="width: 100%">
				<el-table-column label="姓名" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)),'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange1" :current-page.sync="pageNum1"
							   layout="total, prev, pager, next" :total="listTotalNumber1">
				</el-pagination>
			</el-row>
		</el-row>
		<!--放款量-->
		<el-row v-show="fangkuan">
			<el-table :data="suCountData" highlight-current-row border ref="multipleTable" style="width: 100%">
				<el-table-column label="姓名" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)),'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange2" :current-page.sync="pageNum2"
							   layout="total, prev, pager, next" :total="listTotalNumber2">
				</el-pagination>
			</el-row>
		</el-row>
		<!--回款量-->
		<el-row v-show="huikuan">
			<el-table :data="retCountData" highlight-current-row border ref="multipleTable" style="width: 100%">
				<el-table-column label="姓名" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)),'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange3" :current-page.sync="pageNum3"
							   layout="total, prev, pager, next" :total="listTotalNumber3">
				</el-pagination>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
  import {dateFormat} from "@/common/util";

  export default {
	props: ['diversion'],
	data(){
	  return {
	    zhuce:true,
	    dingdan:false,
	    huikuan:false,
	    fangkuan:false,
		pageNum: 1,
		pageNum1: 1,
		pageNum2: 1,
		pageNum3: 1,
		listTotalNumber: 0,
		listTotalNumber1: 0,
		listTotalNumber2: 0,
		listTotalNumber4: 0,
		riverChildData: [],
		orderCountData: [],
		suCountData:[],
		retCountData:[],
		value: 1,
		options: [{name:'注册统计',id:1},{name:'订单统计',id:2},{name:'放款统计',id:3},{name:'回款统计',id:4}],
	  }
	},
	methods: {
	  dateFormat,
	  //分页
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  handlePageChange1(pageNum1){
		this.orderCountDetail(pageNum1)
	  },
	  handlePageChange2(pageNum2){
		this.orderCountDetail(pageNum2)
	  },
	  handlePageChange3(pageNum3){
		this.orderCountDetail(pageNum3)
	  },
	  getList(index = 1){
		this.httpRequest.platformDetail({
		  page: index,
		  rows: 10,
		  diversionCode: this.diversion.diversionCode,
		  signCount: this.diversion.signCount,
		}).then((res) =>{
		  console.log('导流获取列表', res)
		  if (res.code == '00000000') {
			this.riverChildData = res.data.list
			this.listTotalNumber = res.data.total
		  }

		})
	  },
	  orderCountDetail(index = 1){
		this.httpRequest.orderCountDetail({
		  page: index,
		  rows: 10,
		  diversionCode: this.diversion.diversionCode,
		  orderCount: this.diversion.orderCount,
		}).then((res) =>{
		  if (res.code == '00000000') {
		    console.log('获取订单列表',res)
			this.orderCountData = res.data.list
			this.listTotalNumber1 = res.data.total
		  }
		})
	  },
	  suCountDetail(index = 1){
		this.httpRequest.suCountDetail({
		  page: index,
		  rows: 10,
		  diversionCode: this.diversion.diversionCode,
		  suCount: this.diversion.suCount,
		}).then((res) =>{
		  if (res.code == '00000000') {
		    console.log('获取订单列表',res)
			this.suCountData = res.data.list
			this.listTotalNumber2 = res.data.total
		  }
		})
	  },
		retCountDetail(index = 1){
		this.httpRequest.retCountDetail({
		  page: index,
		  rows: 10,
		  diversionCode: this.diversion.diversionCode,
		  retCount: this.diversion.retCount,
		}).then((res) =>{
		  if (res.code == '00000000') {
		    console.log('获取订单列表',res)
			this.retCountData = res.data.list
			this.listTotalNumber3 = res.data.total
		  }
		})
	  },
	},
	watch:{
	   value:function(a){
			switch (a){
			  case 1:
				this.zhuce = true;
				this.dingdan = false;
				this.huikuan = false;
				this.fangkuan = false;
				break
			  case 2:
				this.zhuce = false;
				this.dingdan = true;
				this.huikuan = false;
				this.fangkuan = false;
				break
			  case 3:
				this.zhuce = false;
				this.dingdan = false;
				this.fangkuan = true;
				this.huikuan = false;
				break
			  case 4:
				this.zhuce = false;
				this.dingdan = false;
				this.fangkuan = false;
				this.huikuan = true;
				break
			}
	   }
	},
	mounted(){
	  this.getList()
	  this.orderCountDetail()
	  this.suCountDetail()
	  this.retCountDetail()
	  console.log(111111, this.diversion)
	}
  }
</script>

<style lang="scss" scoped>
	.riverDiversionList {
		.el-select {
			margin-bottom: 10px;
		}
	}

</style>