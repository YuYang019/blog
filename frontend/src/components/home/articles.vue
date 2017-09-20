<template>
    <div class="articles">
        <ul>
            <li class="item" v-for="item in articleList">

                <el-card :body-style="{ padding: '25px 15px 15px 15px' }">
                    <div class="top">
                        <span class="author">{{ item.author.username }} </span>
                        <span class="time"> · {{ item.publish_time | customTime }}</span>

                    </div>
                    <p class="title">
                        <router-link :to="{ name: 'article', params: { aid: item._id } }">{{ item.title }}</router-link>
                    </p>
                    <div class="bottom">
                        <span class="pv">阅读 {{ item.visit_count }}</span>
                        <span class="comments"> · 评论 {{ item.comment_count }}</span>
                        <span class="like"> · 喜欢 {{ item.like_count }}</span>
                    </div>
                </el-card>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        props: ['articleList'],
    }
</script>

<style  lang="sass" type="text/scss" scoped>
    .articles {
        ul {
            padding: 0;
            margin: 0;
            .item {
                list-style: none;
                margin-bottom: 25px;
                .el-card {
                    box-shadow: 0 0 2px lightgrey;
                    border: 1px solid lightgray;
                }
                .top {
                    font-size: 12px;
                    color: #555;
                }
                .title {
                    a {
                        font-size: 18px;
                        line-height: 1.5;
                        color: #555;
                        font-weight: 600;
                        text-decoration: none;
                        &:hover {
                            color: #000;
                        }
                    }
                }
                .bottom {
                    font-size: 12px;
                    color: #555;
                }
            }
        }
    }
</style>