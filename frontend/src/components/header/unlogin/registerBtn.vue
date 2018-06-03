<template>
    <span class="register-btn">
        <a href="javascript:;" @click="showDialog" class="btn">注册</a>

        <el-dialog title="用户注册" size="tiny" :visible.sync="showRegister" :before-close="beforeClose" width="30%">
            <div class="form-wrapper">
                <el-form :model="registerForm" :rules="registerRules" ref="register">
                    <el-form-item prop="username">
                        <el-input v-model="registerForm.username" auto-complete="off" placeholder="用户名">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"
                                  placeholder="确认密码">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <captcha :value="registerForm.captcha" @input="handleCaptcha"></captcha>
                    </el-form-item>  
                    <el-button type="primary" @click="localregister('register')" :loading="loading" class="block-btn">确 定
                    </el-button>
                </el-form>
            </div>
        </el-dialog>
    </span>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex'
    import Captcha from '@/common/components/captcha'

    export default {
        components: {
            Captcha
        },
        computed: {
            ...mapState({
                showRegister: ({ showdialog }) => showdialog.showRegister
            })
        },
        data() {
            let validatePass = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.register.validateField('checkPass');
                    }
                    cb();
                }
            };
            let validatePass2 = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请再次输入密码'))
                } else if (value !== this.registerForm.password) {
                    cb(new Error('两次输入密码不一致'))
                } else {
                    cb()
                }
            };
            return {
                loading: false,
                registerForm: {
                    username: '',
                    password: '',
                    checkPass: '',
                    captcha: '',
                },
                registerRules: {
                    username: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 10,
                            message: '长度在 3 到 10 个之间',
                        }
                    ],
                    password: [
                        {
                            validator: validatePass,
                            trigger: 'blur'
                        }
                    ],
                    checkPass: [
                        {
                            validator: validatePass2,
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'register'
            ]),
            ...mapMutations({
                showDialog: 'SHOW_REGISTER_DIALOG',
                hideDialog: 'HIDE_REGISTER_DIALOG'
            }),
            localregister(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
//                        this.loading = true
//                        setTimeout(() => {
//                            this.registerFormVisible = false
//                            this.loading = false
//                            this.$message({
//                                message: '恭喜你，这是一条成功消息',
//                                type: 'success'
//                            });
//                        }, 2000)
                        this.register(this.registerForm)
                    } else {
                        return false
                    }
                })
            },
            handleCaptcha(value) {
                this.registerForm = {
                    ...this.registerForm,
                    captcha: value,
                }
            },
            beforeClose() {
                this.hideDialog()
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .register-btn {
        .form-wrapper {
            margin: 0 auto;
            .block-btn {
                display: block;
                width: 100%;
            };
        }
    }
</style>