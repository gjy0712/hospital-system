import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// import Mock from './mock'; // 引入mock模块
import ElementUI from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
// Mock.start(); //并且执行初始化函数

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
