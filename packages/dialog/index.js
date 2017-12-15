import DialogComponent from './dialog'
import Vue from 'vue'
import utils from '../utils'
let dialogInstance
let defaultOptions = {
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
function getDialog(customerOptions) {
	const Instance = dialogInstance || new Vue({
		 render: h => {
		 	return h(DialogComponent, {})
		 }
	})
	const component = Instance.$mount();
	document.body.appendChild(component.$el);
	dialogInstance = Instance
	const dialog = Instance.$children[0];
	dialog.op = customerOptions
    dialog.show()
    return {
    	destory() {
    		document.body.removeChild(document.getElementsByClassName('vmc-dialog-wrapper')[0]);
    	}
    }
}

export default {
	confirm(options) {
		return getDialog(Object.assign(utils.clone(defaultOptions), options, {type: 'confirm'}))
	},
	tip(options) {
		return getDialog(Object.assign(utils.clone(defaultOptions), options, {type: 'tip'}))
	}
}