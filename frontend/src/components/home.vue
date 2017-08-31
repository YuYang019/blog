<template>
    <div class="home">
        <a class="item-wrapper" href="javascript:;" @click="showDetail">
            <div class="item">
                <el-row>
                    <el-col :span="24">
                        <el-card :body-style="{ padding: '15px 15px 10px 15px' }">
                            <p class="title" slot="header">
                                <a href="javascript:;">标题</a>
                            </p>
                            <div class="text">撒旦权威的期望</div>
                            <div class="bottom clearfix">
                                <span class="author">作者：{{ author }}</span>
                                <span class="comments">评论数：{{ comments }}</span>
                                <span class="pv">浏览数：{{ pv }}</span>
                                <time class="time">发表时间：{{ currentDate }}</time>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </a>

        <div class="detail-wrapper">
            <detail ref="detail"></detail>
        </div>
    </div>
</template>

<script>
    import detail from './detail.vue'

    export default {
        data() {
            return {
                isShowDetail: false,
                currentDate: '2012-2-21',
                comments: 20,
                pv: 12,
                author: 'weqeqew'
            }
        },
        methods: {
            showDetail() {
                this.$refs.detail.show()
            }
        },
        components: {
            detail
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .home {
        position: relative;
        margin: 30px 150px;
        background: #fff;
        .item-wrapper {
            color: #333
        }
        .item {
            text-decoration: none;
            .title {
                margin: 0;
                a {
                    display: block;
                    font-size: 18px;
                    text-decoration: none;
                    color: #333;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            .text {
                font-size: 16px;
            }
           .bottom {
               margin-top: 20px;
               font-size:14px;
               color: #666;
               span {
                   margin-right: 20px;
               }
               .time {
                   float: right;
               }
           }
        }
        .detail-wrapper {
            margin-bottom: 30px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    }
</style>