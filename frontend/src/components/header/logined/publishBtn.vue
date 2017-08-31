<template>
    <span>
        <el-button type="primary" icon="edit" @click="textFormVisible = true"></el-button>
        <el-dialog title="发布" :visible.sync="textFormVisible">
            <div class="form-wrapper">
            <el-form :model="textForm" :rules="textRules" ref="textForm">
                <el-form-item prop="title">
                <el-input v-model="textForm.title" auto-complete="off" placeholder="标题">
                </el-input>
                </el-form-item>
                <el-form-item prop="content">
                     <el-input type="textarea" :rows="5" v-model="textForm.content" placeholder="写点什么吧"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submit('textForm')" :loading="loading" class="btn">确 定
                </el-button>
            </el-form>
            </div>
        </el-dialog>
    </span>
</template>

<script>
    export default {
        data() {
            return {
                textFormVisible: false,
                loading: false,
                textForm: {
                    title: '',
                    content: ''
                },
                textRules: {
                    title: [
                        {
                            required: true,
                            message: '请输入标题'
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: '请输入内容',
                        }
                    ]
                }
            }
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.textFormVisible = false,
                        //this.loading = true
                        this.$message({
                            message: '恭喜你，这是一条成功消息',
                            type: 'success'
                        })
                        this.$refs[formName].resetFields()
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    span {
        margin: 0 15px;
        &>.el-button {
            padding: 5px 8px;
        }
        .btn {
            float: right;
            margin-bottom: 15px;
        }
    }
</style>