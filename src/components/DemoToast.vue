<template>
	<div>
		<div class="vmc-flex vmc-flex-rstart" style="margin-top: 20px;padding-left: 20px;">
			<router-link class="vmc-block btn-sm" to="/">返回</router-link>
		</div>
		<div class="vmc-flex vmc-flex-center vmc-flex-column" :style="containerStyles()">
			<a class="vmc-block btn-sm btn-long vmc-1px" href="javascript:;" @click="successToast">成功提示</a>	
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: false
			}
		},
		methods: {
			containerStyles() {
				return { height:  document.documentElement.clientHeight * 0.8 + 'px'}
			},
			successToast() {
				this.$Toast.success({text: '支付成功'})
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>