<template>
    <div class="patient-home-container">
        <v-header></v-header>
        <patient-aside></patient-aside>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive >
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from '../header/header'
    import PatientAside from './patient-aside'
    import bus from '../bus';


    export default {
        name: "patient-home",
        components: {
            PatientAside,
            vHeader
        },
        data() {
            return {
                // tagsList: [],
                collapse: false,
            }
        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });

            /*// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });*/
        }
    }
</script>

<style lang="less" >
    @import "../../../style/variables";
    .patient-home-container {
        .content-box {
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

        .content {
            width: auto;
            height: 100%;
            padding: 10px;
            overflow-y: scroll;
            box-sizing: border-box;
        }
    }
</style>