import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const defaultRouterMap = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/admin',
        redirect: '/admin/info'
    },
    {
        path: '/doctor',
        redirect: '/doctor/myWork'
    },
    {
        path: '/login',
        component: () => import('../page/login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        component: () => import('../page/register.vue'),
        meta: { title: '注册'}
    },

    // 患者模块
    {
        path: '/',
        component: () => import('../components/component/patient/patient-home.vue'),
        meta: { title: '患者模块内容'},
        children: [
            {
                path: '/home',
                component: () => import('../page/patient/home.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/searchOffice',
                component: () => import('../page/patient/search-office.vue'),
                meta: { title: '按科室挂号' }
            },
            {
                path: '/searchDoctor',
                component: () => import('../page/patient/search-doctor.vue'),
                meta: { title: '按医生挂号' }
            },
            {
                path: '/orderList',
                component: () => import('../page/patient/order-list.vue'),
                meta: { title: '我的预约' }
            },
            {
                path: '/article',
                component: () => import('../page/patient/article-list'),
                meta: { title: '健康必读'}
            },
            {
                path: '/evaluation',
                component: () => import('../page/patient/evaluation-system.vue'),
                meta: { title: '评价系统' }
            },
        ]
    },

    // 管理员模块
    {
        path: '/admin',
        component: () => import('../components/component/admin/admin-home'),
        meta: { title: '管理员模块内容'},
        children: [
            {
                path: '/admin/info',
                component: () => import('../page/admin/info'),
                meta: { title: '基本信息' }
            },
            {
                path: '/admin/doctorManage',
                component: () => import('../page/admin/doctor-manage'),
                meta: { title: '医生信息管理' }
            },
            {
                path: '/admin/patientManage',
                component: () => import('../page/admin/patient-manage'),
                meta: { title: '患者信息管理' }
            },
            {
                path: '/admin/office',
                component: () => import('../page/admin/office'),
                meta: { title: '科室信息管理' }
            },
            {
                path: '/admin/applyManage',
                component: () => import('../page/admin/apply-manage'),
                meta: { title: '排班信息管理' }
            },
        ]
    },

    // 医生模块
    {
        path: '/doctor',
        component: () => import('../components/component/doctor/doctor-home'),
        meta: { title: '医生模块内容'},
        children: [
            {
                path: '/doctor/myWork',
                component: () => import('../page/doctor/my-work'),
                meta: { title: '排班信息' }
            },
            {
                path: '/doctor/myApply',
                component: () => import('../page/doctor/my-apply'),
                meta: { title: '我的申请' }
            },
            {
                path: '/doctor/patientList',
                component: () => import('../page/doctor/patient-list'),
                meta: { title: '患者队列' }
            },
            {
                path: '/doctor/myInfo',
                component: () => import('../page/doctor/my-info'),
                meta: { title: '我的信息' }
            }
        ]
    },
]

const router = new Router({
    routes: defaultRouterMap
})

export default router