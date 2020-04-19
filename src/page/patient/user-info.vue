<template>
    <div class="user-info-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'

    export default {
        name: "user-info",
        components: {
            PageHeader
        },
        created() {
        },
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";
    .user-info-container {
        background-color: @default-color;
        padding-bottom: 20px;
    }

</style>