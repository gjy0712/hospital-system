<template>
    <el-dialog
            title="添加医生"
            :visible.sync="dialogAddDoctor"
            class="add-doctor-component el-dialog-style-reset"
            :close-on-click-modal="false"
            width="600px"
            @click="handleCancel('info')">
        <div class="pop-box">
            <el-form
                    :model="dataInfo"
                    :rules="dataInfoRule"
                    size="small"
                    ref="info"
                    label-width="100px"
                    :validate-on-rule-change="false"
                    class="demo-ruleForm">
                <el-form-item label="账号：" prop="account">
                    <el-input v-model.trim="dataInfo.account" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model.trim="dataInfo.password" placeholder="请输入邮箱" type="password"></el-input>
                </el-form-item>
                <el-form-item label="名称：" prop="name">
                    <el-input v-model.trim="dataInfo.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="出诊费：" prop="fee">
                    <el-input v-model.trim="dataInfo.fee" placeholder="请输入出诊费"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                    <el-select v-model="dataInfo.sex">
                        <el-option
                                v-for="item in sexList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科室：" prop="department">
                    <el-select v-model="dataInfo.department">
                        <el-option
                                v-for="item in departmentList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位：" prop="position">
                    <el-select v-model="dataInfo.position">
                        <el-option
                                v-for="item in positionList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="介绍：" prop="description">
                    <el-input type="textarea" v-model.trim="dataInfo.description" placeholder="请输入签名"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small"
                       class="custom-button_long"
                       @click="handleCancel('info')">关闭</el-button>
            <el-button
                    size="small"
                    type="primary"
                    :loading="loading"
                    class="custom-button_long"
                    @click="handleSubmit()">
                确定
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
    import apiDataFilter from "../../../utils/apiDataFilter";

    export default {
        name: "add-doctor-dialog",
        data() {
            return {
                loading: false,
                dialogAddDoctor: false,
                dataInfo: {
                    account: '',
                    password: '',
                    name: '',
                    fee: '',
                    sex: '',
                    department: '',
                    position: '',
                    description: ''
                },
                sexList: [
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
                    }
                ],
                departmentList: [
                    {
                        value: '外科',
                        label: '外科'
                    },
                    {
                        value: '内科',
                        label: '内科'
                    }
                ],
                positionList: [
                    {
                        value: '主任医师',
                        label: '主任医师'
                    },
                ]
            }
        },
        computed: {
            dataInfoRule() {
                return {
                    account: [
                        { required: true, message: "账号不能为空", trigger: 'blur' },
                        { min: 2, max: 8, message: "账号的长度为2-8位", trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: "密码不能为空", trigger: 'blur' },
                        { min: 2, max: 8, message: "密码的长度为2-8位", trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: "名称不能为空", trigger: 'blur' },
                    ],
                    fee: [
                        { required: true, message: "出诊费不能为空", trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: "请选择性别", trigger: 'change' },

                    ],
                    department: [
                        { required: true, message: "请选择科室", trigger: 'change' },

                    ],
                    position: [
                        { required: true, message: "请选择职位", trigger: 'change' },
                    ]
                }
            }
        },
        methods: {
            showDialog() {
                this.dialogAddDoctor = true
            },
            handleCancel(formName) {
                this.$refs[formName].clearValidate()
                this.dialogAddDoctor = false
            },
            handleSubmit() {
                this.$refs['info'].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        apiDataFilter.request({
                            apiPath: 'user.updateUser',
                            method: 'post',
                            data: {
                                id: this.id,
                                name: this.userInfo.name,
                                email: this.userInfo.email,
                                phone: this.userInfo.phone,
                                description: this.userInfo.description
                            },
                            successCallback: (res) => {
                                this.loading = false;
                                // 成功
                                this.$notify({
                                    title: '成功',
                                    message: '编辑成功',
                                    type: "success"
                                });
                                this.dialogEditInfo = false
                            },
                            errorCallback: (err) => {
                                this.loading = false
                                // 失败
                                this.$notify.error({
                                    title: '失败',
                                    message: '修改失败'
                                });
                            },
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .add-doctor-component {
        .pop-box {
            padding: 0 30px;
        }
    }
</style>