<template>
    <div class="doctor-manage-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>医生信息管理</el-breadcrumb-item>
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
            <div class="button-box">
                <el-button class="add" size="small" type="success" icon="el-icon-plus"
                           @click="handleClickAddDoctor">
                    添加医生
                </el-button>
            </div>
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column prop="pic" label="头像"></el-table-column>
                    <el-table-column prop="doctorName" label="医生名称"></el-table-column>
                    <el-table-column prop="dNumber" label="性别"></el-table-column>
                    <el-table-column prop="doctorCareer" label="职位"></el-table-column>
                    <el-table-column prop="departmentDescription" label="年龄"></el-table-column>
                    <el-table-column prop="departmentDescription" label="出诊费"></el-table-column>
                    <el-table-column prop="doctorDesc" label="医生介绍" width="230"></el-table-column>
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

        <add-doctor-dialog ref="addDoctor_ref"></add-doctor-dialog>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'
    import apiDataFilter from "../../utils/apiDataFilter";
    import AddDoctorDialog from "./components/add-doctor-dialog";

    export default {
        name: "doctor-manage",
        components: {
            AddDoctorDialog,
            PageHeader
        },
        data() {
            return {
                loading: false,
                searchObj: {
                    doctorName: ''
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
            // 重置
            handleReset() {
                this.searchObj = {
                    doctorName: ''
                }
            },
            // 搜索
            handleSearch() {

            },
            // 添加医生
            handleClickAddDoctor() {
                this.$refs['addDoctor_ref'].showDialog();

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

    .doctor-manage-container {
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

            .button-box {
            }
        }
    }
</style>