<template>
    <div class="comments">
        <div class="comments-title">评论</div>
        <div class="my-comments" v-if="user">
            <el-row>
                <el-col :span="20" :offset="2">
                    <div class="comments-text">
                        <el-form ref="comment" :model="commentForm" :rules="commentRules">
                            <el-form-item prop="comment">
                                <el-input type="textarea" :disabled="isFetching" v-model="commentForm.comment" :rows="5" placeholder="写点什么吧"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="float-right" @click="submit('comment')" :loading="isFetching">评论</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="un-auth" v-else>
            <el-button type="primary" @click="login">登录后才可评论</el-button>
        </div>

        <div class="comments-list">
            <ul>
                <li v-for="item in commentList" :key="item._id">
                    <Reply :item="item" @getConversation="handleConver"></Reply>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import Reply from './reply.vue'
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        components: {
            Reply
        },
        props: ['commentList', 'user'],
        computed: {
            ...mapState({
                isFetching: ({ commentList }) => commentList.isFetching
            })
        },
        data() {
            return {
                //loading: false,
                commentForm: {
                    comment: ''
                },
                commentRules: {
                    comment: [
                        {
                            required: true,
                            message: '请输入评论'
                        }
                    ]
                }
            }
        },
        methods: {
            ...mapMutations({
               login: 'SHOW_LOGIN_DIALOG'
            }),
            ...mapActions([
                'addComment',
                'getConversation'
            ]),
            submit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.addComment({
                            aid: this.$route.params.aid,
                            content: this.commentForm.comment
                        })
                        this.$refs[formName].resetFields()
                    } else {
                        return false
                    }
                })
            },
            handleConver(cid) {
                this.getConversation(cid)
            }
        }
    }
</script>

<style lang="sass" type="text/scss">
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
        .un-auth {
            .el-button {
                display: block;
                margin: 40px auto 0;
            }
        }
        .comments-list {
            margin-top: 50px;
            ul {
                padding-left: 0;
                li {
                    list-style: none;
                }
            }
        }
    }
</style>