<template>
        <div class="article">
                <el-row>
                    <el-col :span="14" :offset="5">
                        <el-card :body-style="{ padding: '30px 30px 50px 30px' }">
                            <ArticleContent v-if="articleDetail" :articleDetail="articleDetail"></ArticleContent>
                            <Like @like="handleToggleLike"></Like>
                            <Prenext :next="nextArticle" :prev="prevArticle"></Prenext>
                            <span class="split"></span>
                            <el-row>
                                <el-col :span="20" :offset="2">
                                    <Comment v-if="commentList" :commentList="commentList" :user="user"></Comment>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <Conversation v-if="conversation && conversation.length" :conversation="conversation" :articleDetail="articleDetail"></Conversation>
                <ScrollTop></ScrollTop>
        </div>
</template>

<script>
    import Comment from './comment.vue'
    import Like from './like.vue'
    import Prenext from './prenext.vue'
    import ArticleContent from './content.vue'
    import ScrollTop from './scrollTop.vue'
    import Conversation from './conversation.vue'
    import { mapState, mapActions } from 'vuex'

    export default {
        components: {
            Comment, Like, Prenext, ArticleContent, ScrollTop, Conversation
        },
        computed: {
            ...mapState({
                user: ({ auth }) => auth.user,
                articleDetail: ({ articleDetail }) => articleDetail.item,
                nextArticle: ({ articlePrenext }) => articlePrenext.next,
                prevArticle: ({ articlePrenext }) => articlePrenext.prev,
                commentList: ({ commentList }) => commentList.items,
                conversation: ({ conversation }) => conversation.item,
                //showConversation: ({ showdialog }) => showdialog.showConversation,
                aid: ({ route }) => route.params.aid
            })
        },
        created () {
            //console.log(this.user)
            this.initData()
        },
        watch: {
            '$route': 'initData',
            'user': 'initData'
        },
        methods: {
//            submit(formName) {
//                this.$refs[formName].validate(valid => {
//                    if (valid) {
//                        this.loading = true
//                        setTimeout(() => {
//                            this.loading = false
//                            this.$message({
//                                message: '恭喜你，这是一条成功消息',
//                                type: 'success'
//                            });
//                            this.$refs[formName].resetFields()
//                        }, 2000)
//                        console.log(this.commentForm)
//                    } else {
//                        return false
//                    }
//                })
//            }
            ...mapActions([
                'getPrenext',
                'getArticleDetail',
                'getCommentList',
                'toggleLike',
                'addComment'
            ]),
            initData() {
                const aid = this.$route.params.aid
                console.log(this.user)

                this.getPrenext(aid)
                this.getCommentList(aid)

                // 一个坑，action不接受两个参数，要么传一个对象，要么传一个参数
                this.getArticleDetail({ aid: aid, user: this.user})
            },
            handleToggleLike() {
                if (this.user) {
                    this.toggleLike(this.$route.params.aid)
                }
            },
            handleSubmitComment(content) {
                if (this.user) {
                    //this.addComment({ aid: this.$route.params.aid, content: content })
                }
            }
        }
    }
</script>

<style lang="sass" type="text/scss">
    .float-right {
        float: right;
    }

    .article {
        margin-bottom: 25px;
        text-decoration: none;
        .el-card {
            box-shadow: 0 0 2px lightgrey;
            border: 1px solid lightgray;
        }
    }

    .split {
        display: block;
        height: 1px;
        background: #ccc;
        margin: 30px 0;
    }

</style>