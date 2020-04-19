<template>
    <div class="search-office-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>按科室挂号</el-breadcrumb-item>
                <el-breadcrumb-item>科室列表信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <!--条件搜索-->
        <div class="search-box">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        搜索科室：
                        <el-input size="small" v-model="searchObj.departmentName"
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
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="officeName" label="科室名称"></el-table-column>
                    <el-table-column prop="doctorNum" label="医生数量"></el-table-column>
<!--                    <el-table-column prop="departmentDescription" label="科室介绍" width="350"></el-table-column>-->
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="handleDetail(scope.row, scope.row.id)" type="primary" size="mini">
                                详情
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
        name: "search-office",
        components: {
            PageHeader
        },
        data() {
            return {
                loading: false,
                searchObj: {
                    departmentName: ''
                },
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
            }
        },
        created() {
            this.getList()
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
            // 重置
            handleReset() {
                this.searchObj = {
                    departmentName: ''
                }
            },
            // 搜索
            handleSearch() {
                this.getList()
            },
            // 详情
            handleDetail(row, id) {
                console.log(id)
                this.$router.push({
                    path: '/searchOfficeDetail',
                    query: {
                        departmentId: id,
                        officeName: row.officeName,
                        doctorNum: row.doctorNum,
                    }
                })
            },
            // 获取科室列表
            getList() {
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
                        this.tableData = res.data.officeInfoList;
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

    .search-office-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .search-box {
            background-color: @gray-color;
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