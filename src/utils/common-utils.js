import apiDataFilter from '@/utils/apiDataFilter'
import {baseAxios} from '@/config/axios-instance'
import RouterConfig from '@/routerConfigs'
import lodash from 'lodash'
/**
 * 获取路由名称
 * @key: 路由的key
 * @return: 路由名称
 * */
export const getRoute = (key) => {
    return  lodash.get(RouterConfig,key, '/')
}


/**
 * 根据key进行数组去重
 * @arr: 需要去重的数组
 * @key: 根据key进行去重
 * @return:
 * */
export const uniqueArray = (arr, key) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[key]) && res.set(item[key] , 1))
}

/**
 * 通过属性获取
 * @type: 类型
 * @return: 枚举列表
 * */
export const getObjWithProperty = (list=[],property,propertyValue) => {
    if (list.length){
        return list.find(item=>{
            return item[property] === propertyValue
        })
    }
}

export function handleSearchData(searchObj) {
    const param = {}
    for (const key in searchObj) {
        if ((typeof (searchObj[key]) === 'string' && searchObj[key]) || typeof (searchObj[key]) != 'string') {
            const obj = {}
            obj[key] = searchObj[key]
            Object.assign(param, obj)
        }
    }
    return param
}

/**
 * 通过类型获取枚举
 * @type: 类型
 * @return: 枚举列表
 * */
export async function getEnumForType(type) {
    let param = {enum_key: type}
    let response =await baseAxios.get('/api/v1/enum/getenum',{
        params: param
    })
    return response.data.data[type].data
}


/**
 * 流中数据转化为文件
 * @data: 流数据
 * @fileName: 文件名称
 * */
export function download(data, fileName) {
    if (!data) {
        Message({
            message: "下载失败！",
            type: "error"
        });
        return;
    }
    if (window.navigator.msSaveBlob) {
        // for ie 10 and later
        try {
            /* let blob = new Blob([data.data], {type: "application/vnd.ms-excel"});*/
            let blob = new Blob([data.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            window.navigator.msSaveBlob(blob, `${data.headers['content-disposition']  ? data.headers['content-disposition'].replace("attachment;filename=","") :'报表.xls' }`);
        }
        catch (e) {
            console.log(e);
        }
    } else {
        //let blob = new Blob([data], {type: "application/vnd.ms-excel"});
        let blob = new Blob([data.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        let url = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        // console.log(data)
        link.setAttribute('download', `${data.headers['content-disposition']  ? data.headers['content-disposition'].replace("attachment;filename=","") : '报表.xls'}`);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
    }
}

/**
 *
 * 生成uuid
 * @return: 唯一的uuid
 * */
export  function generateUUID() {
    let d = new Date().getTime()
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return uuid
}


/**
 * 根据字段名称判断数组中数据是否唯一
 * @arr: 对象数组
 * @fieldName: 对象中的字段
 * */
export  function isUniqueFieldName(arr, fieldName) {
    let shouldUnique = false
    for (let i = 0; i < arr.length; i++) {
        if (arr.filter(item => {
            return item[fieldName] === arr[i][fieldName]
        }).length > 1) {
            shouldUnique = true
            break;
        }
    }
    return shouldUnique;
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
export function dataType(obj){
    if (obj===null) return "Null";
    if (obj===undefined) return "Undefined";
    return Object.prototype.toString.call(obj).slice(8,-1);
}

/**
 * 处理对象参数值，排除对象参数值为”“、null、undefined，并返回一个新对象
 * @obj:
 * */
export function dealObjectValue(obj){
    let param = {};
    if ( obj === null || obj === undefined || obj === "" ) return param;
    for ( var key in obj ){
        if ( dataType(obj[key]) === "Object" ){
            param[key] = dealObjectValue(obj[key]);
        }else if(  obj[key] !== null && obj[key] !== undefined && obj[key] !== ""  ){
            param[key] = obj[key];
        }
    }
    return param;
}

/**
 *获取前端的配置
 * */
export const getWebConfig = callBack => {
    apiDataFilter.request({
        apiPath: 'common.getWebConfig',
        successCallback: res => {
            let result = JSON.parse(res.data)
            callBack(result)
        }
    })
}


/*暂时废弃*/
export const getUrlRelativePath = url => {
    let arrUrl = url.split('//')
    let start
    let relUrl
    if (arrUrl[1]) {
        start = arrUrl[1].indexOf('/')
        relUrl = arrUrl[1].substring(start) // stop省略，截取从start开始到结尾的所有字符
    } else {
        start = arrUrl[0].indexOf('/')
        relUrl = arrUrl[0].substring(start) // stop省略，截取从start开始到结尾的所有字符
    }

    if (relUrl.indexOf('?') != -1) {
        relUrl = relUrl.split('?')[0]
    }
    return relUrl
}


// 获取当前环境的主机和端口号
export const getEnvOrigin = () => {
    return window.location.origin
}


export const getRem = (pwidth, prem) => {
    // ---pwidth---UI图的宽度
    // ---prem--自己设置的换算比例
    // 获取html元素
    let html = document.getElementsByTagName('html')[0]
    // 屏幕的宽度（兼容处理）
    let ScreenWidth =
        document.body.clientWidth || document.documentElement.clientWidth
    html.style.fontSize = (ScreenWidth / pwidth) * prem + 'px'
}
