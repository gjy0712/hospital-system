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
                    <el-table-column prop="reserveTime" label="预约时间"></el-table-column>
                    <el-table-column prop="treatmentTime" label="就诊时间"></el-table-column>
                    <el-table-column prop="pName" label="患者名称"></el-table-column>
                    <el-table-column prop="reserveSituation" label="预约状况"></el-table-column>
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
            /*handleCancel() {

            },*/

            getList() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'user.getUserList',
                    method: 'post',
                    data: '',
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