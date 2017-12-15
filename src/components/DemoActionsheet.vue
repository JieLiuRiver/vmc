<template>
	<div class="container">
		<div class="vmc-flex vmc-flex-rstart" style="margin-top: 20px;padding-left: 20px;">
			<router-link class="vmc-block btn-sm" to="/">返回</router-link>
		</div>
		<div class="vmc-flex vmc-flex-center vmc-flex-raround" :style="containerStyles()">
			<a class="vmc-block btn-sm btn-long" href="javascript:;" @click="show=!show">付钱</a>	
		</div>

		<vmc-actionsheet
			:actions="actions"
			v-model="show">
		</vmc-actionsheet>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				actions: [
					{
			          name: '支付宝支付',
			          callback: this.onClick
			        },
			        {
			          name: '信用卡支付',
			          callback: this.onClick
			        },
			        {
			          name: '微信支付',
			          callback: this.onClick
			        }
				]
			}
		},
		methods: {
			containerStyles() {
				return { height:  document.documentElement.clientHeight * 0.8 + 'px'}
			},
			onClick(item) {
				alert(item.name)
			}
		}
	}
</script>

<style scoped lang="less">
.container{

}
.btn-sm{
	border-radius: 2px;
	padding: 8px 20px;
	background-color: #fff;
	-webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.btn-long{
	width: 90%;
	text-align: center;
}
</style>