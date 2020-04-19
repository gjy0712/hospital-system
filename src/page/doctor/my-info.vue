<template>
<div class="my-info-container">
    <page-header :borderBottom="true">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
            <el-breadcrumb-item>我的信息</el-breadcrumb-item>
        </el-breadcrumb>
    </page-header>
</div>
</template>

<script>
    import { PageHeader } from '../../components/public'
    export default {
        name: "my-info",
        components: {
            PageHeader
        },
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";
    .my-info-container {
        background-color: @default-color;
        padding-bottom: 20px;
    }
</style>