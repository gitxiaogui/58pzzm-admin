<template>
	<div class="youfen_crime_info">
		<el-row>
			<el-table :data="crimeData" highlight-current-row border ref="multipleTable" style="width: 100%">
				<el-table-column label="涉案类型" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.crimeType }}</span>
					</template>
				</el-table-column>
				<el-table-column label="案件数量" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.count }}</span>
					</template>
				</el-table-column>
				<el-table-column label="案件类别" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.caseType }}</span>
					</template>
				</el-table-column>
				<el-table-column label="案件时间段" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.casePeriod }}</span>
					</template>
				</el-table-column>
				<el-table-column label="案件来源" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.caseSource }}</span>
					</template>
				</el-table-column>
				<el-table-column label="案件级别" header-align="center" label-class-name="table-header-bold">
					<template scope="scope">
						<span>{{ scope.row.caseLevel }}</span>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
	</div>
</template>

<script>
  export default {
    props:['data'],
	data(){
	  return {
		crimeData:[]
	  }
	},
	methods: {

	},
	mounted(){
		console.log('刑事案底===========',this.data.data.data.data)
	  	if(!this.data.data.data.data){
			this.crimeData = []
		}else{
			this.crimeData = this.data.data.data.data
		}

	}
  }
</script>

<style lang="scss" >
.youfen_crime_info{

}
</style>