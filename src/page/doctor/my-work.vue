<template>
    <div class="my-work-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>排班信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <div class="content-box">
            <div class="info-content">
                <div class="image">
                    <img :src="doctorInfo.picpath" alt="">
                </div>
                <div class="info-right">
                    <div class="message">
                        <span class="common-font">医生名称：</span>
                        {{doctorInfo.name}}
                    </div>
                    <div class="message">
                        <span class="common-font">科室：</span>
                        {{doctorInfo.officeName}}
                    </div>
                    <div class="message">
                        <span class="common-font">职位：</span>
                        {{doctorInfo.career}}
                    </div>
                    <div class="message">
                        <span class="small-font">年龄：</span>{{doctorInfo.age}}
                        <div style="width: 50px;display: inline-block"></div>
                        <span class="small-font">性别：</span>{{doctorInfo.sex}}
                    </div>
                    <div class="message">
                        <span class="small-font">介绍：</span>
                        <p>{{doctorInfo.description}}</p>
                    </div>
                </div>
            </div>

            <div class="table-box">
                <el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="period" label="时间"></el-table-column>
                    <el-table-column prop="workTime" label="工作日"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status=== 0" type="danger" disable-transitions>停诊</el-tag>
                            <el-tag v-else type="success" disable-transitions>出诊</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleApply(scope.row.id)"
                                       type="primary"
                                       size="mini">
                                申请调班
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination-box">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 15, 20]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pageTotal"
                            class="custom-pagination">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog
                title="申请调班"
                :visible.sync="dialogVisible"
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
                    <el-form-item label="状态：" prop="status">
                        <el-select v-model="dataInfo.status">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="原因：" prop="reason">
                        <el-input type="textarea" v-model.trim="dataInfo.reason" placeholder="请输入申请原因，例如请病假"></el-input>
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

    </div>
</template>

<script>
    import { PageHeader } from '../../components/public';
    import apiDataFilter from "../../utils/apiDataFilter";
    import { USER } from '@/config/webstore'
    import { getLocalStore } from '@/utils/webstore-utils'

    export default {
        name: "my-work",
        components: {
            PageHeader,
        },
        data() {
            return {
                loading: false,
                doctorInfo: {
                    name: '',
                    sex: '',
                    career: '',
                    officeName: '',
                    description: '',
                    picpath: '',
                    age: ''
                },
                doctorId: '',
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                // 申请调班
                dataInfo: {
                    status: '',
                    reason: ''
                },
                statusList: [
                    {
                        value: '1',
                        label: '申请出诊'
                    }, {
                        value: '0',
                        label: '申请停诊'
                    }
                ],
                workdayId: '',
                dialogVisible: false,
            }
        },
        computed: {
            dataInfoRule() {
                return {
                    status: [
                        { required: true, message: "申请原因不能为空", trigger: 'blur' },
                    ],
                    reason: [
                        { required: true, message: '请选择申请状态', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            let userObj = JSON.parse(getLocalStore(USER))
            if (userObj) {
                this.doctorInfo.name = userObj.name;
                this.doctorInfo.sex = userObj.sex;
                this.doctorInfo.career = userObj.career;
                this.doctorInfo.officeName = userObj.officeName;
                this.doctorInfo.description = userObj.description;
                this.doctorInfo.picpath = userObj.picpath;
                this.doctorInfo.age = userObj.age;

                this.doctorId = userObj.id
            }

            this.getWorkDay()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getWorkDay()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getWorkDay()
            },
            handleApply(id){
                this.dialogVisible = true
                this.workdayId = id;
            },
            handleCancel(formName) {
                this.$refs[formName].clearValidate()
                this.dialogVisible = false
            },
            handleSubmit() {
                this.$refs['info'].validate(valid => {
                    if(valid){
                        this.loading = true;
                        apiDataFilter.request({
                            apiPath: 'apply.insertApply',
                            method: 'post',
                            data: {
                                doctorId: this.doctorId,
                                doctorName: this.doctorInfo.name,
                                workdayId: this.workdayId,
                                request: this.dataInfo.status,
                                reason: this.dataInfo.reason
                            },
                            successCallback: (res) => {
                                this.loading = false;
                                // 成功
                                this.$notify({
                                    title: '成功',
                                    message: '申请成功',
                                    type: "success"
                                });
                                this.dialogVisible = false
                                this.getWorkDay()
                            },
                            errorCallback: (err) => {
                                this.loading = false
                                // 失败
                                this.$notify.error({
                                    title: '失败',
                                    message: '申请失败'
                                });
                                this.dialogVisible = false
                                this.getWorkDay()
                            },
                        })
                    }

                })
            },
            getWorkDay() {
                apiDataFilter.request({
                    apiPath: 'workday.getWorkDay',
                    method: 'post',
                    data: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        doctorId: this.doctorId
                    },
                    successCallback: (res) => {
                        if(res.data) {
                            this.tableData = res.data.list;
                            this.pageTotal = res.data.total;
                        }

                    },
                    errorCallback: (err) => {

                    },
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";

    .my-work-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .content-box {
            .info-content {
                padding: 20px;
                .image {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 50px;
                    & img {
                        width: 100px;
                        height: 120px;
                    }
                }
                .info-right {
                    display: inline-block;
                    vertical-align: middle;
                    align-items: center;
                    margin-left: 160px;
                    .message {
                        margin-bottom: 10px;
                        .common-font {
                            font-size: 25px;
                        }
                        .small-font {
                            font-size: 18px;
                        }
                    }


                }
            }


        }
    }
</style>