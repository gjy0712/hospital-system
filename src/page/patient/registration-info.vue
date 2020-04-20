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

            </div>
        </div>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'
    import apiDataFilter from "../../utils/apiDataFilter";

    export default {
        name: "registration-dialog",
        components: {
            PageHeader
        },
        data() {
            return {
                doctorInfo: {
                    picpath: '',
                    name: '',
                    officeName: '',
                    description: '',
                    career: ''
                },
                doctorId: ''
            }
        },
        created() {
            this.doctorInfo = this.$route.query.doctorInfo || '';
            this.doctorId = this.$route.query.id

            this.getWorkDay()
        },
        methods: {

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

        }
    }
</style>