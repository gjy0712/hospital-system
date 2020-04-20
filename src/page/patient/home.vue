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
                        <div class="health-detail" @click="handleRouterBaby()">
                            <div style="display: inline-block">
                                <img src="../../assets/img/heath_1.jpg" alt="" width="120px" height="90px">
                            </div>
                            <p class="health-p">宝宝有O型腿/X型腿，是缺钙吗？需要矫正吗？3种情况别大意！</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" class="health-content">
                    <el-card shadow="hover">
                        <div class="health-detail" @click="handleRouterGlass()">
                            <div style="display: inline-block">
                                <img src="../../assets/img/health_3.jpg" alt="" width="120px" height="90px">
                            </div>
                            <p class="health-p">只是配个眼镜,却查出差点失明!忽视眼睛“年检”,当心这些风险</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8" class="health-content">
                    <el-card shadow="hover">
                        <div class="health-detail" @click="handleRouterHospital()">
                            <div style="display: inline-block">
                                <img src="../../assets/img/health_2.jpg" alt="" width="120px" height="90px">
                            </div>
                            <p class="health-p">疫情不解除不敢上医院？免费申请家庭病床，在家就能看病！</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

<!--        推荐医生-->
        <!--<div class="box">
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
                        &lt;!&ndash;                        擅长&ndash;&gt;
                    </el-card>
                </el-col>
            </el-row>

        </div>-->

        <div class="box">
            <div class="box-title">养生小知识</div>
                <div class="content-box">
                    生活要有规律的养生知识。有自制力的人，才能让自己过上较为规律的生活。
                    而有这种品质的人，也更能为了健康控制自己的饮食、作息。
                    这种健康规律的生活，有助于让身体保持在较为稳定的平衡状态，这对各器官组织的功能、免疫力都至关重要。
                    要知道，随着我们年岁渐长，这种平衡越来越不容易保持，
                    因此，能尽量让生活规律，就意味着你的免疫力可能更强，机体功能更正常。 当然平时也要注意多运动哟！
                </div>
        </div>

        <div class="box">
            <div class="box-title">就诊指南</div>
            <div class="treatment-guide">
                <p>一、就诊时请主动出示医保卡（证）。</p>
                <p>二、如不在本院取药，提前告知医生。</p>
                <p>三、开具诊断证明和休假证明当日盖章有效。</p>
                <p>四、持医保刷卡交费，如遇特殊情况退费必须在6日内办理。</p>
                <p>五、复印住院病历携带患者和代理人身份证原件于出院后10个工作日（遇节假日顺延）到行政楼院内病案室办理。</p>
                <p>六、医院为无烟医院，就诊期间禁止吸烟，不要随地吐痰、大声喧哗。</p>
            </div>

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
            // this.getRecommendDoctor()
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            // 宝宝
            handleRouterBaby() {
                window.open('https://www.yihu.com/article/show/b67406c4dc820d0d3c19c2d02791b23a.shtml') ;
            },
            // 眼睛的健康必读
            handleRouterGlass() {
                window.open('https://www.yihu.com/article/show/72ca5ee47bba260228cf7bd4a2dcafa6.shtml') ;
            },
            // 疫情
            handleRouterHospital() {
                window.open('https://www.yihu.com/article/show/158f1d05c08249376c02cb06eb1f1866.shtml') ;
            },
            getRecommendDoctor() {
                apiDataFilter.request({
                    apiPath: 'doctor.getRecommendDoctor',
                    method: 'post',
                    data: {
                        pageNum: 1,
                        pageSize: 10
                    },
                    successCallback : (res) => {
                        if(res.data) {
                            this.doctorList = res.data.list

                        }
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

            .content-box {
                width: 90%;
                margin: 0 auto;
                height: 200px;
                line-height: 50px;
                padding: 0 10px;
                border: 1px solid #5e5e5e;
                border-radius: 5px;
                text-indent:2em;
            }

            .treatment-guide {
                width: 500px;
                margin-left: 50px;
                height: 320px;
                line-height: 40px;
                padding: 0 10px;
                border: 1px solid #5e5e5e;
                border-radius: 5px;
                text-indent:2em;
                background: url("../../assets/img/login-bg1.jpg") 500px 320px no-repeat;
                background-size: 500px 320px;
            }
        }
    }
</style>