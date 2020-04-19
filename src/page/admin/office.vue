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
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="departmentName" label="科室名称"></el-table-column>
                    <el-table-column prop="dNumber" label="医生数量"></el-table-column>
                    <el-table-column prop="dNumber" label="科室介绍"></el-table-column>
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

        <add-office-dialog ref="addDepartment_ref"></add-office-dialog>
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
            handleReset() {
                this.searchObj = {
                    department: ''
                }
            },
            handleSearch() {

            },
            handleClickAddDepartment() {
                this.$refs['addDepartment_ref'].showDialog();
            },

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