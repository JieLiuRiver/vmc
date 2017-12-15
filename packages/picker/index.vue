<template>
	<transition name="vmc-slide-bottom">
		<div class="vmc-picker" v-if="showModel">
			<div class="vmc-picker-toobar vmc-flex vmc-flex-rstart vmc-1px-b" v-if="showToolbar">
				<div class="vmc-picker-cancel vmc-text-center vmc-info-text" @click="emit('cancel')">{{cancelText}}</div>
				<div class="vmc-picker-title vmc-text-center">{{title}}</div>
				<div class="vmc-picker-confirm vmc-text-center vmc-info-text" @click="emit('sure')">{{confirmText}}</div>
			</div>
			<div class="vmc-picker-columns vmc-flex vmc-flex-rstart">
				<vmc-picker-column 
					v-for="(o,i) in currentColumns" :key="i"
					:itemHeight="itemHeight"
					:visibileColumnCount="visibileColumnCount"
					:valueKey="valueKey"
					:defaultIndex="o.defaultIndex"
					@change="onChange"
					:options="o.values"
					:ref="`pickerColumn${i}`">
				</vmc-picker-column>
			</div>
		</div>	
	</transition>
</template>

<script>
	import VmcPickerColumn from './picker_column'
	import utils from 'packages/utils'
	export default {
		props: {
			value: Boolean,
			title: {
				type: String,
				default: '标题'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			valueKey: String,
			itemHeight: Number,
			visibileColumnCount: Number,
			columns: {
				type: [Array, Object],
				default: () => []
			},
			showToolbar: Boolean
		},
		data() {
			return {
				children: [],
				currentColumns: [],
				showModel: false
			}
		},
		methods: {
			emit(event) {
		        this.$emit(event, this, this.getValues());
		    },
			onChange(column, options, columnIndex) {
				this.$emit('change', this, column, options, columnIndex);
			},
			// 获取所有列选中的值，返回一个数组
			getValues() {
				let results = []
				this.currentColumns.forEach((item,index) => {
					results.push(this.$refs['pickerColumn' + index][0].getValue())
				})
				return results
			},
			setValues(values) {
				this.currentColumns.forEach((column,index) => {
					const pickerColum = this.$refs['pickerColumn' + index][0]
					pickerColum.setValue.call(pickerColum, values[index])
				})
			},
			setIndexes(indexes) {
				this.currentColumns.forEach((column,index) => {
					const pickerColum = this.$refs['pickerColumn' + index][0]
					pickerColum.setIndex.call(pickerColum, indexes[index])
				})
			},
			getColumnValues(index) {
				const pickerColum = this.$refs['pickerColumn' + index][0]
				return pickerColum.getColumnValues.call(pickerColum)
			},
			setColumnValues(index, rows) {
				if (arguments.length === 2) {
					if (arguments[0] > this.currentColumns.length - 1 || arguments[0] < 0) return
					this.currentColumns[arguments[0]]['values'] = rows
				} 
			}
		},
		mounted() {
			if (Object.prototype.toString.call(this.columns[0]) !== '[object Object]') {
				this.currentColumns = [{values: this.columns}] 
			} else {
				this.currentColumns = this.columns
			}
		},
		components: {
			VmcPickerColumn
		},
		watch: {
			value() {
				this.showModel = this.value
			}
		}
		
	}
</script>

<style scoped lang="less">
	.vmc-picker{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		user-select: none;
    	background-color: #fff;
    	z-index: 2002;
    	.vmc-picker-toobar{
    		padding: 0.08rem 0;
    		overflow: hidden;
			.vmc-picker-cancel, .vmc-picker-confirm{
				flex: 0 0 0.62rem;
			}
			.vmc-picker-title{
				flex: 1;
			}
    	}
	}
</style>