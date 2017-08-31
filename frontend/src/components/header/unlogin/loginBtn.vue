<template>
    <span class="login-btn">
        <a href="javascript:;" @click="loginFormVisible = true" class="btn">登录</a>

        <el-dialog title="用户登录" :visible.sync="loginFormVisible">
            <div class="form-wrapper">
                <el-form :model="user" :rules="loginRules" ref="loginForm">
                    <el-form-item prop="name">
                        <el-input v-model="user.name" auto-complete="off" placeholder="用户名">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="user.remember">
                            <el-checkbox label="下次自动登录" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-button type="primary" @click="localLogin('loginForm')" :loading="loading" class="block-btn">确 定
                    </el-button>
                </el-form>
            </div>
        </el-dialog>
    </span>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                loading: false,
                loginFormVisible: false,
                user: {
                    name: '',
                    password: '',
                    remember: ''
                },
                loginRules: {
                    name: [
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
                'login'
            ]),
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
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .login-btn {
        .form-wrapper {
            width: 65%;
            margin: 0 auto;
            .block-btn {
                display: block;
                width: 100%;
            };
        }
    }
</style>