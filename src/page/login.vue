<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">医院预约挂号系统</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="login-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="账号">
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
    import {InfoMixins} from '@/components/mixins/publicMethods'

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
        mixins: [InfoMixins],
        methods: {
            ...mapMutations(['changeLogin']),
            async submitForm() {
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
                                let userInfo = {
                                    username: res.data.user.username,  // 账号
                                    password: this.loginForm.password,  // 密码
                                    id: res.data.user.id,   // id
                                    name: res.data.user.name,  // 名称
                                    email: res.data.user.email,  // 邮箱
                                    fee: res.data.user.fee,   // 出诊费
                                    sex: res.data.user.sex,   // 性别
                                    age: res.data.user.age,   // 年龄
                                    officeName: res.data.user.officeName,   // 科室名称
                                    career: res.data.user.career,   // 职位
                                    description: res.data.user.description,   // 职位
                                    picpath: res.data.user.picpath,   // 职位
                                    userType: this.loginForm.userType, // 类型
                                }
                                // 存储token和user
                                let token = res.data.token
                                setLocalStore(TOKEN, token)
                                setLocalStore(USER, userInfo)
                                // 成功
                                this.$notify({
                                    title: '成功',
                                    message: '登录成功！',
                                    type: "success"
                                });
                                if(this.loginForm.userType === 'PATIENT'){
                                    this.$router.push('/home');
                                }else if(this.loginForm.userType === 'ADMIN') {
                                    this.$router.push('/admin');
                                }else {
                                    this.$router.push('/doctor');
                                }

                            },
                            errorCallback: (err) => {
                                // 失败
                                this.$notify.error({
                                    title: '失败',
                                    message: err.data.msg
                                });
                            },
                        })

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