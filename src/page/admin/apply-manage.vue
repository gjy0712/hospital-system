<template>
    <div class="apply-manage-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>排班信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>
        <!--账号列表-->
        <div class="content-box">
            <div class="table-box">
                <el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" fixed label="序号" width="50"></el-table-column>
                    <el-table-column prop="doctorName" label="申请医生"></el-table-column>
                    <el-table-column prop="request" label="申请情况" width="150">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.request=== '0'" type="danger" disable-transitions>申请停诊</el-tag>
                            <el-tag v-else type="success" disable-transitions>申请出诊</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="workTime,period" label="日期" width="200">
                        <template slot-scope="scope">
                            {{scope.row.workTime}} {{scope.row.period}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="applyTime" label="申请时间" width="180"></el-table-column>
                    <el-table-column prop="reason" label="原因" width="220"></el-table-column>
                    <el-table-column prop="departmentDescription" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status=== 0" type="danger" disable-transitions>已拒绝</el-tag>
                            <el-tag v-else-if="scope.row.status=== 1" type="success" disable-transitions>已同意</el-tag>
                            <el-tag v-else type="warning" disable-transitions>待处理</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="150" label="操作">
                        <template slot-scope="scope">
                            <el-button :disabled="scope.row.status=== 0 || scope.row.status=== 1"
                                       @click="handleApprove(scope.row, scope.row.id)"
                                       :loading="loading"
                                       size="mini">
                                同意
                            </el-button>
                            <el-button :disabled="scope.row.status=== 0 || scope.row.status=== 1"
                                       @click="handleRefuse(scope.row, scope.row.id)"
                                       type="danger"
                                       :loading="loading"
                                       size="mini">
                                拒绝
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
    import { PageHeader } from '../../components/public'
    import apiDataFilter from "../../utils/apiDataFilter";
    import AddDoctorDialog from "./components/add-doctor-dialog";

    export default {
        name: "apply-manage",
        components: {
            AddDoctorDialog,
            PageHeader
        },
        data() {
            return {
                loading: false,
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
            }
        },
        created() {
            this.getAllApply()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getAllApply()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getAllApply()
            },
            // 同意预约
            handleApprove(row, id) {
                this.$confirm(
                    "您确认要同意该医生的申请信息吗？",
                    "提示",
                    {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: 'warning'
                    }
                ).then(() => {
                    apiDataFilter.request({
                        apiPath: 'apply.updateApply',
                        method: 'POST',
                        data: {
                            status: 1,
                            workdayId: row.workdayId
                        },
                        successCallback: (res)=> {
                            this.$message.success('同意该申请成功')
                            this.getAllApply()
                        },
                        errorCallback: (res) => {
                            this.$message.error('同意该申请失败')
                            this.getAllApply()
                        }
                    })
                })
            },
            // 拒绝预约
            handleRefuse(row, id){
                this.$confirm(
                    "您确认要拒绝该医生的申请吗？",
                    "提示",
                    {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: 'warning'
                    }
                ).then(() => {
                    apiDataFilter.request({
                        apiPath: 'apply.updateApply',
                        method: 'POST',
                        data: {
                            status: 0,
                            workdayId: row.workdayId
                        },
                        successCallback: (res)=> {
                            this.$message.success('拒绝该申请成功')
                            this.getAllApply()
                        },
                        errorCallback: (res) => {
                            this.$message.error('拒绝该申请失败')
                            this.getAllApply()
                        }
                    })
                })
            },
            getAllApply() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'apply.getAllApply',
                    method: 'post',
                    data: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
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

    .apply-manage-container {
        background-color: @default-color;
        padding-bottom: 20px;
        .table-box {
            padding-top: 20px;
        }
    }
</style>