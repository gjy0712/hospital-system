<template>
    <div class="patient-list-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>患者队列</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <!--账号列表-->
        <div class="content-box">
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="recordTime" label="预约时间" width="200"></el-table-column>
                    <el-table-column prop="workTime,period" label="就诊时间" width="200">
                        <template slot-scope="scope">
                            {{scope.row.workTime}} {{scope.row.period}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="patientName" label="患者名称"></el-table-column>
                    <el-table-column prop="status" label="预约状况">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status=== 0" type="dander" disable-transitions>已拒绝</el-tag>
                            <el-tag v-else-if="scope.row.status=== 1" type="success" disable-transitions>已同意</el-tag>
                            <el-tag v-else type="warning" disable-transitions>待处理</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="操作">
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
    import {getLocalStore} from "../../utils/webstore-utils";
    import {USER} from "../../config/webstore";

    export default {
        name: "patient-list",
        components: {
            PageHeader
        },
        data() {
            return {
                loading: false,
                tableData: [
                    {
                        reserveTime: '2020-04-13 14:02:50',
                        treatmentTime: '04-20 10:00',
                        pName: '0414',
                        reserveSituation: '已成功'
                    }
                ],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 1,
            }
        },
        created() {
            let userObj = JSON.parse(getLocalStore(USER))
            this.doctorId = userObj.id

            this.getRecordList()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getRecordList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getRecordList()
            },
            // 同意预约
            handleApprove(row,id) {
                this.$confirm(
                    "您确认要同意该预约吗？",
                    "提示",
                    {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: 'warning'
                    }
                ).then(() => {
                    apiDataFilter.request({
                        apiPath: 'record.updateRecord',
                        method: 'POST',
                        data: {
                            status: 1,
                            recordId: id
                        },
                        successCallback: (res)=> {
                            this.$message.success('同意该预约')
                            this.getRecordList()
                        },
                        errorCallback: (res) => {
                            this.$message.error('同意该预约')
                            this.getRecordList()


                        }
                    })
                })
            },
            // 拒绝预约
            handleRefuse(row, id){
                this.$confirm(
                    "您确认要拒绝该预约吗？",
                    "提示",
                    {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: 'warning'
                    }
                ).then(() => {
                    apiDataFilter.request({
                        apiPath: 'record.updateRecord',
                        method: 'POST',
                        data: {
                            status: 0,
                            recordId: id
                        },
                        successCallback: (res)=> {
                            this.$message.success('拒绝该预约成功')
                            this.getRecordList()
                        },
                        errorCallback: (res) => {
                            this.$message.error('拒绝该预约失败')
                            this.getRecordList()
                        }
                    })
                })
            },
            getRecordList() {
                this.loading = false;
                apiDataFilter.request({
                    apiPath: 'record.getDoctorRecordList',
                    method: 'post',
                    data: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        doctorId: this.doctorId
                    },
                    successCallback: (res) => {
                        this.loading = false
                        if(res.data) {
                            this.tableData = res.data.list;
                            this.pageTotal = res.data.total;
                        }
                    },
                    errorCallback: (err) => {
                        this.loading = false
                    },
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";
    .patient-list-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .content-box {
            padding: 20px;

            .table-box {

            }
        }
    }
</style>