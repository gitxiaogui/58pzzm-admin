<template>
	<el-row>
		<!--列表区域-->
		<el-row>
			<el-table :data="riverData" highlight-current-row border ref="multipleTable" style="width: 100%"
					  @row-click="getreturnedMoney">
				<el-table-column type="expand">
					<template scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<riverDiversionList :diversion.once="props.row" ></riverDiversionList>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="导流平台" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.diversionName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="点击量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.clickCount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="注册量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.signCount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.orderCount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="放款量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.suCount }}</span>
					</template>
				</el-table-column>
				<el-table-column label="回款率" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.retRadio=='0' ? scope.row.retRadio : scope.row.retRadio+'%' }}</span>
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
</template>

<script>
	import riverDiversionList from './riverDiversionList'
  export default {
	  components:{
	    riverDiversionList
	  },
	data(){
	  return {
		pageNum: 1,
		listTotalNumber: 0,
		riverData: [],
	  }
	},
	methods: {
	  search(){
		this.getList()
	  },
	  reset(){
		this.diversionCode = ''
		this.getList()
	  },
	  //分页
	  handlePageChange(pageNum){
		this.getList(pageNum)
	  },
	  getList(index = 0){
		this.httpRequest.platformCount({
		  page: index,
		  rows: 10,
		  diversionCode: ""
		}).then((res) =>{
		  console.log('导流获取列表', res)
		  this.riverData = res.data.list
		  this.listTotalNumber = res.data.total
		})
	  },
	  getreturnedMoney(row, event, column){
		if (column.type === "expand") {
		  this.caseListLenderId = row.id;
		  console.log('打印当前id', this.caseListLenderId)
		  event.stopPropagation();
		  return false;
		}
	  },
	},
	activated(){
	  this.getList()
	}
  }
</script>

<style scoped>

</style>