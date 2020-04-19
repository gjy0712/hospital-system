<template>
    <div class="my-work-container">
        <page-header :borderBottom="true">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您当前所在的位置</el-breadcrumb-item>
                <el-breadcrumb-item>排班信息</el-breadcrumb-item>
            </el-breadcrumb>
        </page-header>

        <div class="info-content">
            <div class="image">
                <img src="http://f1.yihuimg.com/TFS/upfile/doctor/75/ECF2339507C54FEDBDED70A3F207952E.jpg" alt="">
            </div>
            <div class="info-right">
                <div class="message">
                    <span class="common-font">医生名称：</span>
                    陈胜良
                </div>
                <div class="message">
                    <span class="common-font">科室：</span>
                    消化内科
                </div>
                <div class="message">
                    <span class="common-font">职位：</span>
                    主任医师
                </div>
                <div class="message">
                    <span class="small-font">年龄：</span>34
                    <div style="width: 50px;display: inline-block"></div>
                    <span class="small-font">性别：</span>男
                </div>
                <div class="message">
                    <span class="small-font">介绍：</span>
                    <p>反流性疾病、慢性便秘和腹泻等相关疾病的诊断治疗以及常规内窥镜检查。</p>
                </div>
            </div>
        </div>

        <div class="work-list">
            <common-schedule
                    class="schedule-content"
                    start="2020-04-20 07:00:00"
                    end="2020-04-20 18:00:00"
                    :datas="scheduleData"
                    :width="160"
                    :height="80"
                    :halfSplit="true"
                    granularity="hour"
                    @addHandle="addHandle"
                    @removeHandle="removeHandle"
            >
            </common-schedule>
        </div>
    </div>
</template>

<script>
    import { PageHeader } from '../../components/public'
    import commonSchedule from 'common-schedule'

    export default {
        name: "my-work",
        components: {
            PageHeader,
            commonSchedule
        },
        data() {
            return {
                scheduleData: {
                    '星期日': {
                        xName: '星期日',
                        sche: [
                            {
                                start: '2020-04-20 07:00:00', // 开始时间
                                end: '2020-04-20 10:00:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                    '星期一': {
                        xName: '星期一',
                        sche: [
                            {
                                start: '2020-04-20 13:00:00', // 开始时间
                                end: '2020-04-20 16:30:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                    '星期二': {
                        xName: '星期二',
                        sche: [
                            {
                                start: '2020-04-20 13:00:00', // 开始时间
                                end: '2020-04-20 16:30:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                    '星期三': {
                        xName: '星期三',
                        sche: [
                            {
                                start: '2020-04-20 07:00:00', // 开始时间
                                end: '2020-04-20 10:00:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                    '星期四': {
                        xName: '星期四',
                        sche: [
                            {
                                start: '2020-04-20 07:00:00', // 开始时间
                                end: '2020-04-20 10:00:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                    '星期五': {
                        xName: '星期五',
                        sche: [
                            {
                                start: '2020-04-20 07:00:00', // 开始时间
                                end: '2020-04-20 10:00:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                    '星期六': {
                        xName: '星期六',
                        sche: [
                            {
                                start: '2020-04-20 07:00:00', // 开始时间
                                end: '2020-04-20 10:00:00', // 结束时间
                                eventName: '出诊'
                            },
                        ],
                    },
                }
            }
        },
        created() {

        },
        methods: {
            addHandle() {

            },
            removeHandle() {

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/variables.less";

    .my-work-container {
        background-color: @default-color;
        padding-bottom: 20px;

        .info-content {
            padding: 20px;
            .image {
                display: inline-block;
                vertical-align: middle;
                margin: 0 50px;
                 & img {
                    width: 100px;
                     height: 120px;
                }
            }
            .info-right {
                display: inline-block;
                vertical-align: middle;
                align-items: center;
                margin-left: 160px;
                .message {
                    margin-bottom: 10px;
                    .common-font {
                        font-size: 25px;
                    }
                    .small-font {
                        font-size: 18px;
                    }
                }


            }
        }

        .schedule-content {
            width: 800px;
        }
    }
</style>