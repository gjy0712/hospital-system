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
                <el-form-item label="账号：" prop="username">
                    <el-input v-model.trim="dataInfo.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model.trim="dataInfo.password" placeholder="默认为账号" type="password" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="医生姓名：" prop="name">
                    <el-input v-model.trim="dataInfo.name" placeholder="请输入医生姓名"></el-input>
                </el-form-item>
                <el-form-item label="出诊费：" prop="fee">
                    <el-input v-model.trim="dataInfo.fee" placeholder="请输入出诊费"></el-input>
                </el-form-item>
                <el-form-item label="年龄：" prop="age">
                    <el-input v-model.trim="dataInfo.age" placeholder="请输入医生的年龄"></el-input>
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
                    username: '',
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
                        value: '儿科泌尿专科',
                        label: '儿科泌尿专科'
                    },
                    {
                        value: '儿科神经内科',
                        label: '儿科神经内科'
                    },
                    {
                        value: '儿童哮喘专科',
                        label: '儿童哮喘专科'
                    },
                    {
                        value: '儿童康复专科',
                        label: '儿童康复专科'
                    },
                    {
                        value: '内分泌科',
                        label: '内分泌科'
                    },
                    {
                        value: '呼吸内科',
                        label: '呼吸内科'
                    },
                    {
                        value: '外科',
                        label: '外科'
                    },
                    {
                        value: '心胸外科',
                        label: '心胸外科'
                    },
                    {
                        value: '心血管内科',
                        label: '心血管内科'
                    },
                    {
                        value: '新生儿专科',
                        label: '新生儿专科'
                    },
                    {
                        value: '泌尿外科',
                        label: '泌尿外科'
                    },
                    {
                        value: '消化内科',
                        label: '消化内科'
                    },
                    {
                        value: '神经内科',
                        label: '神经内科'
                    },
                    {
                        value: '神经外科',
                        label: '神经外科'
                    },
                    {
                        value: '肛肠外科',
                        label: '肛肠外科'
                    },
                    {
                        value: '肝胆胃肠外科',
                        label: '肝胆胃肠外科'
                    },
                    {
                        value: '血液科',
                        label: '血液科'
                    },
                    {
                        value: '血管外科',
                        label: '血管外科'
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
                // 年龄验证
                const validateAge = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('年龄不能为空'));
                    } else {
                        const reg = /^([2-5]\d)|60$/;
                        if (!reg.test(value)) {
                            callback(new Error('年龄在20~60岁之间'));
                        } else {
                            callback();
                        }
                    }
                };
                return {
                    account: [
                        { required: true, message: "账号不能为空", trigger: 'blur' },
                        { min: 2, max: 8, message: "账号的长度为2-8位", trigger: 'blur' }
                    ],
                    /*password: [
                        { required: true, message: "密码不能为空", trigger: 'blur' },
                        { min: 2, max: 8, message: "密码的长度为2-8位", trigger: 'blur' }
                    ],*/
                    name: [
                        { required: true, message: "名称不能为空", trigger: 'blur' },
                    ],
                    fee: [
                        { required: true, message: "出诊费不能为空", trigger: 'blur' },
                    ],
                    age: [
                        { required: true, message: "年龄不能为空", trigger: 'blur' },
                        {validator: validateAge, trigger: 'blur' }
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
                this.dataInfo = {
                    account: '',
                    password: '',
                    name: '',
                    age: '',
                    fee: '',
                    sex: '',
                    department: '',
                    position: '',
                    description: ''
                }
            },
            handleSubmit() {
                this.$refs['info'].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        apiDataFilter.request({
                            apiPath: 'doctor.insertDoctor',
                            method: 'post',
                            data: {
                                username: this.dataInfo.username,
                                name: this.dataInfo.name,
                                fee: this.dataInfo.fee,
                                sex: this.dataInfo.sex,
                                age: this.dataInfo.age,
                                officeName: this.dataInfo.department,
                                career: this.dataInfo.position,
                                description: this.dataInfo.description,
                            },
                            successCallback: (res) => {
                                this.loading = false;
                                // 成功
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: "success"
                                });
                                this.dialogAddDoctor = false
                                this.$emit('getRecommendDoctor')
                            },
                            errorCallback: (err) => {
                                this.loading = false
                                // 失败
                                this.$notify.error({
                                    title: '失败',
                                    message: '添加失败'
                                });
                                this.dialogAddDoctor = false
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