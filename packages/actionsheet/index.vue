<template>
	<div>
		<transition name="vmc-slide-bottom">
				<div class="vmc-actionsheet-wrapper" v-show="value">
					<ul class="vmc-actionsheet-list">
						<li class="vmc-actionsheet-item vmc-flex vmc-flex-center vmc-1px-b" v-for="(o, i) in actions" :key="i"  @click.stop="onClickItem(o)">
							<span class="vmc-block">{{o.name}}</span>
						</li>
						<li class="vmc-actionsheet-item vmc-flex vmc-flex-center" @click.stop="$emit('input', false)">
							<span class="vmc-block">取消</span>
						</li>
					</ul>
				</div>
		</transition>
		<div class="vmc-mask" v-show="value" @click.stop="$emit('input', false)"></div>
	</div>
</template>
<script>
	export default {
		props: {
			value: Boolean,
			actions: {
				type: Array,
				default: () => []
			},
			title: {
				type: String,
				default: ''
			},
			overlay: {
				type: Boolean,
				default: true
			},
			closeOnClickOverlay: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			}
		},
		methods: {
			onClickItem(o) {
				if (typeof o.callback !== 'undefined' && typeof o.callback === 'function') {
					o.callback(o)
				}
			}
		}
	}
</script>

<style scoped lang="less">
.vmc-actionsheet-wrapper{
	position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    color: #333;
    background-color: #f8f8f8;
    z-index: 2001;
    .vmc-actionsheet-item{
    	padding: 0.14rem 0;
    }
}
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
.slide-bottom-enter-active, .slide-bottom-leave-active{
	transition: 0.2s ease-out;
	-webkit-transition: .2s ease-out;
}
.slide-bottom-enter, .slide-bottom-leave-to{
	transform: translate3d(0, 100%, 0);
	-webkit-transform: translate3d(0, 100%, 0);
}
</style>