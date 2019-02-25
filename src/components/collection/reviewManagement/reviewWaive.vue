<template>
	<div class="review-abate">
		<h3 style="margin-top: 0px;">弃案管理</h3>
		<el-row>
    	<el-table
    	  class="list-table"
    	  highlight-current-row
    	  :data="discardData"
          border
        style="width: 100%">
        <el-table-column
          prop="collectorName"
          label="催收员"
          label-class-name="table-header-bold"
          header-align="center">
          <template>
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>
        <el-table-column
        	label="审核操作"
          label-class-name="table-header-bold"
          align="center">
            <template scope="scope">
              <el-col>
                <el-button
                  size="small"
                  type="warning"
                  @click="byApplying(scope.row.id)">通过弃案申请</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="notpassApplying(scope.row.id)">打回弃案申请</el-button>
              </el-col>
            </template>
          </el-table-column>
    	</el-table>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        :current-page.sync="discardPage"
        @current-change="changPagediscard"
        layout="prev, pager, next"
        :total="discardPageTotalNumber">
      </el-pagination>
    </el-row>
	</div>
</template>
<script>
	import { gainDiscard,theapplicationIsapproved,notpassIsapproved } from '@/api/api'
	export default {
	    data(){
	    	return{
	    	  discardPage:1,
	    	  discardPageTotalNumber:0,
	    	  discardData:[],
	    	}
	    },
	    methods: {
	    	changPagediscard(pageNum){
	    	   this.getListdiscard(pageNum)
	    	},
            getListdiscard(index=1){
		       gainDiscard({
		          page: index,
                  size: 10,
		          sortBy: 'desc',
                  sortOrder: 'createTime',
		        }).then((res) => {
		          this.discardData = res.data
		          this.discardPageTotalNumber = res.total
		          console.log('=========================弃案',this.discardData)
		        })
		    },
		    byApplying(withdrawcaseId){
		    	console.log('查看',withdrawcaseId)
		    	this.$confirm('此操作将通过弃案申请, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        theapplicationIsapproved({
			        waiveId:withdrawcaseId
			    }).then((res)=>{
		            console.log(res)
		            this.$message.success('操作成功')
		            this.getListdiscard()
		         })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
		    },
		    notpassApplying(notpassId){
		    	console.log('查看未通过',notpassId)
		    	this.$confirm('此操作将打回弃案申请, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        notpassIsapproved({
			        waiveId:notpassId
			    }).then((res)=>{
		            console.log(res)
		            this.$message.success('操作成功')
		            this.getListdiscard()
		         })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
		    },
	    },
	    activated() {
            this.getListdiscard()
        },
    }
</script>
<style>
	.revie-abate{
		
	}
</style>