import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
  		redirect: {name: 'com_list'}
  	},
  	{
  		path: '/com_list',
  		name: 'com_list',
  		component: resolve => require(['@/components/ComList'], resolve)
  	},
    {
      path: '/demo-actionsheet',
      name: 'demo-actionsheet',
      component: resolve => require(['@/components/DemoActionsheet'], resolve)
    },
    {
      path: '/demo-layout',
      name: 'demo-layout',
      component: resolve => require(['@/components/DemoLayout'], resolve)
    },
    {
      path: '/demo-dialog',
      name: 'demo-dialog',
      component: resolve => require(['@/components/DemoDialog'], resolve)
    },
    {
      path: '/demo-picker',
      name: 'demo-picker',
      component: resolve => require(['@/components/DemoPicker'], resolve)
    },
    {
      path: '/demo-pull-refresh',
      name: 'demo-pull-refresh',
      component: resolve => require(['@/components/DemoPullRefresh'], resolve)
    },
    {
      path: '/demo-toast',
      name: 'demo-toast',
      component: resolve => require(['@/components/DemoToast'], resolve)
    }
  ]
})
