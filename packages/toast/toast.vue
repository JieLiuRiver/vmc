<template>
	<transition name="vmc-fade">
		<div class="vmc-fixed-full vmc-toast-wrapper vmc-flex vmc-flex-center" v-show="showFlag">
			<div class="vmc-toast-content vmc-flex vmc-flex-center vmc-flex-column vmc-flex-caround">
				<div><slot name="icon"><i class="ion-checkmark"></i></slot></div>
				<div>{{op.text}}</div>
			</div>	
		</div>	
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				showFlag: true,
				op: {
					text: '',
					dealy: 2000
				},
				timer: null
			}
		},
		methods: {
			initTimer() {
				this.timer && clearTimeout(this.timer)
				this.showFlag = true
				setTimeout(() => {
					this.showFlag = false
				}, this.op.dealy)
			}
		}
	}
</script>


<style scoped lang="less">
	.vmc-toast-wrapper{

	}
	.vmc-toast-content{
		width: 1.2rem;
		height: 1.2rem;
		padding: 0.15rem;
		background-color: rgba(39, 39, 39, .7);
		border-radius: 0.05rem;
		color: #fff;
		i{
			font-size: 44px;
		}
	}
</style>