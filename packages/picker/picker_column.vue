<template>
	<div class="vmc-picker-column vmc-flex-1 vmc-relative vmc-full-width">
		 <div class="vmc-picker-column-frame vmc-full-width vmc-1px-t vmc-1px-b  vmc-absolute" :style="frameStyle"/>
		 <ul 
		 	:style="pickerListStyles"
		 	@touchstart="onTouchStart"
		 	@touchmove.prevent="onTouchMove"
		 	@touchend="onTouchEnd"
      		@touchcancel="onTouchEnd"
		 	class="vmc-picker-list">
		 	<li
		 		class="vmc-picker-item vmc-ellipsis vmc-text-center"
		        v-for="(option, index) in currentOptions" 
		        v-text="getOptionText(option)"
		        :style="pickerItemStyles"
		        @click.stop="switchItem(option, index)"
		        :class="{'vmc-picker-item-selected': currentIndex === index}"
		      />
		 </ul>
	</div>
</template>


<script>
	import utils from 'packages/utils'
	// 限制最大最小
	// Math.max(num, arr[0]) 不能一直小, 当小于arr[0]时，取arr[0]
	// Math.min(num, arr[1]) 不能一直大, 当大于arr[1]时，取arr[1]
	const range = (num, arr) => Math.min(Math.max(num, arr[0]), arr[1]);
	export default {
		props: {
			options: {
				type: [Array],
				default: () => []
			},
			itemHeight: {
		      type: Number,
		      default: 44
		    },
		    valueKey: String,
		    visibileColumnCount: {
		      type: Number,
		      default: 5
		    },
		    defaultIndex: {
		      type: Number,
		      default: 0
		    }
		},
		created() {
			
		},
		mounted() {
			this.currentOptions = this.options
			this.currentIndex = this.defaultIndex
			this.$nextTick(() => {
				this.setIndex(this.currentIndex)
			})
		},
		data() {
			return {
				currentOptions: [],
				offset: 0,
				startOffset: 0,
				duration: 0,
				startY: 0,
				currentIndex: 0
			}
		},
		methods: {
			switchItem(option, index) {
				this.setIndex(index)
			},
			getOptionText(option) {
		      return typeof option === 'object' && this.valueKey in option ? option[this.valueKey] : option;
		    },
		    onTouchStart() {
		    	this.startY = event.touches[0].clientY;
			    this.startOffset = this.offset;
			    this.duration = 0;
		    },
		    onTouchMove() {
		    	const deltaY = event.touches[0].clientY - this.startY;

		    	this.offset = range(this.startOffset + deltaY, [
			        -(this.count * this.itemHeight),
			        this.itemHeight
			    ]);
		    },
		    onTouchEnd() {
		    	if (this.offset !== this.startOffset) {
			        this.duration = 200;
			        // 最小不能小于0
			        // 最大不能大于count-1
			        const index = range(Math.round(-this.offset / this.itemHeight), [
			          0,
			          this.count - 1
			        ]);
			        this.setIndex(index);
			    }
		    },
		    setIndex(index) {
		    	this.offset = -index * this.itemHeight;
      			this.currentIndex = index;	
		    },
		    getValue() {
		    	return {
		    		index: this.currentIndex,
		    		value: this.currentOptions[this.currentIndex]
		    	}
		    },
		    setValue(value) {
		    	const index = this.currentOptions.findIndex(v => v === value) === -1 ? 0 : this.currentOptions.findIndex(v => v === value)
		    	this.setIndex(index)
		    },
		    getColumnValues() {
		    	return utils.clone(this.currentOptions)
		    },
		    setColumnValues(rows) {
		    	// this.currentOptions = utils.clone(rows)
		    	// console.log('it work', rows, this.currentOptions)
		    }
		},
		watch: {
			currentIndex(index) {
			  this.$nextTick(() => {
		      	this.$emit('change', this, this.currentOptions[index], index);
			  })
			},
			options() {
				this.currentOptions = this.options
			}
		},
		computed: {
			count() {
		      return this.currentOptions.length;
		    },
			frameStyle() {
				return {
					height: `${this.itemHeight / 100}rem`
				}
			},
			pickerListStyles() {
				return {
					transition: `${this.duration}ms`,
        			transform: `translate3d(0, ${this.offset / 100}rem, 0)`,
					height: `${(this.itemHeight * this.visibileColumnCount) / 100}rem`,
					paddingTop: (this.itemHeight * (this.visibileColumnCount - 1) / 2) / 100 + 'rem'
				}
			},
			pickerItemStyles() {
				return {
					height: `${this.itemHeight / 100}rem`,
					lineHeight: `${this.itemHeight / 100}rem`
				}
			}
		}
	}
</script>


<style scoped lang="less">
	.vmc-picker-column{
		overflow: hidden;
	}
	.vmc-picker-column-frame{
		top: 50%;
		left: 0;
		transform: translate3d(0, -50%, 0);
		-webkit-transform: translate3d(0, -50%, 0);
		pointer-events: none;
	}
	.vmc-picker-item{
		padding: 0 0.1rem;
		color: #666;
		&.vmc-picker-item-selected{
			color: #000;
		}
	}
</style>