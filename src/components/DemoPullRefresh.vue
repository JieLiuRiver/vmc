<template>
	<div>
		<vmc-pull-refresh v-model="isLoading">
			<div class="vmc-flex vmc-flex-rstart" style="margin-top: 20px;padding-left: 20px;">
				<router-link class="vmc-block btn-sm" to="/">返回</router-link>
			</div>
			<p style="color: #ccc;" class="vmc-text-center f-mt10">下拉刷新</p>
			<div class="vmc-flex vmc-flex-center vmc-flex-column" :style="containerStyles()">
				<a class="vmc-block btn-sm btn-long vmc-1px" href="javascript:;" @click="asyncSuccess">异步成功</a>	
			</div>
		</vmc-pull-refresh>
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
			asyncSuccess() {
				this.isLoading = false
			},
			containerStyles() {
				return { height:  document.documentElement.clientHeight * 0.8 + 'px'}
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>