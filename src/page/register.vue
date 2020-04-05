<template>
    <div class="register-container">
        <div class="register-box">
            <div class="register-title">医院预约挂号系统</div>
            <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="register-content">
                <el-form-item label="用户名：" prop="username">
                    <el-input size="medium" v-model="registerForm.username" placeholder="请输入用户名..."></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="phone">
                    <el-input size="medium" v-model="registerForm.phone" placeholder="请输入电话..."></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱：" prop="mail">
                    <el-input size="medium" v-model="registerForm.mail" placeholder="请输入正确的邮箱地址..."></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" size="medium" v-model="registerForm.password" placeholder="请输入密码..." ></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="dbpassword">
                    <el-input type="password" size="medium" v-model="registerForm.dbpassword" placeholder="请确认密码..."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium"  @click="resetregisterForm('registerForm')">重置</el-button>
                    <el-button size="medium" type="primary" class="registerBtn" @click="submitForm('registerForm')">注册</el-button>
                </el-form-item>
                <el-button type="text" class="register-tips" @click="handleLogin()">已有账号，去登录>></el-button>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            var validateUsername=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
                else{
                    callback();
                }
                // else{
                //   console.log("xxxxxxxxxxxxx",api.login)
                //   this.$http.get(api.login).then(function(response){
                //      var flag=0;
                //      for(let i=0;i<response.data.length;i++){
                //        if(value === response.data[i].username){
                //          flag=1;
                //          break;
                //        }
                //      }
                //      if(flag ===1){
                //        callback(new Error("用户名已存在"));
                //      }
                //   });
                // }
            };
            var validatePhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入电话号码'));
                }
                else {
                    var reg1 = /^[0-9]{11}$/;
                    if (! reg1.test(value)) {
                        callback(new Error('请输入正确的电话号码'));
                    } else {
                        callback();
                    }
                }
            };
            var validateMail=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入联系邮箱'));
                }
                else{
                    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                    if(!reg.test(value)){
                        callback(new Error('输入的联系邮箱必须包含@'));
                    }
                    else{
                        callback();
                    }
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else if(value.length<6){
                    callback(new Error('密码不能少于6位'));
                }
                else {
                    if(this.registerForm.dbpassword !== '') {
                        this.$refs.registerForm.validateField('dbpassword');
                    }
                    callback();
                }
            };
            var validatedbPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    username: '',
                    phone: '',
                    mail: '',
                    password: '',
                    dbpassword: ''
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur' }
                    ],
                    phone: [
                        {validator: validatePhone, trigger: 'blur' }
                    ],
                    mail: [
                        {validator: validateMail, trigger: 'blur' }
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur' }
                    ],
                    dbpassword: [
                        {validator: validatedbPass, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success('注册成功，请登录');
                        this.$router.push('/login');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetregisterForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleLogin() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/mixins/flex";
    @import "../style/variables";

    .register-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: @main-color url(../assets/img/login-bg3.jpg) no-repeat fixed 50% 50% ;
        background-size: 100% 100%;
        .flex();
        .align-items(center);
        .justify-content(center);

        .register-box {
            width: 400px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.12);
            overflow: hidden;

            .register-title {
                width: 100%;
                line-height: 50px;
                text-align: center;
                font-size: 20px;
                color: #000;
                border-bottom: 1px solid #ddd;
            }

            .register-content {
                padding: 30px 30px;

                .el-form-item {
                    margin-bottom: 15px;
                }
                .el-form-item:nth-child(6) {
                    margin-bottom: 0;
                }

                .register-btn {
                    text-align: center;
                }

                .register-btn button {
                    width: 100%;
                    height: 36px;
                    margin-bottom: 3px;
                }

                .register-tips {
                    font-size: 10px;
                    color: #000;
                    float: right;
                    margin-bottom: 10px;
                }
                .register-tips:hover {
                    color: #409eff
                }
            }
        }
    }

</style>