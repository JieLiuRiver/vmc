
import Actionsheet from './actionsheet';
import Dialog from './dialog/index.js';
import Toast from './toast/index.js';
import Picker from './picker';
import PullRefresh from './pull-refresh'

const VMC_KEY = 'vmc'
const vmc = {
	[VMC_KEY + 'Actionsheet']: Actionsheet,
	[VMC_KEY + 'Dialog']: Dialog,
	[VMC_KEY + 'Picker']: Picker,
	[VMC_KEY + 'PullRefresh']: PullRefresh
}

const install = function (Vue, opts = {}) {
    Object.keys(vmc).forEach((key) => {
        Vue.component(key, vmc[key]);
        Vue.prototype.$Dialog = Dialog;
        Vue.prototype.$Toast = Toast;
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign(vmc, {install})
