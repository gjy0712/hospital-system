<template>
    <div class="registration-info-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>医生排班信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'

    export default {
        name: "registration-dialog",
        components: {
            PageHeader
        },
    }
</script>

<style lang="less" scoped>

    .registration-info-container {

    }
</style>