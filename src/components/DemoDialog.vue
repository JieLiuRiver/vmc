<template>
	<div>
		<div class="vmc-flex vmc-flex-rstart" style="margin-top: 20px;padding-left: 20px;">
			<router-link class="vmc-block btn-sm" to="/">返回</router-link>
		</div>
		<div class="vmc-flex vmc-flex-center vmc-flex-column" :style="containerStyles()">
			<a class="vmc-block btn-sm btn-long" href="javascript:;" @click="showTipDialog">提示框</a>
			<a style="margin-top: 20px;" class="vmc-block btn-sm btn-long" href="javascript:;" @click="showConfirmDialog">确认框</a>
			<!-- <a style="margin-top: 20px;" class="vmc-block btn-sm btn-long" href="javascript:;" @click="destory">销毁</a> -->
		</div>
		<!-- <vmc-dialog>
			
		</vmc-dialog> -->
	</div>
</template>


<script>
	export default {
		data () {
			return {

			}
		},
		methods: {
			containerStyles() {
				return { height:  document.documentElement.clientHeight * 0.8 + 'px'}
			},
			showTipDialog() {
				this.dialog = this.$Dialog.tip({
					message: '当前阅读到第23页',
					title: '提示',
					confirmButtonText: '知道了',
					onOk() {
						console.log('知道了')
					}
				})
			},
			showConfirmDialog() {
				this.dialog = this.$Dialog.confirm({
					title:'警告',
					message: '交易存在风险，是否继续操作？',
					cancelButtonText: '取消',
					confirmButtonText: '继续进行',
					onOk() {
						console.log('继续进行')
					},
					onNo() {
						console.log('取消')
					}
				})
			},
			destory() {
				this.dialog.destory()
			}
		}
	}
</script>

<style scoped lang="less">
.btn-sm{
	border-radius: 2px;
	padding: 0.08rem 0.2rem;
	background-color: #fff;
	-webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.btn-long{
	width: 90%;
	text-align: center;
}
</style>