<template>
    <div class="office-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>患者信息列表</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <!--条件搜索-->
        <div class="search-box">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        搜索科室：
                        <el-input size="small" v-model="searchObj.department"
                                  @keyup.enter.native="handleSearch"
                                  placeholder="请输入科室名称"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-button size="small" @click="handleReset" class="custom-button_long">重置</el-button>
                        <el-button type="primary" size="small" @click="handleSearch" class="custom-button_long">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!--账号列表-->
        <div class="content-box">
            <div class="button-box">
                <el-button class="add" size="small" type="danger" icon="el-icon-plus"
                           @click="handleClickAddDepartment">
                    添加科室
                </el-button>
            </div>
            <div class="table-box">
                <el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="officeName" label="科室名称"></el-table-column>
                    <el-table-column prop="doctorNum" label="医生数量"></el-table-column>
                    <!--                    <el-table-column prop="departmentDescription" label="科室介绍" width="350"></el-table-column>-->
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

        <add-office-dialog @getOfficeList="getOfficeList" ref="addDepartment_ref"></add-office-dialog>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'
    import apiDataFilter from "../../utils/apiDataFilter";
    import AddOfficeDialog from "./components/add-office-dialog";

    export default {
        name: "office",
        components: {
            AddOfficeDialog,
            PageHeader
        },
        data() {
            return {
                loading: false,
                searchObj: {
                    department: ''
                },
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
            }
        },
        created() {
            this.getOfficeList()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getOfficeList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getOfficeList()
            },
            // 重置
            handleReset() {
                this.searchObj = {
                    departmentName: ''
                }
                this.getOfficeList()
            },
            // 搜索
            handleSearch() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'office.searchOffice',
                    method: 'POST',
                    data: {
                        officeName: this.searchObj.department,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    },
                    successCallback: (res) => {
                        this.loading = false;
                        this.tableData = res.data.list;
                        this.pageTotal = res.data.total;
                    },
                    errorCallback: (err) => {
                        this.loading = false
                    }
                })
            },
            handleClickAddDepartment() {
                this.$refs['addDepartment_ref'].showDialog();
            },

            // 获取科室列表
            getOfficeList() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'office.getOfficeList',
                    method: 'post',
                    data: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    },
                    successCallback: (res) => {
                        this.loading = false;
                        this.tableData = res.data.list;
                        this.pageTotal = res.data.total;
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

    .office-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .search-box {
            padding: 20px 0;
            margin-top: 20px;

            .el-row {
                padding-left: 20px;

                .grid-content {
                    color: @dark-font-color;

                    .el-input,
                    .el-select {
                        display: inline-block;
                        width: 60%;
                    }
                }
            }
        }
        .content-box {
            padding: 20px;

            .table-box {

            }
        }
    }

</style>