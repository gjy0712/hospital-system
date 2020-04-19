<template>
    <div class="order-list-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>我的预约</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <!--账号列表-->
        <div class="content-box">
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="doctorName" label="医生名称"></el-table-column>
                    <el-table-column prop="dNumber" label="所属科室"></el-table-column>
                    <el-table-column prop="doctorCareer" label="诊费"></el-table-column>
                    <el-table-column prop="reserveTime" label="预约时间" width="180"></el-table-column>
                    <el-table-column prop="treatmentTime" label="就诊时间"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
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
    import {getLocalStore} from "../../utils/webstore-utils";
    import { USER } from '@/config/webstore'

    export default {
        name: "order-list",
        components: {
            PageHeader
        },
        data() {
            return {
                tableData: [
                    {
                        pic: '',
                        doctorName: '陈胜良',
                        dNumber: '消化内科',
                        doctorCareer: '80',
                        reserveTime: '2020-04-13 14:02:50',
                        treatmentTime: '04-20 10:00',
                        status: '预约成功'
                    }
                ],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 1,
                patientId: ''
            }
        },
        mounted() {

        },
        created() {
            let userObj = JSON.parse(getLocalStore(USER))
            if (userObj) {
                this.patientId = userObj.id
            }
            this.getRecordList()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getRecordList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getRecordList()
            },
            // 分页获取患者预约记录
            getRecordList() {
                this.loading = true;
                apiDataFilter.request({
                    apiPath: 'record.getRecordList',
                    method: 'post',
                    data: {
                        patientId: this.patientId,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                    },
                    successCallback: (res) => {
                        this.loading = false;
                        this.tableData = res.data.list;
                        this.pageTotal = res.data.total;
                    },
                    errorCallback: (err) => {
                        this.$message.error('数据加载失败，请重试！')
                        this.loading = false;
                    },
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";

    .order-list-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .content-box {
            padding: 20px;

            .table-box {

            }
        }
    }
</style>