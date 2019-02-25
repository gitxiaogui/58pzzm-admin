<template>
	<el-row>
		<el-row>
			<el-table :data="refundChildList" highlight-current-row border ref="multipleTable" style="width: 100%">
				<el-table-column label="产品" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.prodName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="回款率" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.returnRate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="入催率" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.overRate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="类型" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.customer_type=='new' ? '新用户' : '老用户'  }}</span>
					</template>
				</el-table-column>
				<el-table-column label="放款日" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.beginTime }}</span>
					</template>
				</el-table-column>
				<el-table-column label="到期日" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.endTime }}</span>
					</template>
				</el-table-column>
				<el-table-column label="周期" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.period }}</span>
					</template>
				</el-table-column>
				<el-table-column label="应到期笔数" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.shouldNum }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-1" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t1 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-2" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t2 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-3" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t3 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-4" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t4 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-5" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t5 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-6" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t6 }}</span>
					</template>
				</el-table-column>
				<el-table-column label="T-7" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.t7 }}</span>
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
  export default {
	props: ['refundData', 'time'],
	data(){
	  return {
		refundChildList: [],
		pageNum: 1,
		listTotalNumber: 0,

	  }
	},
	methods: {
	  handlePageChange(pageNum){
		this.getDataList(pageNum)
	  },
	  getDataList(index=1){
		this.httpRequest.getListChannelDetail({
		  beginTime: this.time[0] ? this.time[0].getTime() : '',
		  platform_flag: this.refundData.platform_flag,
		  endTime: this.time[1] ? this.time[1].getTime() : '',
		  page: index,
		  rows: 10,
		}).then((res) =>{
		  console.log('获取回款子集列表======', res)
		  this.refundChildList = res.data.list
		  this.listTotalNumber = res.data.total
		})
	  }

	},
	mounted(){
		this.getDataList()
	}
  }
</script>

<style scoped>

</style>