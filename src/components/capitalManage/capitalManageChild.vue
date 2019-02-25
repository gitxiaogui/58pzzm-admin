<template>
	<div class="capitalManageChild">
		<el-table :data="capitalList" highlight-current-row border ref="multipleTable" style="width: 100%">
			<el-table-column label="金额" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ scope.row.amount }}</span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" header-align="center" label-class-name="table-header-bold">
				<template scope="scope">
					<span>{{ dateFormat(new Date(parseInt(scope.row.createTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作人" header-align="center" label-class-name="table-header-bold" width="130">
				<template scope="scope">
					<span>{{ scope.row.optName }}</span>
				</template>
			</el-table-column>
		</el-table>
		<el-row type="flex" justify="center">
				<el-pagination @current-change="handlePageChange" :current-page.sync="pageNum" layout="total, prev, pager, next" :total="listTotalNumber">
				</el-pagination>
			</el-row>
	</div>
</template>

<script>
    import {dateFormat} from "../../common/util";

	export default {
    props:['capitalId','times'],

	data(){
	  return {
	    capitalList: [],
		pageNum: 1,
		listTotalNumber: 0,
	  }
	},
	methods: {
      dateFormat,
	  getChildList(index=1){
	    this.httpRequest.getChargeMoneys({
			pageNum: index,
			pageSize: 10,
			id: this.capitalId,
		}).then((res)=>{
		  console.log('获取注资明细',res)
		  if(res.code == '00000000'){
		    this.capitalList = res.data.list
			this.listTotalNumber = res.data.total
		  }
		})
	  },
	  handlePageChange(pageNum){
		this.getChildList(pageNum)
	  }
	},
	mounted(){
		this.getChildList()
	}
  }
</script>

<style scoped>

</style>