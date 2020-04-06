export default {
    timeout: 60 * 1000, // 超时请求时间，单位：毫秒
    successStatusCode: 0,
    prefix: {
        dev: '/',
        test: '/',
        sim: '/',
        prod: '/'
    },
    suffix: {
        // 后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
        common: {
            // 公共接口
            login: '/user/login', // 登录
            register: '/user/register', // 注册
        },
        appCenter: {

        },
        operationCenter: {

        },
        analysisCenter: {

        },
        serviceCenter: {

        },
        securityCenter:{

        },
        configCenter: {

        },
        CMDB: {

        },
        systemManage: {

        }
    }
}
