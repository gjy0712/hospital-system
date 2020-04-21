import Vue from 'vue'
import Vuex from 'vuex'
import { USER } from '@/config/webstore'
import permission from '@/vuex/permission'
import { getLocalStore } from '@/utils/webstore-utils'
import getters from './getters'

Vue.use(Vuex)

const state = {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    selectFile: '',
    // isLogin: false, //是否登录

    roles: null, // 用户权限 数组类型

    // 页面样式相关
    isCollapse: false // 侧边栏是展开还是收起
}

const mutations = {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
    },
    changeRoles(state, roles) {
        state.roles = roles
    },
    changeAsideStatus(state, isCollapse) {
        state.isCollapse = isCollapse
    }
}

const actions = {
    // 登出
    LogOut() {
        return new Promise((resolve, reject) => {
            localStorage.clear()
            sessionStorage.clear()
            // location.reload()
            resolve()
        })
    },
    SetRoles({ commit, state }) {
        return new Promise((resolve, reject) => {
            const userInfo = getLocalStore(USER)
            let roles = null
            if (userInfo) {
                let user = JSON.parse(userInfo)
                if(user.functionList){
                    roles = user.functionList
                }else {
                    localStorage.clear()
                }
            }
            commit('changeRoles', roles)
            resolve(roles)
        })
    }
}

export default new Vuex.Store({
    modules: {
        permission
    },
    state,
    actions,
    mutations,
    getters
})
