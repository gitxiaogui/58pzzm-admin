<template>
	<el-row class="loanConfirm-main">
		<loanConfirmList></loanConfirmList>
	</el-row>
</template>
<script>
	import loanConfirmList from './loanConfirmList.vue'
	export default {
		components: {
			loanConfirmList,
		}
	}
</script>
<style lang=scss>
	.loanConfirm-main {

	}
</style>