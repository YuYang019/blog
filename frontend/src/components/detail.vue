<template>
    <transition name="move">
        <div class="detail" v-show="showFlag">
            <div class="item">
                <el-row>
                    <el-col :span="24">
                        <el-card :body-style="{ padding: '30px 30px 20px 30px' }">
                            <div class="author">
                                <img src="" class="avatar">
                                <div class="info">
                                    <p class="name">用户asd</p>
                                    <time>13-13-213</time>
                                </div>
                                <el-button class="back" type="default" @click="back">返回</el-button>
                            </div>
                            <p class="title">
                                哇哇哇
                            </p>
                            <div class="text">撒旦权威的期望</div>
                            <div class="split"></div>
                            <el-row>
                                <el-col :span="20" :offset="2">
                                    <div class="comments">
                                        <div class="comments-title">评论</div>
                                        <div class="my-comments">
                                            <el-row>
                                                <el-col :span="20" :offset="2">
                                                    <div class="comments-text">
                                                        <el-form ref="comment" :model="commentForm" :rules="commentRules">
                                                            <el-form-item prop="comment">
                                                                <el-input type="textarea" :disabled="loading" v-model="commentForm.comment" :rows="5" placeholder="写点什么吧"></el-input>
                                                            </el-form-item>
                                                            <el-form-item>
                                                                <el-button type="primary" class="float-right" @click="submit('comment')" :loading="loading">评论</el-button>
                                                            </el-form-item>
                                                        </el-form>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <div class="comments-list">
                                            <ul>
                                                <li v-for="item in items" class="comment-item">
                                                    <p class="name">{{item.name}}</p>
                                                    <p class="comment">{{item.text}}</p>
                                                    <p class="bottom">{{item.time}}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                showFlag: false,
                commentForm: {
                    comment: ''
                },
                items: [
                    {
                        name: 'qwead',
                        text: 'sdqwdqwd',
                        time: '2017-2-3'
                    },
                    {
                        name: 'asdqwd',
                        text: 'sdqwdqwd',
                        time: '2017-2-3'
                    }
                ],
                commentRules: {
                    comment: [
                        {
                            required: true,
                            message: '请输入用户名'
                        }
                    ]
                }
            }
        },
        methods: {
            show() {
                this.showFlag = true
            },
            back() {
                this.showFlag = false
            },
            submit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.loading = true
                        setTimeout(() => {
                            this.loading = false
                            this.$message({
                                message: '恭喜你，这是一条成功消息',
                                type: 'success'
                            });
                            this.$refs[formName].resetFields()
                        }, 2000)
                        console.log(this.commentForm)
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .float-right {
        float: right;
    }

    .move-enter, .move-leave-to {
        opacity: 0;
        transform: translate(30% , 0);
    }
    .move-enter-active, .move-leave-active {
        transition: all .2s linear
    }
    .move-enter-to, .move-leave {
        opacity: 1;
        transform: translate(0, 0);
    }

    .split {
        height: 1px;
        background: #ccc;
        margin: 30px 0;
    }

    .detail {
        background: #fff;

        .item {
            text-decoration: none;
            .author {
                display: flex;
                align-items: center;
                font-size: 14px;
                position: relative;
                .back {
                    position: absolute;
                    right: 0;
                }
                .avatar {
                    width: 3.4em;
                    height: 3.4em;
                    border: 1px solid #000;
                }
                .info {
                    margin-left: 1.3em;
                    .name {
                        margin: 0 0 0.8em 0;
                        color: #666;
                    }
                    time {
                        color: #999
                    }
                }
            }
            .title {
                margin: 30px 0;
                font-size: 32px;
                font-weight: 700;
                color: #333;
            }
            .text {
                font-size: 16px;
                margin-bottom: 50px;
            }
            .comments {
                .comments-title {
                    margin: 20px 0;
                    font-size: 16px;
                    color: #909090;
                    text-align: center;
                }
                .my-comments {
                    background: #f8f9fa;
                    border: 1px solid #f1f1f1;
                    border-radius: 10px;
                    .comments-text {
                        margin-top: 30px;
                    }
                }
                .comments-list {
                    margin-top: 50px;
                    ul {
                        padding-left: 0;
                    }
                    .comment-item {
                        font-size: 14px;
                        list-style: none;
                        border-bottom: 1px solid #ccc;
                        &:last-child {
                            border-bottom: none;
                        }
                        .name {
                            color: #333;
                            font-weight: 700;
                        }
                        .comment {
                            color: #333;
                            line-height: 1.7;
                        }
                        .bottom {
                            font-size: 12px;
                            color: #cacaca;
                        }
                    }
                }
            }

        }
    }
</style>