
import Vue from 'vue'
import utils from '../utils'
import Toast from './toast'

const defaultOptions = {
	text: '成功提示',
	dealy: 2000
}

let toastInstance
function getToast(options) {
	const Instance = toastInstance || new Vue({
		 render: h => {
		 	return h(Toast, {})
		 }
	})
	console.log(Instance)
	const component = Instance.$mount();
	document.body.appendChild(component.$el);
	toastInstance = Instance
	const toast = Instance.$children[0];
	toast.op = options
	toast.initTimer()
	return {

	}
}

export default {
	success(options) {
		return getToast(Object.assign(utils.clone(defaultOptions), options, {type: 'success'}))
	}
}