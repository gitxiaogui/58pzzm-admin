<template>
	<div class="review-abate">
		<h3 style="margin-top: 0px;">撤案管理</h3>
		<el-row>
    	<el-table
    	class="list-table"
    	highlight-current-row
    	:data="chatRecorddata"
        border
        style="width: 100%">
        <el-table-column
          prop="operatorName"
          label="催收员"
          label-class-name="table-header-bold"
          header-align="center">
          <template>
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="caseCount"
          label="案件数"
          label-class-name="table-header-bold"
          header-align="center">
          <template>
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="caseAmount"
          label="创建时间">
          <template>
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="collectorCount"
          label="催收员个数">
          <template>
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>-->-->
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
	import { getchatRecorddata} from '@/api/api'
	export default {
	    data(){
	    	return{
	    	  discardPage:1,
	    	  discardPageTotalNumber:0,
	    	  chatRecorddata:[],
	    	}
	    },
	    methods: {
	    	changPagediscard(pageNum){
	    	  this.getchatRecordList(pageNum)
	    	},
            getchatRecordList(index = 1){
		       getchatRecorddata(
		          {
		          page:index,
                  size:10,
		          sortBy:'desc',
                  sortOrder:'assignTIme',
		          }
		        ).then((res) => {
		          this.chatRecorddata = res.data
		          this.discardPageTotalNumber = res.total
		          console.log('=========================撤案',res)
		        })
		    },
		   
	    },
	    activated() {
            this.getchatRecordList()
        },
    }
</script>
<style>
	.revie-abate{
		
	}
</style>