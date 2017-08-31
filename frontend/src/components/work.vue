<template>
    <div class="work-wrapper">
        <div class="work">
            <el-row>
                <el-col :span="16" :offset="4">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="标题">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                        <el-form-item label="内容">
                            <el-input type="textarea" v-model="form.content"></el-input>
                        </el-form-item>
                        <el-form-item label-width="80px">
                            <el-button type="primary" @click="onSubmit" class="btn" :loading="loading">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                form: {
                    title: '',
                    content: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.$message({
                        message: '恭喜你，这是一条成功消息',
                        type: 'success'
                    })
                }, 2000)
            }
        }
    }
</script>

<style lang="sass">
    .work-wrapper {
        background: #fff;
        margin:30px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        .work {
            padding-top: 30px;
        }
        .btn {
            float: right
        }
    }
</style>