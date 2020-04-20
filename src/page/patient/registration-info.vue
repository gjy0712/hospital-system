<template>
    <div class="registration-info-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>医生排班信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <div class="content-box">
            <div class="department-box">
                <p class="department-image box-title">
                    <img :src="doctorInfo.picpath" alt="" class="image">
                </p>
                <div class="doctor-box">
                    <p class="department box-title">
                        医生姓名：
                        <span>{{doctorInfo.name}}</span>
                    </p>
                    <p class="department-Name box-title">
                        科室：
                        <span>{{doctorInfo.officeName}}</span>
                    </p>
                    <p class="department-career box-title">
                        职位：
                        <span class="total-number">{{doctorInfo.career}}</span>
                    </p>
                    <p class="box-title">
                        描述：
                        <span class="">{{doctorInfo.description}}</span>
                    </p>
                </div>
            </div>

            <div class="table-box">
                <el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="el-table-reset-lite-style">
                    <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="period" label="时间"></el-table-column>
                    <el-table-column prop="workTime" label="工作日"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status=== 0" type="danger" disable-transitions>停诊</el-tag>
                            <el-tag v-else type="success" disable-transitions>出诊</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleRegister(scope.row.id, scope.row)"
                                       :disabled="scope.row.status=== 0"
                                       type="primary"
                                       size="mini">
                                挂号
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
    import { USER } from '@/config/webstore'
    import { getLocalStore } from '@/utils/webstore-utils'

    export default {
        name: "registration-dialog",
        components: {
            PageHeader
        },
        data() {
            return {
                loading: false,
                doctorInfo: {
                    picpath: '',
                    name: '',
                    officeName: '',
                    description: '',
                    career: ''
                },
                doctorId: '',
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pageTotal: 0,
                patientId: '',
                patientName: ''
            }
        },
        created() {
            let userObj = JSON.parse(getLocalStore(USER))
            if (userObj) {
                this.patientId = userObj.id;
                this.patientName = userObj.name
            }
            this.doctorInfo = this.$route.query.doctorInfo || '';
            this.doctorId = this.$route.query.id

            this.getWorkDay()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val
                this.getWorkDay()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getWorkDay()
            },
            // 预约挂号
            handleRegister(id, row) {
                this.$confirm(
                    "您确认要预约该医生吗？",
                    "提示",
                    {
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        type: 'warning'
                    }
                ).then(() => {
                    apiDataFilter.request({
                        apiPath: 'record.insertRecord',
                        method: 'post',
                        data: {
                            patientId: this.patientId,
                            patientName: this.patientName,
                            workdayId: id,
                            doctorId: row.doctorId,
                            workTime: row.workTime,
                            period: row.period,
                        },
                        successCallback: (res) => {
                            // 成功
                            this.$notify({
                                title: '成功',
                                message: '预约成功',
                                type: "success"
                            });
                        },
                        errorCallback: (err) => {
                            // 失败
                            this.$notify.error({
                                title: '失败',
                                message: err.data.msg
                            });
                        },
                    })
                })
            },
            getWorkDay() {
                apiDataFilter.request({
                    apiPath: 'workday.getWorkDay',
                    method: 'post',
                    data: {
                        pageNum: 1,
                        pageSize: 10,
                        doctorId: this.doctorId
                    },
                    successCallback: (res) => {
                        if(res.data) {
                            this.tableData = res.data.list;
                            this.pageTotal = res.data.total;
                        }

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

    .registration-info-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .content-box {
            padding: 20px;

            .department-box {
                background-color: @gray-color ;
                border-radius: 5px;
                padding: 30px;
                .box-title {
                    padding: 10px;
                }
                .department-image {
                    width: 135px;
                    height: 160px;
                    display: inline-block;
                    margin: 0 30px 20px 50px;
                    .image {
                        width: 135px;
                        height: 160px;
                        border-radius: 50%;
                    }
                }
                .doctor-box {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 200px;
                }
            }

            .table-box {
                margin-top: 20px;;
            }

        }
    }
</style>