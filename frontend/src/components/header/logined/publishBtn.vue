<template>
    <span>
        <el-button type="primary" icon="edit" @click="showDialog"></el-button>
        <el-dialog title="发布" :visible="showPublish" :before-close="beforeClose" width="65%">
            <div class="form-wrapper">
              <el-form :model="textForm" :rules="textRules" ref="textForm">
                <el-form-item prop="title">
                    <el-input v-model="textForm.title" auto-complete="off" placeholder="标题">
                    </el-input>
                </el-form-item>
              </el-form>
                <!-- <el-form-item prop="content"> -->
                     <!-- <el-input type="textarea" :rows="5" v-model="textForm.content" placeholder="写点什么吧"></el-input> -->
              <vue-editor v-model="textForm.content"></vue-editor>
                <!-- </el-form-item> -->
              <el-button type="primary" @click="submit('textForm')" :loading="isLoading" class="btn">确 定</el-button>
            </div>
        </el-dialog>
    </span>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    import { VueEditor } from 'vue2-editor'

    export default {
        components: {
            VueEditor
        },
        computed: {
            ...mapState({
                options: ({ options }) => options.item,
                isLoading: ({ articleAdd }) => articleAdd.isLoading,
                user: ({ auth }) => auth.user,
                showPublish: ({ showdialog }) => showdialog.showPublish
            })
        },
        data() {
            return {
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
            ...mapActions([
                'addArticle',
            ]),
            ...mapMutations({
                showDialog: 'SHOW_PUBLISH_DIALOG',
                hideDialog: 'HIDE_PUBLISH_DIALOG'
            }),
            submit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.addArticle(this.textForm)
                    } else {
                        return false
                    }
                })
            },
            beforeClose() {
                this.hideDialog()
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
            margin-top: 15px;
        }
    }
</style>