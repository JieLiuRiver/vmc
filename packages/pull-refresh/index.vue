<template>
	<div class="vmc-pull-refresh-wrapper"
		    @touchstart="onTouchStart"
		    @touchmove="onTouchMove"
		    @touchend="onTouchEnd"
		    @touchcancel="onTouchEnd"
		    :style="pullRefreshWrapperStyles">
		<div class="vmc-pull-refresh-title">
			  <slot name="normal" v-if="status === 'normal'"></slot>
		      <slot name="pulling" v-if="status === 'pulling'">
		        <span class="vmc-pull-refresh-text">{{ pullingText }}</span>
		      </slot>
		      <slot name="loosing" v-if="status === 'loosing'">
		        <span class="vmc-pull-refresh-text">{{ loosingText }}</span>
		      </slot>
		      <slot name="loading" v-if="status === 'loading'">
		        <div class="vvmc-pull-refresh-loading">
		        	<span class="vmc-inlineb vmc-animation-rotate">
		        		 <i class="ion-load-d "></i>	
		        	</span>
		          <span>{{ loadingText }}</span>
		        </div>
		      </slot>
		</div>
		<slot></slot>
	</div>
</template>


<script>
	import utils from 'packages/utils'
	export default {
		name: 'vmc-pull-refresh',
		props: {
		    pullingText: {
		    	type: String,
		    	default: '下拉刷新...'
		    },
		    loosingText: {
		    	type: String,
		    	default: '释放即可加载...'
		    },
		    loadingText: {
		    	type: String,
		    	default: '加载中...'
		    },
		    value: {
		      type: Boolean,
		      required: true
		    },
		    animationDuration: {
		      type: Number,
		      default: 300
		    },
		    headHeight: {
		      type: Number,
		      default: 50
		    }
		},
		data() {
			return {
				status: 'normal',
			    height: 0,
			    duration: 0
			}
		},
		computed: {
			pullRefreshWrapperStyles() {
				return {
					transition: `${this.duration}ms`,
        			transform: `translate3d(0,${this.height}px, 0)`
				}
			}
		},
		watch: {
		    value(val) {
		      if (!val) {
		        this.duration = this.animationDuration;
		        this.getStatus(0);
		      }
		    }
		},
		methods: {
			onTouchStart(event) {
				if (this.status === 'loading') {
			        return;
			    }
			    if (this.getCeiling()) {
			        this.duration = 0;
			        this.startX = event.touches[0].clientX;
			        this.startY = event.touches[0].clientY;
			    }
			},
			onTouchMove(event) {
				if (this.status === 'loading') {
			       return;
			    }
			    this.deltaY = event.touches[0].clientY - this.startY;
      			this.direction = this.getDirection(event.touches[0]);
      			if (this.ceiling && this.deltaY >= 0) {
			        if (this.direction === 'vertical') {
			          event.preventDefault();
			        }
			        this.getStatus(this.ease(this.deltaY));
			    }
			},
			onTouchEnd() {
				if (this.status === 'loading') {
			        return;
			    }

			    if (this.ceiling && this.deltaY) {
			        this.duration = this.animationDuration;
			        if (this.status === 'loosing') {
			          this.getStatus(this.headHeight, true);
			          this.$emit('input', true);
			        } else {
			          this.getStatus(0);
			        }
			    }
			},
			ease(height) {
		      const { headHeight } = this;
		      return height < headHeight
		        ? height
		        : height < headHeight * 2
		          ? Math.round(headHeight + (height - headHeight) / 2)
		          : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
		    },
			getStatus(height, isLoading) {
		      this.height = height;

		      const status = isLoading
		        ? 'loading' : height === 0
		          ? 'normal' : height < this.headHeight
		            ? 'pulling' : 'loosing';

		      if (status !== this.status) {
		        this.status = status;
		      }
		    },
			getCeiling() {
		      this.ceiling = utils.getScrollTop(this.$el) === 0;
		      return this.ceiling;
		    },
			getDirection(touch) {
				const distanceX = Math.abs(touch.clientX - this.startX);
			    const distanceY = Math.abs(touch.clientY - this.startY);
			    return distanceX > distanceY ? 'horizontal' : distanceX < distanceY ? 'vertical' : '';
			}
		}
	}
</script>

<style scoped lang="less">
	.vmc-pull-refresh-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #fff;
	}
	.vmc-pull-refresh-title{
		width: 100%;
	    height: 0.5rem;
	    left: 0;
	    overflow: hidden;
	    position: absolute;
	    text-align: center;
	    top: -0.5rem;
	    font-size: 14px;
	    color: #999;
	    line-height: 0.5rem;
	}

</style>