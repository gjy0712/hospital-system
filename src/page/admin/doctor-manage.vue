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
                <el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="picpath" label="头像">
                        <template  slot-scope="scope">
                            <img :src="scope.row.picpath"  min-width="70" height="70"  alt=""/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="医生名称"></el-table-column>
                    <el-table-column prop="officeName" label="所属科室" width="120"></el-table-column>
                    <el-table-column prop="career" label="职位"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="age" label="年龄">
                        <template  slot-scope="scope">
                            {{scope.row.age}} 岁
                        </template>
                    </el-table-column>
                    <el-table-column prop="fee" label="出诊费">
                        <template  slot-scope="scope">
                            {{scope.row.fee}}.0 元
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="医生介绍" width="180"></el-table-column>
                    <el-table-column label="详情">
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

        <add-doctor-dialog @getRecommendDoctor="getRecommendDoctor" ref="addDoctor_ref"></add-doctor-dialog>
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
            this.getRecommendDoctor()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getRecommendDoctor()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getRecommendDoctor()
            },
            // 重置
            handleReset() {
                this.searchObj = {
                    doctorName: ''
                }
                this.getRecommendDoctor()
            },
            // 搜索
            handleSearch() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'doctor.searchDoctor',
                    method: 'POST',
                    data: {
                        docotrName: this.searchObj.doctorName,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    },
                    successCallback: (res) => {
                        this.loading = false;
                        this.tableData = res.data.list
                        this.pageTotal = res.data.total;
                    },
                    errorCallback: (err) => {
                        this.loading = false
                    }
                })
            },
            // 添加医生
            handleClickAddDoctor() {
                this.$refs['addDoctor_ref'].showDialog();
            },
            handleDetail(row, id){
                this.$router.push({
                    path: '/admin/registrationManagement',
                    query: {
                        id: id,
                    }
                })
            },
            getRecommendDoctor() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'doctor.getRecommendDoctor',
                    method: 'post',
                    data: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize
                    },
                    successCallback: (res) => {
                        this.loading = false;
                        if(res.data) {
                            this.tableData = res.data.list
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