<template>
	<Scroll :data="totalList">
		<div class="side-nav">
			<h1 class="vmc-flex vmc-flex-center vmc-flex-column" style="margin-bottom: 40px;">
				<span class="vmc-block title">VMC</span>
				<p>移动端Vue2.x组件</p>
			</h1>
			<div class="mobile-nav-item vmc-flex vmc-flex-center vmc-full-width vmc-flex-column">
				<div class="mobile-nav-group vmc-full-width vmc-relative" v-for="(type, typeIndex) in totalList" :key="typeIndex">
					<div class="m-title vmc-relative" @click="type.groupVisibity = !type.groupVisibity" :class="{'m-title-opened': type.groupVisibity}">
						{{type.typename}}
					</div>

					<transition name="slide-top">
						<div class="group-wraper vmc-full-width" v-show="type.groupVisibity">
							<ul class="group-list vmc-full-width">
								<li class="group-item vmc-full-width vmc-flex vmc-flex-nowrap" v-for="(o,k) in type.comlist" :key="k">
									<router-link :to="{name: o.routename}" class="vmc-block vmc-full-height group-link vmc-1px-t vmc-flex vmc-flex-rbetween">
										<span class="vmc-block">{{o.name}}</span>
										<i class="vmc-block ion-ios-arrow-forward"></i>
									</router-link>
								</li>
							</ul>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</Scroll>
</template>

<script>
	import Scroll from '@/components/Scroll'
	import Bus from '@/bus'
	export default {
		components: {
			Scroll
		},
		data() {
			return {
				totalList: Bus.demoList
			}
		}
	}
</script>

<style lang="less" scope>
.side-nav{
	width: 100%;
    box-sizing: border-box;
    padding: 0.4rem 0.15rem 0.2rem;
    position: relative;
    z-index: 1;
    .title{
    	font-size: 30px;
    	text-align: center;
    }
    .mobile-nav-group{
    	border-radius: 2px;
	    margin-bottom: 0.15rem;
	    background-color: #fff;
	    overflow: hidden;
	    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.10);
	    .m-title{
	    	padding: 0.15rem 0;
	    	padding-left: 0.2rem;
	    	z-index: 2;
	    	background-color: #fff;
	    	&.m-title-opened{
	    		color: #666;
	    	}
	    }
	    .group-wraper{
	    	z-index: 1;
	    	top: 0.52rem;
	    	.group-list{
	    		.group-item{
					background-color: #fff;
					.group-link{
						flex: 1;
						padding: 0.15rem 0;
	    				margin-left: 0.2rem;
	    				color: #000;
	    				padding-right: 0.2rem;
	    				i{
	    					font-size: 16px;
	    				}
					}
	    		}
	    	}
	    }
    }
}
.slide-top-enter-active{
	transition: 0.2s ease-in;
}
.slide-top-enter{
	transform: translate3d(0, -100%, 0)
}
</style>