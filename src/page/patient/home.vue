<template>
    <div class="home-container">
<!--        轮播图-->
        <div class="swiper-content">
            <swiper :options="swiperOption" v-if="banner.length!==0">
                <swiper-slide v-for="(item, index) in banner" data-index="index" :key="index">
                    <img :src="item">
                </swiper-slide>

                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>

<!--        健康必读-->
        <div class="box">
            <div class="box-title">健康必读</div>
            <el-row :gutter="12">
                <el-col :span="8" class="health-content">
                    <el-card shadow="hover">
                        <div class="health-detail">
                            <img src="../../assets/img/heath_1.jpg" alt="" width="120" height="90">
                            <p class="health-p">宝宝有O型腿/X型腿，是缺钙吗？需要矫正吗？3种情况别大意！</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" class="health-content">
                    <el-card shadow="hover">
                        <div class="health-detail">
                            <img src="../../assets/img/health_3.jpg" alt="" width="120px" height="90px">
                            <p class="health-p">只是配个眼镜,却查出差点失明!忽视眼睛“年检”,当心这些风险</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" class="health-content">
                    <el-card shadow="hover">
                        <div class="health-detail">
                            <img src="../../assets/img/health_2.jpg" alt="" width="120" height="90">
                            <p class="health-p">疫情不解除不敢上医院？免费申请家庭病床，在家就能看病！</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

<!--        推荐医生-->
        <div class="box">
            <div class="box-title">推荐医生</div>
            <el-row :gutter="20">
                <el-col :span="4"
                        v-for="(item, index) in doctorList"
                        :key="index"
                        :offset="index > 0 ? 2 : 0"
                        style="margin-bottom:30px">
                    <el-card :body-style="{ padding: '0px' }" class="recommend-card">
                        <div class="save-picture">
                            <img class="avatar-image" :src="item.picPath" alt="">
                        </div>
                        <h4>{{item.doctorName}}</h4>

                        <el-divider></el-divider>
                        <!--                        擅长-->
                    </el-card>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import apiDataFilter from "../../utils/apiDataFilter";
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "home",
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                banner: [
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201907/04/9fa0ac7d89104a8da9de8d46c5486deb.png',
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201905/17/c025815ecd0b4579beef1033a3d85e81.png',
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201907/04/0d641c7577354d8d9125381aa465ad03.png',
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201905/17/21c3be5a20c143629e049a08ab5bf2cd.png',
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201905/17/9b247034807442a7b327e0a003b74848.png',
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201905/17/f030d976b7e24fd0aee5e300a8d93fb1.png',
                    'https://f1.yihuimg.com/TFS/upfile/ZIXUN/201907/04/6007a96cf3674d39acea5d22ca45cc05.png'
                ],
                // 轮播图
                swiperOption: {
                    // 所有的参数同 swiper 官方 api 参数一样
                    //
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    // 设置显示容器同时显示的数量
                    sldesPerView: 1,
                    // 初始化首页的索引
                    // initalSlide: 1,
                    // 自动切换时间
                    autoplay: {
                        delay: 1500,
                        stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
                        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
                        reverseDirection: false, //开启反向自动轮播。
                        waitForTransition: true, //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
                        // 擦做 swiper 后， 不停止切换
                    },
                    speed: 3000,
                    // paginationClickable: true,
                    spaceBetween: 30,
                    loop: true
                },
                activeName: 'internal_medicine',
                doctorList: []
            }
        },
        created() {
            this.swiperOption.autoplay = this.banner.length !== 1 ? { //控制只有一张图片的时候不自动轮播
                delay: 1500,
                stopOnLastSlide: false,
                disableOnInteraction: false
            } : false;
            // this.getDoctorList()
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            getDoctorList() {
                apiDataFilter.request({
                    apiPath: 'patient.doctorList',
                    method: 'post',
                    data: '',
                    successCallback : (res) => {
                        this.doctorList = res.data.doctorInfoList
                        console.log(this.doctorList)
                    }
                })
            }
        }
    }

</script>

<style lang="less" scoped>
    @import "../../style/mixins/flex";

    .home-container {
        .swiper-content {
            width: 890px;
            margin: 0 auto;
        }

        .box {
            margin-top: 30px;

            .box-title {
                margin-bottom: 10px;
                font-size: 22px;
            }
            .recommend-card {
                width: 250px;

                .save-picture {
                    padding: 10px;
                    width: 100%;
                    height: 120px;
                    line-height: 60px;
                    .flex();
                    .justify-content(center);

                    .avatar-image {
                        display: inline-block;
                        border-radius: 50%;
                        width: 100px;
                        height: 100px;
                    }
                }
            }

            .health-content {
                cursor: pointer;

                .health-detail {
                    width: 100%;
                    height: 100%;
                    .flex();
                    .justify-content(center);

                    .health-p {
                        margin-left: 10px;
                        font-size: 12px;
                        .flex();
                        .align-items(center);
                    }
                }

                .health-detail:hover {
                    color: #409eff;
                }
            }
        }
    }
</style>