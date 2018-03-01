<template>
    <div class="conversation">
        <el-dialog title="查看对话" :visible="showConversation" :before-close="beforeClose">
            <ul>
                <li v-for="item in conversation" :key="item._id" class="comment-item">
                    <img :src="item.user_id.avatar" class="avatar">
                    <p class="top">
                        {{item.user_id.username}}<span class="author" v-if="articleDetail.author._id == item.user_id._id">（作者）</span>
                        <span class="reply-user-wrapper" v-if="item.inReplyToUser">
                            <span class="words"> 回复 </span>
                            {{ item.inReplyToUser.username }}<span class="author" v-if="articleDetail.author._id == item.inReplyToUser._id">（作者）</span>
                        </span>
                    </p>
                    <p class="comment">{{item.content}}</p>
                    <p class="bottom">
                        {{item.created | customTime}}
                    </p>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        props: ['conversation', 'articleDetail'],
        computed: {
            ...mapState({
                showConversation: ({ showdialog }) => showdialog.showConversation
            })
        },
        methods: {
            ...mapMutations({
                hide: 'HIDE_CONVER_DIALOG'
            }),
            beforeClose() {
                this.hide()
            }
        }
    }
</script>

<style  lang="sass" type="text/scss">
    .conversation {
        .el-dialog--small {
            width: 40%;
        }
        .el-dialog__body {
            padding: 30px 40px;
        }
        .el-dialog__header {
            position: relative;
            height: 24px;
            padding-top: 40px;
            padding-bottom: 0;
            .el-dialog__title {
                display: inline-block;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                font-size: 24px;
                font-weight: normal;
                text-align: center;
            }
            .el-dialog__headerbtn {
                position: absolute;
                right: -50px;
                top: 20px;
                i {
                    color: #fff;
                }
            }
        }

        ul {
            padding: 0;
            position: relative;
            max-height: calc(60vh - 100px);
            overflow: auto;
        }

        ul::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
        }

        ul::-webkit-scrollbar-thumb {
            border-radius: 12px;
            background-color: #DADADA;
            max-height: 50px;
        }

        .comment-item {
            padding-left: 60px;
            list-style: none;
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
    }
</style>