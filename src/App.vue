<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-wraper"></router-view>
    </transition>
  </div>
</template>

<script>
import { setHtmlSize } from '@/libs/utils' 
export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide-right'
    }
  },
  mounted() {
    setHtmlSize()
  },
  components: {
  	
  },
  watch: {
　　　 '$route' (to, from) {
  　　　　 if(to.name === 'com_list') {
  　　　　　　　this.transitionName = 'slide-right'
  　　　　 } else {
  　　　　 　　this.transitionName = 'slide-left'
  　　　　 }
　　　　}
  } 
}
</script>

<style scoped lang="less">
.router-wraper {
     position: fixed;
     transition: all .2s cubic-bezier(0.4, 0.01, 0.165, 0.99);
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
}

.slide-left-enter,
.slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100% 0, 0);
}
</style>
