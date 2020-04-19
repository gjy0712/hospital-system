<template>
    <div class="admin-home-container">
        <hospital-header></hospital-header>
        <admin-aside></admin-aside>
        <div class="admin-content-box" :class="{'content-collapse':collapse}">
            <div class="admin-content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".admin-content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
    import HospitalHeader from '../header/hospital-header'
    import AdminAside from './admin-aside'
    import bus from '../bus';


    export default {
        name: "admin-home",
        components: {
            AdminAside,
            HospitalHeader
        },
        data() {
            return {
                tagsList: [],
                collapse: false,
            }
        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
        }
    }
</script>

<style lang="less">
    @import "../../../style/variables";

    .admin-home-container {
        .admin-content-box {
            position: absolute;
            left: 260px;
            right: 10px;
            top: 80px;
            bottom: 10px;
            padding-bottom: 30px;
            -webkit-transition: left .3s ease-in-out;
            transition: left .3s ease-in-out;
            background: @main-color;
        }

        .admin-content {
            width: auto;
            height: 100%;
            padding: 10px;
            overflow-y: scroll;
            box-sizing: border-box;
        }
    }
</style>