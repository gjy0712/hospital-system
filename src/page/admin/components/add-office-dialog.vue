<template>
    <el-dialog
            title="添加科室"
            :visible.sync="dialogAddDepartment"
            class="add-office-component el-dialog-style-reset"
            :close-on-click-modal="false"
            width="500px"
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
                <el-form-item label="名称：" prop="name">
                    <el-input v-model.trim="dataInfo.name" placeholder="请输入科室名称"></el-input>
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
        name: "add-office-dialog",
        data() {
            return {
                loading: false,
                dialogAddDepartment: false,
                dataInfo: {
                    name: '',
                    description: ''
                },

            }
        },
        computed: {
            dataInfoRule() {
                return {
                    name: [
                        { required: true, message: "科室名称不能为空", trigger: 'blur' },
                    ],

                }
            }
        },
        methods: {
            showDialog() {
                this.dialogAddDepartment = true
            },
            handleCancel(formName) {
                this.$refs[formName].clearValidate()
                this.dialogAddDepartment = false
            },
            handleSubmit() {
                this.$refs['info'].validate(valid => {
                    if(valid){
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
    .add-office-component {
        .pop-box {
            padding: 0 20px;
        }
    }
</style>