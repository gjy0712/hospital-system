import Vue from 'vue'
import Router from 'vue-router'
import { TOKEN } from '@/config/webstore'
import { getLocalStore } from '@/utils/webstore-utils'

Vue.use(Router)

export const defaultRouterMap = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/admin',
        redirect: '/admin/doctorManage'
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
        path: '/home',
        component: () => import('../components/component/patient/patient-home.vue'),
        meta: { title: '患者模块内容'},
        children: [
            {
                path: '/home',
                component: () => import('../page/patient/home.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/userInfo',
                component: () => import('../page/patient/user-info.vue'),
                meta: { title: '个人信息' }
            },
            {
                path: '/searchOffice',
                component: () => import('../page/patient/search-office.vue'),
                meta: { title: '按科室挂号' },
            },
            {
                path: '/searchOfficeDetail',
                component: () => import('../page/patient/search-office-detail.vue'),
                meta: {
                    title: '科室详情信息' ,
                    IsActive: true,
                }
            },
            {
                path: '/registration',
                component: () => import('../page/patient/registration-info'),
                meta: { title: '患者挂号' }
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
                path: '/admin/registrationManagement',
                component: () => import('../page/admin/registration-management'),
                meta: { title: '医生排班申请管理' }
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
                meta: { title: '排班申请管理' }
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

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = getLocalStore(TOKEN)
        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router