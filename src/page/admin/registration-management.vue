<template>
    <div class="registration-management-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>医生排班信息管理</el-breadcrumb-item>
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
                    <el-table-column fixed type="index" label="序号"></el-table-column>
                    <el-table-column prop="period" label="时间"></el-table-column>
                    <el-table-column prop="workTime" label="工作日"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status=== 0"
                                    type="danger"
                                    class="custom-button_long"
                                    disable-transitions>
                                停诊
                            </el-tag>
                            <el-tag v-else
                                    type="success"
                                    class="custom-button_long"
                                    disable-transitions>
                                出诊
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row.id, scope.row.status)"
                                       type="primary"
                                       size="mini">
                                修改状态
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
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public';
    import apiDataFilter from "../../utils/apiDataFilter";

    export default {
        name: "registration-management",
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
                workdayId: '',
                dialogVisible: false,
            }
        },
        created() {
            this.doctorId = this.$route.query.id || ''

            this.getDoctor()
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
            handleEdit(id, status) {
                if(status === 0){
                    this.$confirm(
                        "您确认要修改为出诊吗？",
                        "提示",
                        {
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            type: 'warning'
                        }
                    ).then(() => {
                        apiDataFilter.request({
                            apiPath: 'workday.updateWorkday',
                            method: 'POST',
                            data: {
                                status: 1,
                                workdayId: id
                            },
                            successCallback: (res)=> {
                                this.$message.success('修改成功')
                                this.getWorkDay()
                            },
                            errorCallback: (res) => {
                                this.$message.error('修改失败')
                                this.getWorkDay()
                            }
                        })
                    })
                }else {
                    this.$confirm(
                        "您确认要修改为停诊吗？",
                        "提示",
                        {
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            type: 'warning'
                        }
                    ).then(() => {
                        apiDataFilter.request({
                            apiPath: 'workday.updateWorkday',
                            method: 'POST',
                            data: {
                                status: 0,
                                workdayId: id
                            },
                            successCallback: (res)=> {
                                this.$message.success('修改成功')
                                this.getWorkDay()
                            },
                            errorCallback: (res) => {
                                this.$message.error('修改失败')
                                this.getWorkDay()
                            }
                        })
                    })
                }

            },
            // 获取医生信息
            getDoctor() {
                apiDataFilter.request({
                    apiPath: 'doctor.getDoctor',
                    method: 'post',
                    data: {
                        doctorId: this.doctorId
                    },
                    successCallback: (res) => {
                        if(res.data) {
                            // this.tableData = res.data.list;
                            this.doctorInfo = res.data;
                        }

                    },
                    errorCallback: (err) => {

                    },
                })
            },
            getWorkDay() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'workday.getWorkDay',
                    method: 'post',
                    data: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        doctorId: this.doctorId
                    },
                    successCallback: (res) => {
                        this.loading = false;
                        if(res.data) {
                            this.tableData = res.data.list;
                            this.pageTotal = res.data.total;
                        }

                    },
                    errorCallback: (err) => {
                        this.loading = false;
                    },
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";

    .registration-management-container {
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