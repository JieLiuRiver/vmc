<template>
	<div>
		<!-- <div class="test-touch vmc-1px vmc-absolute">测试阶段</div>

		<div class="wrap" style="height: 300px;overflow: hidden;">
			<div>
				<div v-for="(item, i) in 40">深圳 {{i+1}}</div>
				
			</div>
		</div> -->
		<div class="vmc-flex vmc-flex-rstart" style="margin-top: 20px;padding-left: 20px;">
			<router-link class="vmc-block btn-sm" to="/">返回</router-link>
		</div>
		<div class="vmc-flex vmc-flex-center vmc-flex-column" :style="containerStyles()">
			<a class="vmc-block btn-sm btn-long" href="javascript:;" @click="showPickerB" style="margin-top: 20px;">选择器</a>	
			<p>{{pickerResult}}</p>
		</div>
		
		<vmc-picker 
			v-model="picker2"
			:columns="columnsB" 
			:showToolbar="true" 
			title="类型选择" 
			:itemHeight="36"
			:visibileColumnCount="6"
			@change="onChange"
			@sure="onSure"
			@cancel="onCancel"
			valueKey="city">
		</vmc-picker>

	</div>
</template>

<script>
	const citys = {
	  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
	  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
	}
	export default {
		data() {
			return {
				pickerResult: '',
				picker2: false,
				columnsB:  [{
		          	values: Object.keys(citys)
		        },{
		          values: citys['浙江'],
		          defaultIndex: 2
		        }]
			}
		},
		methods: {
			onSure(picker, values) {
				console.log(picker, values)
				this.pickerResult = JSON.stringify(values)
				this.picker2 = false
			},
			onCancel(picker, values) {
				this.picker2 = false
			},
			onChange(picker, column, value, index) {
					if (column.currentOptions.includes(Object.keys(citys)[0])) {
						picker.setColumnValues(1, citys[value])
					}
					// picker.setColumnValues(, ['广东', '湖北'])

			    	// console.log(picker, value, index)
				    // console.log('获取所有列选中的值:', picker.getValues())

				    //console.log('设置所有列选中的值:', picker.setValues(['福建', '三明']))

				   	// 设置福建厦门
				    // console.log('设置所有列选中值对应的索引:', picker.setIndexes([1, 1]))

				    // console.log('获取对应列中所有选项:', picker.getColumnValues(0))

				    // console.log('获取对应列中所有选项:', picker.setColumnValues(0, ['广东', '湖北']), picker.setColumnValues(1, ['A', 'B', 'C', 'D']))
				    // this.columnsB[0].values = ['广东', '湖北']
			},
			containerStyles() {
				return { height:  document.documentElement.clientHeight * 0.8 + 'px'}
			},
			showPickerA() {
				this.picker2 = false
				this.picker1 = true
			},
			showPickerB(){
				this.picker1 = false
				this.picker2 = true
			}
		},
		mounted() {
			/*
			const touch = utils.MTouch('.test-touch')
			touch.tap((d) => {
				console.log('tap', d)
			})
			touch.swipe((d) => {
				console.log('swipe', d)
			})
			touch.swipeLeft((d) => {
				console.log('swipeLeft', d)
			})
			utils.mScroll(document.querySelector('.wrap'), {
				start() {
					console.log('start')
				},
				in() {
					console.log('in')
				},
				end() {
					console.log('end')	
				},
				over() {
					console.log('over')
				}
			})*/
		}
	}
</script>


<style scoped lang="less">
	.test-touch{
		padding: 0.08rem 0.3rem;
	}
</style>