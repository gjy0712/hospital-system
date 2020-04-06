<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">医院预约挂号系统</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="login-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="密码"
                            v-model="loginForm.password"
                            @keyup.enter.native="submitForm('loginForm')"
                    >
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="我是：" label-width="80px">
                    <el-radio-group v-model="loginForm.userType">
                        <el-radio label="PATIENT">患者</el-radio>
                        <el-radio label="DOCTOR">医生</el-radio>
                        <el-radio label="ADMIN">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="login-btn">
                    <el-button type="primary"
                               :disabled="!(loginForm.username && loginForm.password)"
                               @click="submitForm('loginForm')">
                        登录
                    </el-button>
                </el-form-item>
                <el-button type="text" class="login-tips" @click="handleRegister()">没有账号，去注册>></el-button>
            </el-form>

        </div>
    </div>
</template>

<script>
    import apiDataFilter from "../utils/apiDataFilter";
    import {mapMutations} from "vuex";
    import { getLocalStore, setLocalStore } from '@/utils/webstore-utils.js'
    import { USER, TOKEN } from '@/config/webstore'

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                    userType: 'PATIENT'
                },
                userToken:'',
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            submitForm() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        apiDataFilter.request({
                            apiPath: 'common.login',
                            method: 'post',
                            data: {
                                username: this.loginForm.username,
                                password: this.loginForm.password,
                                userType: this.loginForm.userType,
                            },
                            successCallback: (res) => {
                                console.log(res.data);
                                let userInfo = {
                                    userName: this.loginForm.username,
                                    userType: this.loginForm.userType,
                                    // functionList: res.data.func_list,
                                    // logoURL: this.logoURL
                                }
                                setLocalStore(TOKEN, res.data)
                                setLocalStore(USER, userInfo)

                                // this.$router.push('/');

                                this.userToken = res.data.token;
                                // 将用户token保存到vuex中
                                this.changeLogin({ Authorization:this.userToken });
                                this.$message.success('登录成功');
                                this.$router.push('/');

                                /*if (res.data.pwd_need_change) {
                                    this.notFirstLogin = false
                                    this.$refs['updatePasswordDialog_ref'].showDialog(true)
                                } else {
                                    this.$router.push('/')
                                }*/
                            },
                            errorCallback: (err) => {
                                // this.$message.error(err.data.error)
                            },
                        })
                        /*this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.loginForm.username);
                        this.$router.push('/');*/
                    } else {
                        this.$message.error('请输入账号和密码');
                        return false;
                    }
                });
            },
            handleRegister() {
                this.$router.push('/register')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/mixins/flex";
    @import "../style/variables";

    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: @main-color url(../assets/img/login-bg3.jpg) no-repeat fixed 50% 50% ;
        background-size: 100% 100%;
        .flex();
        .align-items(center);
        .justify-content(center);

        .login-box {
            width: 400px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.12);
            overflow: hidden;

            .login-title {
                width: 100%;
                line-height: 50px;
                text-align: center;
                font-size: 20px;
                color: #000;
                border-bottom: 1px solid #ddd;
            }

            .login-content {
                padding: 30px 30px;

                .el-form-item:nth-child(2), .el-form-item:nth-child(3) {
                    margin-bottom: 10px;
                }

                .el-form-item:nth-child(4) {
                    margin-bottom: 0;
                }
                .login-btn {
                    text-align: center;
                }

                .login-btn button {
                    width: 100%;
                    height: 36px;
                    margin-bottom: 3px;
                }

                .login-tips {
                    font-size: 10px;
                    color: #000;
                    float: right;
                    margin-bottom: 10px;
                }
                .login-tips:hover {
                    color: #409eff;
                }
            }
        }
    }
</style>