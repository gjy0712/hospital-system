export default {
    timeout: 60 * 1000, // 超时请求时间，单位：毫秒
    successStatusCode: 1,
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
        // 医生管理
        doctor: {
            getRecommendDoctor: '/doctor/getRecommendDoctor', //获取推荐医生信息
            getDoctor: '/doctor/getDoctor', // 获取医生信息
        },
        // 科室管理
        office: {
            getOfficeList: '/office/getOfficeList',   // 获取科室列表
            getOfficeDetailList: '/office/getOfficeDetailList', // 获取科室详情列表
        },
        // 工作日
        workday: {
            getWorkDay: '/workday/getWorkDay', //医生工作日

        },
        // 预约记录
        record: {
            insertRecord: '/record/insertRecord', // 患者新增预约记录
            getRecordList: '/record/getRecordList', // 分页获取患者预约记录
        }

    }
}
