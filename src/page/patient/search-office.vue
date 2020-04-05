<template>
    <div class="search-office-container">
        <PageHeader>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>按科室挂号</el-breadcrumb-item>
            </el-breadcrumb>
        </PageHeader>
    </div>
</template>

<script>
    import { PageHeader } from '@/components/public'
    export default {
        name: "search-office",
        components: {
            PageHeader
        }
    }
</script>

<style lang="less" scoped>
    .search-office-container {

    }
</style>