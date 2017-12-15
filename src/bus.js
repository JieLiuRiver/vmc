import Vue from 'vue';

export default new Vue({
	data() {
		return {
			demoList: [
				{
					typeid: 1,
					typename: '基础组件',
					groupVisibity: false,
					comlist: [
						{
							name: '布局',
							routename: 'demo-layout'
						}
					]
				},
				{
					typeid: 2,
					typename: '操作反馈',
					groupVisibity: false,
					comlist: [
						{
							name: 'Actionsheet - 行动按钮',
							routename: 'demo-actionsheet'
						},
						{
							name: 'Dialog - 弹出框',
							routename: 'demo-dialog'
						},
						{
							name: 'Picker - 选择器',
							routename: 'demo-picker'
						},
						{
							name: 'PullRefresh - 下拉刷新',
							routename: 'demo-pull-refresh'
						},
						{
							name: 'Toast - 轻提示',
							routename: 'demo-toast'
						}
					]
				}
			]
		}
	}
})