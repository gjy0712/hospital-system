import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// import Mock from './mock'; // 引入mock模块
import ElementUI from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios' ;
import Vuex from 'vuex' //引入状态管理
Vue.prototype.$axios= axios ;
Vue.use(Vuex) ;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
// Mock.start(); //并且执行初始化函数
//这里要导入store
// import store from "./vuex/store";
import store from '@/vuex/store'


/*// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });*/

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
