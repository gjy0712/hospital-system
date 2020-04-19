<template>
    <div class="user-info-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>个人基本信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <div class="user-content">
            <div class="content-box">
                <div class="avatar-image">
                    <img src="../../assets/img/userImg.png" alt="" width="100px" height="100px">
                </div>
                <div class="info-box">
                    <span class="name-box">{{userInfo.name}}</span>
                    <!--<el-button class="add" size="small" type="primary" plain icon="el-icon-edit"
                               @click="handleClickEditUserInfo">
                        编辑信息
                    </el-button>-->
                    <div class="username-box">
                        <span class="user-name">账号ID：{{userInfo.username}}</span>
                        <span class="user-name position-type">身份：{{userInfo.userType}}</span>
                    </div>
                </div>

                <div class="description-box">
                    <p class="color-style">性别：{{userInfo.sex}}</p>
                    <p class="color-style">邮箱：{{userInfo.email}}</p>
                    <p class="color-style">介绍自己：您一定会康复的！</p>
                    <p class="color-style">居住地址：上海市闵行区！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'
    import {getLocalStore} from "../../utils/webstore-utils";
    import { USER } from '@/config/webstore'

    export default {
        name: "user-info",
        components: {
            PageHeader
        },
        created() {
        },
        data () {
            return {
                userInfo: {
                    name: '', // 名称
                    username: '', // username
                    userType: '',
                    sex: '男',
                    email: ''
                },

            }
        },
        mounted() {
            let userObj = JSON.parse(getLocalStore(USER))
            if (userObj) {
                this.userInfo.name = userObj.name
                this.userInfo.username = userObj.username
                this.userInfo.email = userObj.email
                if(userObj.userType === 'PATIENT'){
                    this.userInfo.userType = '患者'
                }else if(userObj.userType === 'ADMIN') {
                    this.userInfo.userType = '管理员'
                }else {
                    this.userInfo.userType = '医生'
                }
            }
        },
        methods: {
            // 编辑信息
            handleClickEditUserInfo() {

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";
    .user-info-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .user-content {
            padding: 20px;
            .content-box {
                margin-top: 25px;
                .avatar-image {
                    display: inline-block;
                    margin: 0 150px 0 70px;
                }
                .info-box {
                    height: 100px;
                    line-height: 55px;
                    display: inline-block;
                    vertical-align: top;

                    .name-box {
                        font-weight: bolder;
                        color: #323232;
                    }
                    .add {
                        margin-left: 100px;
                    }

                    .username-box {
                        font-size: 14px;
                        color: #5e5e5e;
                        position: relative;
                        .user-name {

                        }
                        .position-type {
                            display: inline-block;
                            position: absolute;
                            left: 125px;
                            width: 123px;
                        }
                    }
                 }

                .description-box {
                    margin-left: 320px;
                    margin-top: 30px;
                    line-height: 60px;

                    .color-style {
                        font-weight: bolder;
                        color: #323232;
                    }
                }
            }
        }
    }

</style>