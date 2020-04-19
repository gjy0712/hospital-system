<template>
    <div class="header-component">
        <el-header class="app-header header-bgcolor">
            <div class="header-box">
                <!-- 折叠按钮 -->
                <div class="collapse-btn" @click="changeAsideStatus">
                    <i v-if="!collapse" class="el-icon-s-fold"></i>
                    <i v-else class="el-icon-s-unfold"></i>
                </div>
                <div class="logo">医院预约挂号系统</div>
                <div class="header-right">
                    <div class="header-user-con">
                        <!-- 全屏显示 -->
                        <div class="btn-fullscreen" @click="handleFullScreen">
                            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                                <i class="el-icon-rank"></i>
                            </el-tooltip>
                        </div>
                        <!-- 消息中心 -->
                        <div class="btn-bell">
                            <el-tooltip
                                    effect="dark"
                                    :content="message?`有${message}条未读消息`:`消息中心`"
                                    placement="bottom"
                            >
                                <router-link to="/orderList">
                                    <i class="el-icon-bell"></i>
                                </router-link>
                            </el-tooltip>
                            <span class="btn-bell-badge" v-if="message"></span>
                        </div>
                        <!-- 用户头像 -->
                        <div class="user-avator">
                            <img src="../../../assets/img/patient_logo.png" alt="">
                        </div>
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{account}}
                                <i class="el-icon-caret-bottom"></i>
                            </span>
                            <el-dropdown-menu size="medium" slot="dropdown">
                                <el-dropdown-item command="help">
                                    <i class="el-icon-question"/>
                                    帮助
                                </el-dropdown-item>
                                <el-dropdown-item command="updatePassword">
                                    <i class="el-icon-lock"/>
                                    修改密码
                                </el-dropdown-item>
                                <el-dropdown-item divided command="loginOut">
                                    <i class="el-icon-switch-button"/>
                                    退出登录
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </el-header>
        <div class="user-info-box">
            <el-dialog
                    title="个人信息"
                    width="800px"
                    :visible.sync="dialogVisiable"
                    class="user-info"
            >
                <div class="info-content">
                    111111111111111111111111111111111111111111111jdncdjkncfdjk
                </div>
            </el-dialog>
        </div>
        <update-password-dialog ref="updatePassword_ref"></update-password-dialog>
    </div>
</template>

<script>
    import UpdatePasswordDialog from "./update-password-dialog";
    import bus from '../bus';
    import { USER } from '@/config/webstore'
    import { setSessionStore, getSessionStore, getLocalStore,removeLocalStore} from '@/utils/webstore-utils'
    import {TOKEN} from "../../../config/webstore";

    export default {
        name: "hospital-header",
        components: {UpdatePasswordDialog},
        data() {
            return {
                account: '',
                collapse: false,
                fullscreen: false,
                name: 'jinyan',
                message: 2,
                dialogVisiable: false,
            }
        },
        mounted() {
            let userObj = JSON.parse(getLocalStore(USER))
            // console.log(userObj)
            if (userObj) {
                // this.userType = userObj.userType
                this.account = userObj.account || this.name
            }
        },
        computed: {
            /*account() {
                let account = localStorage.getItem('USER');
                return account ? account : this.name;
            }*/
        },
        methods: {
            changeAsideStatus() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },

            // 点击全屏
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },

            // 退出登录
            handleCommand(index) {
                switch(index) {
                    case 'help':
                        this.$router.push('/home')
                        break
                    case 'updatePassword':
                        this.$refs['updatePassword_ref'].showDialog();
                        break
                    case 'loginOut':
                        //退出登录，清空token
                        removeLocalStore(TOKEN)
                        this.$router.push('/login');
                        /*localStorage.removeItem('ms_username');
                        this.$router.push('/login');*/
                        break
                    default:
                        break
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/variables";
    .header-component{
        .app-header {
            height: @headerHeight !important;
            padding: 0;
            position: fixed;
            width: 100%;
            z-index: 6;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);
        }

        .header-bgcolor {
            background-color: #242f42;
            color: #fff;
            font-size: 22px;
        }

        .header-box {
            height: 65px;
            .collapse-btn {
                float: left;
                padding: 0 21px;
                cursor: pointer;
                line-height: 70px;
            }

            .logo {
                float: left;
                width: 250px;
                line-height: 70px;
            }

            .header-right {
                float: right;
                padding-right: 50px;

                .header-user-con {
                    display: flex;
                    height: 70px;
                    align-items: center;

                    .btn-fullscreen {
                        transform: rotate(45deg);
                        margin-right: 5px;
                        font-size: 24px;
                    }

                    .btn-bell,
                    .btn-fullscreen {
                        position: relative;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        border-radius: 15px;
                        cursor: pointer;

                        .btn-bell-badge {
                            position: absolute;
                            right: 0;
                            top: -2px;
                            width: 8px;
                            height: 8px;
                            border-radius: 4px;
                            background: #f56c6c;
                            color: #fff;
                        }
                    }
                }
            }

            .btn-bell .el-icon-bell {
                color: #fff;
            }
            .user-name {
                margin-left: 10px;
            }
            .user-avator {
                margin-left: 20px;
            }
            .user-avator img {
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .el-dropdown-link {
                color: #fff;
                cursor: pointer;
            }
            .el-dropdown-menu__item {
                text-align: center;
            }
        }

        .user-info-box {
            .user-info {
                .el-dialog__header {
                    padding: 15px 20px;
                    border-bottom: 1px solid rgba(241, 241, 241, 1);
                }

                .el-dialog__body {
                    padding: 0;
                    overflow: hidden;

                    .info-content {
                        padding: 63px 108px 0;
                        font-size: 14px;
                        font-family: "PingFang SC";
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        line-height: 22px;
                    }
                }
            }
        }

    }
</style>