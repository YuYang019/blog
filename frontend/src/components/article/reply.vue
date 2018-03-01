<template>
    <div class="comment-item" v-if="articleDetail">
        <img :src="item.user_id.avatar" class="avatar">
        <p class="top">
            {{item.user_id.username}}<span class="author" v-if="articleDetail.author._id == item.user_id._id">（作者）</span>
            <span class="reply-user-wrapper" v-if="item.inReplyToUser">
                <span class="words">
                    回复
                </span>
                {{ item.inReplyToUser.username }}<span class="author" v-if="articleDetail.author._id == item.inReplyToUser._id">（作者）</span>
                <span class="conversation" @click="getConver"><i class="el-icon-document"></i>查看对话</span>
            </span>
        </p>
        <p class="comment">{{item.content}}</p>
        <p class="bottom">
            {{item.created | customTime}}
            <span class="reply-btn" @click="showReply">回复</span>
        </p>
        <div class="reply-content" v-if="isShow">
            <img :src="item.user_id.avatar" class="avatar">
            <div class="content-wrapper">
                <el-form ref="reply" :model="replyForm" :rules="replyRules">
                    <el-form-item prop="reply">
                        <el-input type="textarea" :disabled="isFetching" v-model="replyForm.reply" :rows="2" placeholder="写点什么吧"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="float-right">
                            <span class="cancel" @click="hideReply">取消</span>
                            <el-button class="float-right" @click="submit('reply')" :loading="isFetching">评论</el-button>
                        </div>

                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        // 判断加不加（作者）
        computed: {
            ...mapState({
                //isFetching: ({ reply }) => reply.isFetching
                articleDetail: ({ articleDetail }) => articleDetail.item,
            })
        },
        props: ['item'],
        data() {
            return {
                isShow: false,
                isFetching: false,
                replyForm: {
                    reply: ''
                },
                replyRules: {
                    reply: [
                        {
                            required: true,
                            message: '请输入评论'
                        }
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'replyComment',
            ]),
            submit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.replyComment({
                            cid: this.item._id,
                            aid: this.$route.params.aid,
                            uid: this.item.user_id._id,
                            data: this.replyForm.reply
                        })
                        this.$refs[formName].resetFields()
                        this.isShow = false
                    } else {
                        return false
                    }
                })
            },
            getConver() {
                this.$emit('getConversation', this.item._id)
            },
            showReply() {
                this.isShow = true
            },
            hideReply() {
                this.isShow = false
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .comment-item {
        position: relative;
        font-size: 14px;
        list-style: none;
        margin-top: 32px;
        padding-left: 60px;
        &:last-child {
            border-bottom: none;
        }
        &:hover .bottom .reply-btn {
            display: block;
        }
        .avatar {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #ccc;
            left: 0;
        }
        .top {
            position: relative;
            margin-bottom: 0;
            color: #333;
            font-weight: 700;
            font-size: 16px;
            .author {
                color: #808080;
                font-weight: normal;
            }
            .reply-user-wrapper {
                .words {
                    font-weight: normal;
                    color: #555;
                    margin: 0 5px;
                }
                .conversation {
                    position: absolute;
                    right: 0;
                    top: 2px;
                    color: #808080;
                    font-weight: normal;
                    font-size: 14px;
                    cursor: pointer;
                    &:hover {
                        color: #555
                    }
                    i {
                        margin-right: 5px;
                    }
                }
            }
        }
        .comment {
            margin-top: 10px;
            margin-bottom: 10px;
            color: #333;
            font-size: 15px;
            line-height: 24px;
        }
        .bottom {
            margin-top: 10px;
            font-size: 14px;
            line-height: 32px;
            color: #808080;
            position: relative;
            .reply-btn {
                position: absolute;
                top: 0px;
                left: 70px;
                color: #555;
                font-size: 14px;
                cursor: pointer;
                display: none;
                &:hover {
                    color: #000
                }
            }
        }
    }

    .reply-content {
        position: relative;
        padding-top: 10px;
        padding-left: 60px;
        .avatar {
            position: absolute;
            left: 0;
            width: 40px;
            height:40px;
            border-radius: 50%;
            border: 1px solid #ccc;
        }
        .content-wrapper {
            .float-right {
                float: right;
                .cancel {
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 25px;
                    line-height: 32px;
                    cursor: pointer;
                    color: #555;
                    &:hover {
                        color: #000;
                    }
                }
                .el-button {
                    padding: 8px 20px;
                }
            }
            .el-form-item {
                margin-bottom: 0;
                padding-bottom: 20px;
                &:last-child {
                      padding-bottom: 15px;
                  }
            }
        }
    }
</style>