<template>
    <span class="login-btn">
        <a href="javascript:;" @click="showDialog" class="btn">登录</a>

        <el-dialog title="用户登录" size="tiny" :visible="showLogin" :before-close="beforeClose" width="30%">
            <div class="form-wrapper">
                <el-form :model="user" :rules="loginRules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="user.username" auto-complete="off" placeholder="用户名">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <!-- <el-row>
                            <el-col :span="13">
                                <el-input v-model="user.captcha" auto-complete="off" placeholder="验证码"></el-input>
                            </el-col>
                            <el-col :span="9" :offset="2">
                                 <img class="captcha" @click="handleCaptcha" :src="captchaUrl">
                            </el-col>
                        </el-row> -->
                        <captcha :value="user.captcha" @input="handleCaptcha"></captcha>
                    </el-form-item>
                    <!--<el-form-item>-->
                        <!--<el-checkbox-group v-model="user.remember">-->
                            <!--<el-checkbox label="下次自动登录" name="type"></el-checkbox>-->
                        <!--</el-checkbox-group>-->
                    <!--</el-form-item>-->
                    <el-button type="primary" @click="localLogin('loginForm')" :loading="loading" class="block-btn">确 定
                    </el-button>
                </el-form>
                <div class="split"></div>
                <p class="text">您还可以通过以下方式登录</p>
                <sns-login></sns-login>
            </div>
        </el-dialog>
    </span>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex'
    import Captcha from '@/common/components/captcha'
    import SnsLogin from '../../snsLogin'

    export default {
        components: {
            Captcha, SnsLogin
        },
        computed: {
            ...mapState({
                showLogin: ({ showdialog }) => showdialog.showLogin,
                captchaUrl: ({user}) => user.captchaUrl
            })
        },
        created(){
            console.log(this.showLogin)
        },
        data() {
            return {
                loading: false,
                user: {
                    username: '',
                    password: '',
                    captcha: ''
                },
                loginRules: {
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
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            // 将vuex中写好的login方法混入当前methods
            ...mapActions([
                'login',
                'getCaptcha'
            ]),
            ...mapMutations({
                showDialog: 'SHOW_LOGIN_DIALOG',
                hideDialog: 'HIDE_LOGIN_DIALOG'
            }),
            handleCaptcha(value) {
                this.user = {
                    ...this.user,
                    captcha: value
                }
            },
            localLogin(formName) {
                //console.log(this.loginForm)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //this.loading = true
                        this.login(this.user)
                        //console.log(this.loginForm)
                    } else {
                        return false
                    }
                })
            },
            beforeClose() {
                this.hideDialog()
                this.$refs.loginForm.clearValidate()
            }
        }
    }
</script>

<style lang="sass" type="text/scss">
    .login-btn {
        .form-wrapper {
            
            margin: 0 auto;
            .block-btn {
                display: block;
                width: 100%;
            }
        }
        .captcha {
            height: 38px;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .text {
            text-align: center
        }
    }
</style>