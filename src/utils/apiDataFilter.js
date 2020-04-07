import {baseAxios as axios} from '../config/axios-instance'
// import  axios from 'axios'
import apiConf from '@/apiConfigs/api'
import { TOKEN } from '@/config/webstore'
import { getLocalStore } from '@/utils/webstore-utils'
import router from '@/router'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
import store from '@/vuex/store'


/* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
apiDataFilter的定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */

let apiDataFilter = {
    /* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        请求数据 , successCallback的唯一参数为：response，返回的json数据应该这样取得：response.data
        @method : get | post |
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
    request({apiPath, data = {}, pathParams = [], method = 'get', contentType = 'application/json', blob = false,successCallback, errorCallback,completeCallback = () => {}}) {
        let apiUrl = this.pathParamsToUrl(apiPath, pathParams)
        let Authorization = getLocalStore(TOKEN)
        method = method.toLowerCase()
        let opts = {
            timeout: apiConf.timeout,
            headers: {
                Authorization: Authorization
            }
        }
        if (method === 'post') {
            if (contentType) opts.headers['content-type'] = contentType
            if (blob)  opts['responseType'] = 'blob';
        } else if (method === 'get' || method === 'delete') {
            opts.params = data
        }
        /* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                不是生产环境在控制台输出请求log
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
        if (this.getEnv() !== 'prod') {
            /* console.log('http请求(' + apiUrl + ')后端接口数据(' + method + ')：' + JSON.stringify(data))*/
        }
        /* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                发起请求
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
        errorCallback = errorCallback || this.errorCallback
        if (method === 'get' || method === 'delete' ) {
            axios[method](apiUrl, opts).then(res => {
                if (parseInt(res.data.code, 10) === apiConf.successStatusCode) {
                    successCallback(res.data)
                } else {
                    errorCallback(res)
                }
                completeCallback()
            },
            res => {
                errorCallback(res.response)
                completeCallback()
            })
        }else {
            axios[method](apiUrl, data, opts).then(res => {
                    if (blob){
                        successCallback(res)
                    } else {
                        if (parseInt(res.data.code, 10) === apiConf.successStatusCode) {
                            successCallback(res.data)
                        } else {
                            errorCallback(res)
                        }
                    }
                    completeCallback()
                },
                res => {
                    errorCallback(res.response)
                    completeCallback()
                }
            )
        }
    },
    /* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        通过域名来获取当前阶段环境
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
    getEnv() {
        let env = 'dev'
        let domain = document.domain
        switch (domain) {
            case 'www.example.mobi':
                env = 'login.js'
                break
            case 'www.sim.mobi':
                env = 'sim'
                break
            case 'www.example.com':
                env = 'prod'
                break
            default:
                env = 'dev'
                break
        }
        return env
    },
    /* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        请求错误处理方法
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
    errorCallback(res, arg) {
        if (res.status !== 401) {
            Message.error(
                (typeof res.data.error === 'string' && res.data.error) ||
                '网络错误，请重试^_^'
            )
        }

    },
    /* ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        根据apiPath返回apiUrl
        @apiPath：从api配置中suffix往下层写如："example.rent.detail"
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
    pathToUrl(apiPath) {
        let pathArray = apiPath.split('.')
        // let prefix = apiConf.prefix[this.getEnv()]
        let suffix = apiConf.suffix
        for (let n = 0; n < pathArray.length; n++) {
            suffix = suffix[pathArray[n]]
        }
        if (suffix === undefined) suffix = ''
        return suffix
    },

    /** ++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     拼接路径参数 返回路径
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++ */
    pathParamsToUrl(apiPath, pathParams) {
        let path = this.pathToUrl(apiPath)
        if (pathParams && pathParams.length > 0) {
            pathParams.forEach((item, index) => {
                path += `/${item}`
            })
        }
        return path
    }
}

export default apiDataFilter
