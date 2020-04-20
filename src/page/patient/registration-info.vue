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
            </div>
        </div>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'

    export default {
        name: "registration-dialog",
        components: {
            PageHeader
        },
        data() {
            return {
                doctorInfo: {
                    name: '',
                    officeName: '',

                }
            }
        },
        created() {
            this.doctorInfo = this.$route.query.doctorInfo
            console.log(this.doctorInfo)
        },
        methods: {

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