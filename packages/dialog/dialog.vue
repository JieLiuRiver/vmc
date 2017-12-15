<template>
	<div class="vmc-dialog-wrapper vmc-mask vmc-flex vmc-flex-center" v-show="op.showflag" @click.stop="onClickMask">
		<div class="vmc-dialog" :class="{'animation-scale-in':op.showflag}">
			<div class="vmc-dialog-title vmc-text-center vmc-ellipsis">{{op.title}}</div>
			<div class="vmc-dialog-content vmc-ellipsis">{{op.message}}</div>
			<div class="vmc-dialog-footer vmc-flex vmc-flex-rstart vmc-1px-t">
				<span class="vmc-block vmc-dialog-footer-btn vmc-text-center vmc-1px-r vmc-ellipsis" v-if="op.type==='confirm'" @click.stop="cancelModal">{{op.cancelButtonText}}</span>
				<span class="vmc-block vmc-dialog-footer-btn vmc-text-center vmc-success-text vmc-ellipsis" @click.stop="sureAction">{{op.confirmButtonText}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
				isShow: true,
				op: {
					showflag: true,
					title: '标题',
					message: '内容',
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					overlay: true,
					closeOnClickOverlay: true,
					lockOnScroll: true,
					type: 'tip',
					onNo: () => {},
					onOk: () => {}
				}
			}
		},
		methods: {
			onClickMask() {
				this.op.showflag = false
			},
			cancelModal() {
				this.op.onNo && this.op.onNo()
				this.op.showflag = false
			},
			show() {
				this.op.showflag = true
			},
			sureAction() {
				this.op.onOk && this.op.onOk()
				this.op.showflag = false
			}
		},
		mounted() {
		},
		watch: {
			
		}
	}
</script>

<style scope lang="less">
.vmc-mask{
	z-index: 2000;
	overflow: hidden;
	position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    -webkit-transition: .2s ease-out;
    transition: .2s ease-out;
}
.vmc-dialog{
	z-index: 2001;
	width: 85%;
	background-color: #fff;
	border-radius: 0.04rem;
	overflow: hidden;
	.vmc-dialog-title{
		padding: 0.08rem 0;
	}
	.vmc-dialog-content{
		padding: 0.15rem 0.2rem;
		color: #999;
	}
	.vmc-dialog-footer-btn{
		flex: 1;
		padding: 0.12rem 0;
	}
}
.animation-scale-in{
	animation: scale-in .2s ease-in;
	-webkit-animation: scale-in .2s ease-in;
}
@keyframes scale-in{
	0%{
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	100%{
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
}

</style>