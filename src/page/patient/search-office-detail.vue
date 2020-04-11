<template>
    <div class="search-office-detail-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>按科室挂号</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/searchOffice' }">科室列表信息</el-breadcrumb-item>
                <el-breadcrumb-item>科室列表信息详情</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <!--条件搜索-->
        <div class="search-box">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        搜索医生：
                        <el-input size="small" v-model="searchObj.doctorName"
                                  @keyup.enter.native="handleSearch"
                                  placeholder="请输入医生名称"></el-input>
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
            <div class="department-box">
                <p class="department box-title">
                    科室：
                    <span></span>
                </p>
                <p class="department-description box-title">
                    科室简介：
                    <span></span>
                </p>
                <p class="department-total box-title">
                    该科室下有
                    <span class="total-number">{{dTotal}}</span>
                    位医生
                </p>
            </div>
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="departmentName" label="头像"></el-table-column>
                    <el-table-column prop="departmentName" label="医生名称"></el-table-column>
                    <el-table-column prop="dNumber" label="性别"></el-table-column>
                    <el-table-column prop="departmentDescription" label="职位"></el-table-column>
                    <el-table-column prop="departmentDescription" label="年龄"></el-table-column>
                    <el-table-column prop="departmentDescription" label="出诊费"></el-table-column>
                    <el-table-column prop="departmentDescription" label="医生介绍"></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="handleRegister(scope.row.id)" type="primary" size="mini">
                                我要挂号
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
        name: "search-office-detail",
        components: {
            PageHeader
        },
        data() {
            return {
                loading: false,
                searchObj: {
                    doctorName: ''
                },
                dTotal: '',
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
                    doctorName: ''
                }
            },
            handleSearch() {

            },
            handleRegister() {

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

    .search-office-detail-container {
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

            .department-box {
                background-color: @gray-color ;
                margin-bottom: 20px;
                .box-title {
                    padding: 10px;
                }
            }

            .table-box {

            }
        }
    }
</style>