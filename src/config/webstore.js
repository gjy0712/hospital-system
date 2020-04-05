/**
 * localstore 存储
 */

const CONNEXT_PAAS_USER = 'connextpaasuser' // 用户对象包含 用户名 用户类型

const CLUSTER_ID = 'clusterid' // 集群id
const CLUSTER_STATUS = 'clusterstatus' // 集群状态
const CONNEXT_PAAS_TOKEN = 'connextpaastoken'
let LAGU = 'zh' // 语言

/**
 * sessionstore 存储
 */

const CONNEXT_PAAS_PROJECTID = 'projectid' // 项目列表和项目详情中的项目id
const VM_PAAS_PROJECTID = 'vmprojectid' // VM项目列表和项目详情中的项目id

const PARENT_PROJECT_ID = 'parentprojectid' // 父项目的id
const CONNEXT_PAAS_RELEASETYPE = 'projectreleasetype'

// const CURRENT_ENV = 'projectcurrentenv'    //  已废弃
// const PARENT_PROJECT_NAME = 'parentprojectname';   //  已废弃

const VM_PARENT_PROJECT_ID = 'vmparentprojectname' // vm父项目id
const VM_PARENT_PROJECT_NAME = 'vmprojectreleasetype' // vm父项目名称
const APPLICATION_ID = 'applicationidcon'
const APPLICATION_NAME = 'applicationnamecon'

const BILL_URL = 'connext_bill_url'

const SYS_VER = 'sys_ver'


export {
    CONNEXT_PAAS_TOKEN,
    CONNEXT_PAAS_USER,
    CLUSTER_ID,
    CLUSTER_STATUS,
    CONNEXT_PAAS_PROJECTID,
    PARENT_PROJECT_ID,
    CONNEXT_PAAS_RELEASETYPE,
    LAGU,
    VM_PARENT_PROJECT_NAME,
    VM_PARENT_PROJECT_ID,
    VM_PAAS_PROJECTID,
    APPLICATION_ID,
    APPLICATION_NAME,
    BILL_URL,
    SYS_VER
}
