import axios from 'axios'
import {serviceURL} from '@/config/env'
import {TOKEN} from '@/config/webstore'
import {getLocalStore} from '@/utils/webstore-utils'
import router from '@/router'
import store from '@/vuex/store'
// import * as Sentry from '@sentry/browser';
import {Message} from "element-ui";

let baseAxios = axios.create({
    baseURL: serviceURL
})
baseAxios.interceptors.request.use(
    config => {

        let authToken = getLocalStore(TOKEN)
        if (authToken) {
            config.headers['Authorization'] = authToken
        }
        /*if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }*/
        let resourceID = router.currentRoute.meta.parent_id
        if (resourceID === 1) {
            resourceID = router.currentRoute.meta.id
        }
        if (resourceID) {
            config.headers['ResourceID'] = resourceID
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

baseAxios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status === 401) {
            store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        }
        /*
        if (process.env.NODE_ENV !== 'development') {
          Sentry.captureException(error) // sentry 集成
        }
        */
        return Promise.reject(error)
    }
)

export {baseAxios}
