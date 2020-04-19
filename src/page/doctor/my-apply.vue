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
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="applyTime" label="申请时间"></el-table-column>
                    <el-table-column prop="applyDay" label="申请日期"></el-table-column>
                    <el-table-column prop="applyResult" label="申请原因" width="200"></el-table-column>
                    <el-table-column prop="applySituation" label="申请情况"></el-table-column>
                    <el-table-column prop="applyStatus" label="状态"></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="handleCancel(scope.row, scope.row.id)" type="danger" size="mini">
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

    export default {
        name: "my-apply",
        components: {
            PageHeader
        },
        data() {
            return {
                loading: false,
                tableData: [
                    {
                        applyTime: '04-20 13-34',
                        applyDay: '04-23 周四',
                        applyResult: '家中有事，申请和同事调班',
                        applySituation: '申请停诊',
                        applyStatus: '已同意'
                    }
                ],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 1,
                id: ''
            }
        },
        created() {
            // this.getList()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getList()
            },
            handleCancel() {

            },

            getList() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'user.getApplyList',
                    method: 'post',
                    data: {
                        dId: this.id
                    },
                    successCallback: (res) => {
                        this.loading = false;
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