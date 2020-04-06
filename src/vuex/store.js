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
    // --------------------------------------container相关
    /*parentprojectid: null, // 父项目id
    parentprojectname: null, // 父项目名
    projectid: null, // 当前项目id   项目详情中所用
    visParent: null, // 父项目头部是否可见
    parentisdisabled: null,
    currentenv: '',
    parentk8sname: '',
    parentprojectlist: [], // 父项目列表*/

    // --------------------------------------vm相关
    /*vmparentprojectlist: [], // vm父项目列表
    parentisvmdisabled: null,
    visVMParent: false, // 父项目头部是否可见
    vmparentprojectid: null, // VM父项目id
    vmparentprojectname: null, // VM父项目名*/

    // --------------------------------------application相关
    /*applicationid: null,
    applicationname: null,
    appisdisabled: null,
    VisibleApplication: null,
    applicationslist: [],*/

    // 页面样式相关
    isCollapse: false // 侧边栏是展开还是收起
}

const mutations = {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
    },
    /*	changeLogin(state, data) {
              state.isLogin = data;
          },*/
    changeParentProject(state, parentprojectid) {
        state.parentprojectid = parentprojectid
    },
    changeParentProjectName(state, parentprojectname) {
        state.parentprojectname = parentprojectname
    },
    changeProjectId(state, projectid) {
        state.projectid = projectid
    },
    changeVisParent(state, visParent) {
        state.visParent = Object.assign({}, visParent)
    },

    changeParentProjectList(state, parentprojectlist) {
        state.parentprojectlist = parentprojectlist
    },
    changeVMParentProjectList(state, vmparentprojectlist) {
        state.vmparentprojectlist = vmparentprojectlist
    },
    changeRoles(state, roles) {
        state.roles = roles
    },
    changeVisVMParent(state, visVMParent) {
        state.visVMParent = Object.assign({}, visVMParent)
    },
    changeVMParentPorjectId(state, id) {
        state.vmparentprojectid = id
    },
    changeVMParentProjectName(state, name) {
        state.vmparentprojectname = name
    },

    changeVMConfigPagerow(state, num) {
        state.vmconfigpagerows = num
    },
    changeVMConfigPageno(state, num) {
        state.vmconfigpageno = num
    },
    changeCurrentEnv(state, currentEnv) {
        state.currentenv = currentEnv
    },
    changeParentK8sName(state, parentK8sName) {
        state.parentk8sname = parentK8sName
    },
    changeISDisabled(state, isDisabled) {
        state.parentisdisabled = isDisabled
    },
    changeISVMDisabled(state, isDisabled) {
        state.parentisvmdisabled = isDisabled
    },
    changeSelectedFile(state, selectFile) {
        state.selectFile = selectFile
    },
    changeApplicationId(state, id) {
        state.applicationid = id
    },
    changeApplicationName(state, name) {
        state.applicationname = name
    },
    changeVisibleApplication(state, obj) {
        state.VisibleApplication = Object.assign({}, obj)
    },
    changeISAppDisabled(state, isDisabled) {
        state.appisdisabled = isDisabled
    },
    changeApplicationslist(state, applicationslist) {
        state.applicationslist = applicationslist
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
