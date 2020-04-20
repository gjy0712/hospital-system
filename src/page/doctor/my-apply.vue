<template>
    <div class="my-apply-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>我的申请</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <!--账号列表-->
        <div class="content-box">
            <div class="table-box">
                <el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="applyTime" label="申请时间" width="180"></el-table-column>
                    <el-table-column prop="workTime,period" label="申请日期" width="200">
                        <template slot-scope="scope">
                            {{scope.row.workTime}} {{scope.row.period}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="reason" label="申请原因" width="200"></el-table-column>
                    <el-table-column prop="request" label="申请情况">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.request=== '0'" type="danger" disable-transitions>申请停诊</el-tag>
                            <el-tag v-else type="success" disable-transitions>申请出诊</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status=== 0" type="danger" disable-transitions>已拒绝</el-tag>
                            <el-tag v-else-if="scope.row.status=== 1" type="success" disable-transitions>已同意</el-tag>
                            <el-tag v-else type="warning" disable-transitions>待处理</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleCancel(scope.row.id)"
                                       :disabled="scope.row.status=== 0 || scope.row.status=== 1"
                                       size="mini">
                                取消申请
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
    import { USER } from '@/config/webstore'
    import { getLocalStore } from '@/utils/webstore-utils'

    export default {
        name: "my-apply",
        components: {
            PageHeader
        },
        data() {
            return {
                loading: false,
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 1,
                doctorId: ''
            }
        },
        created() {
            let userObj = JSON.parse(getLocalStore(USER))
            this.doctorId = userObj.id

            this.getApply()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getApply()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getApply()
            },
            // 删除申请
            handleCancel(id) {
                this.$confirm(
                    "您确认要取消申请吗？",
                    "提示",
                    {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: 'warning'
                    }
                ).then(() => {
                    apiDataFilter.request({
                        apiPath: 'apply.deleteApply',
                        method: 'POST',
                        data: {
                            applyId: id
                        },
                        successCallback: (res)=> {
                            this.$message.success('取消申请成功')
                            this.getApply()
                        },
                        errorCallback: (res) => {
                            this.$message.error('取消申请失败')
                            this.getApply()


                        }
                    })
                })
            },

            getApply() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'apply.getApply',
                    method: 'post',
                    data: {
                        doctorId: this.doctorId,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
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

    .my-apply-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .content-box {
            padding: 20px;

            .table-box {
                /*padding-right: 10px;*/
            }
        }
    }
</style>