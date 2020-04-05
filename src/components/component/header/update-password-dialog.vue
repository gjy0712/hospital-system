<template>
    <el-dialog title="修改密码"
               :visible.sync="dialogUpdatePassword"
               :top="isLogin?'20vh':'15vh'"
               :modal="!isLogin"
               :show-close="!isLogin"
               class="update-password-component el-dialog-style-reset"
               :close-on-click-modal="false"
               width="675px"
               :center="isLogin"
               @close="handleCancel()">
        <div class="pop-box">
            <el-form :model="formData"
                     :rules="formRules"
                     ref="dataForm_ref"
                     label-width="140px"
                     class="form-box"
                     :validate-on-rule-change="false">
                <el-form-item label="旧密码：" prop="oldPassword">
                    <el-input size="medium" v-model.trim="formData.oldPassword" show-password placeholder="请输入您的旧密码..."></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <span slot="label">新密码
                     <el-tooltip placement="top" :content="pswHelp">
                           <div slot="content" v-html="pswHelp"></div>
                        <i tabindex="-1" class="el-icon-warning-outline"/>
                     </el-tooltip>：
                    </span>
                    <el-input size="medium" v-model.trim="formData.newPassword" show-password placeholder="请输入您的新密码..."></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="checkPassword">
                    <el-input size="medium" v-model.trim="formData.checkPassword" show-password placeholder="请再次确认您的新密码..."></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
                  <el-button class="custom-button_long" @click="handleCancel()">取消</el-button>
                  <el-button class="custom-button_long"
                             :loading="optionsLoading"
                             type="primary"
                             @click="handleSubmit()">确定</el-button>
            <div class="info-password" v-if="isLogin"><i class="el-icon-warning"></i>{{updatePswHelp}}</div>
        </span>
    </el-dialog>
</template>

<script>
   /* import apiDataFilter from "../../../utils/apiDataFilter";
    import {getLocalStore} from "../../../utils/webstore-utils";
    import {CONNEXT_PAAS_USER} from "../../../config/webstore";
    import store from '@/vuex/store'*/

    export default {
        name: 'UpdatePasswordDialog',
        computed: {
            formRules() {
                return {
                    oldPassword: [{required: true, message: "请输入你的旧密码", trigger: 'blur'},
                        {min: 1, max: 16, message: "长度不得超过16个字符", trigger: 'blur'}],
                    newPassword:[{required: true, message: "请输入你的新密码", trigger: 'blur'},
                        {validator: this.newPasswordValidator, trigger: 'blur'}],
                    checkPassword:[{required: true, message: "请再次输入你的新密码", trigger: 'blur'}, { validator:  this.checkPasswordValidator, trigger: 'blur' }],
                }
            }
        },
        data() {
            return {
                dialogUpdatePassword: false,
                formData: {
                    oldPassword: '',
                    newPassword:'',
                    checkPassword:''
                },
                pswHelp:'1.密码必须满足字母、数字、特殊字符中的两个条件。<br>2.长度必须为8-16个字符。<br>3.特殊字符仅包括 \'!@#$%^&*\'。',
                isLogin:true,
                optionsLoading: false,
                updatePswHelp:'您必须修改密码后才能登录系统，请修改密码!',
            }
        },
        methods: {
            checkPasswordValidator(rule, value, callback){
                if (value !== this.formData.newPassword) {
                    callback(new Error("两次输入密码不一致"));
                } else {
                    callback();
                }
            },
            newPasswordValidator(rule, value, callback) {
                if (/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,16}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error("密码格式错误！"))
                }
            },
            /*取消修改*/
            handleCancel() {
                this.$refs['dataForm_ref'].clearValidate()
                this.formData = {
                    oldPassword: '',
                    newPassword:'',
                    checkPassword:''
                }
                this.dialogUpdatePassword = false
                if (this.isLogin){
                    this.$emit('showLogin')
                }
            },
            /*确定新增或修改字段信息*/
            handleSubmit() {
                this.$refs['dataForm_ref'].validate(valid => {
                    /*if (valid) {
                        this.optionsLoading = true
                        let userInfo = JSON.parse(getLocalStore(CONNEXT_PAAS_USER))
                        apiDataFilter.request({
                            apiPath: 'common.updatePassword',
                            method:'post',
                            data: {
                                user_type:userInfo.userType,
                                user_name:userInfo.userName,
                                passwd:this.formData.oldPassword,
                                new_passwd:this.formData.newPassword
                            },
                            successCallback: (res) => {
                                this.$message.success('密码修改成功，请重新登录！')
                                store.dispatch('LogOut').then(() => {
                                    location.reload() // 为了重新实例化vue-router对象 避免bug
                                })
                                /!*if (this.isLogin){
                                    this.$message.success('密码修改成功，请重新登录！')
                                    store.dispatch('LogOut').then(() => {
                                        location.reload() // 为了重新实例化vue-router对象 避免bug
                                    })
                                } else {
                                    this.handleCancel()
                                }*!/
                            },
                            errorCallback: (err) => {
                                this.$message.error(err.data.error)
                            },
                            completeCallback: () => {
                                this.optionsLoading = false
                            }
                        })
                    }*/
                })
            },
            showDialog(isLogin = false){
                this.isLogin = isLogin
                this.dialogUpdatePassword = true
            },
        },
    }
</script>

<style scoped lang='less'>
    @import "../../../style/variables";

    .update-password-component {
        .pop-box {
            .form-box {
                .el-icon-warning-outline{
                    cursor: pointer;
                }
            }
        }
        .info-password{
            padding-top: 20px;
            font-size: 12px;
            color: #333333;
            .el-icon-warning{
                color: #59B5FB;
                font-size: 13px;
                margin-right: 7px;
                /*vertical-align: middle;*/
            }
        }
    }
</style>
<style lang="less">
    .update-password-component{
        .el-dialog{
            box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.12);
        }
        .el-dialog__body{
            padding: 30px 100px 15px;
        }
    }
</style>
