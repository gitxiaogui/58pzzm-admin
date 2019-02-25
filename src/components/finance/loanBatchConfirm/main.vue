<template>
	<el-row class="loadbatch-main">
		<loanBatchConfirmList></loanBatchConfirmList>
	</el-row>
</template>
<script>
	import loanBatchConfirmList from './loanBatchConfirmList.vue'
	export default {
		components: {
			loanBatchConfirmList,
		}
	}
</script>
<style lang="scss">
	.loadbatch-main {

	}
</style>