<template>
    <div class="doctor-home-container">
        <hospital-header></hospital-header>
        <doctor-aside></doctor-aside>
        <div class="doctor-content-box" :class="{'content-collapse':collapse}">
            <div class="doctor-content">
                <transition name="move" mode="out-in">
                        <router-view></router-view>
                </transition>
                <el-backtop target=".doctor-content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
    import HospitalHeader from '../header/hospital-header'
    import DoctorAside from './doctor-aside'
    import bus from '../bus';

    export default {
        name: "doctor-home",
        components: {
            DoctorAside,
            HospitalHeader
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

<style lang="less">
    @import "../../../style/variables";

    .doctor-home-container {
        .doctor-content-box {
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

        .doctor-content {
            width: auto;
            height: 100%;
            padding: 10px;
            overflow-y: scroll;
            box-sizing: border-box;
        }
    }
</style>