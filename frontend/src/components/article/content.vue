<template>
    <div class="article-content">
        <div class="author">
            <img :src="articleDetail.author.avatar" class="avatar">
            <div class="info">
                <p class="name">{{ articleDetail.author.username }}</p>
                <time>{{ articleDetail.publish_time | customTime }}</time>
            </div>
            <el-button class="back" type="default" @click="back">返回</el-button>
        </div>
        <p class="title">
            {{ articleDetail.title }}
        </p>
        <div class="text">{{ articleDetail.content }}</div>
    </div>
</template>

<script>
    export default {
        props: ['articleDetail'],
        methods: {
            back() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .article-content {
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
    }
</style>