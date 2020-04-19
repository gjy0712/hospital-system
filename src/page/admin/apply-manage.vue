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
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="pic" label="申请医生"></el-table-column>
                    <el-table-column prop="doctorName" label="申请情况"></el-table-column>
                    <el-table-column prop="dNumber" label="日期"></el-table-column>
                    <el-table-column prop="doctorCareer" label="申请时间"></el-table-column>
                    <el-table-column prop="departmentDescription" label="原因"></el-table-column>
                    <el-table-column prop="departmentDescription" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleApprove(scope.row, scope.row.id)" type="success" size="mini">
                                同意
                            </el-button>
                            <el-button @click="handleRefuse(scope.row, scope.row.id)" type="danger" size="mini">
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
            handleApprove() {

            },
            handleRefuse() {

            },
            getList() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'patient.doctorList',
                    method: 'post',
                    data: '',
                    successCallback: (res) => {
                        this.loading = false;
                        this.tableData = res.data.doctorInfoList

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

    .apply-manage-container {
        background-color: @default-color;
        padding-bottom: 20px;
    }
</style>