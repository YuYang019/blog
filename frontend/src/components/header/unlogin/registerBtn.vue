<template>
    <span class="register-btn">
        <a href="javascript:;" @click="registerFormVisible = true" class="btn">注册</a>

        <el-dialog title="用户注册" :visible.sync="registerFormVisible">
            <div class="form-wrapper">
                <el-form :model="registerForm" :rules="registerRules" ref="register">
                    <el-form-item prop="name">
                        <el-input v-model="registerForm.name" auto-complete="off" placeholder="用户名">
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
                    <el-button type="primary" @click="register('register')" :loading="loading" class="block-btn">确 定
                    </el-button>
                </el-form>
            </div>
        </el-dialog>
    </span>
</template>

<script>
    export default {
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
                registerFormVisible: false,
                registerForm: {
                    name: '',
                    password: '',
                    checkPass: ''
                },
                registerRules: {
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
            register(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.loading = true
                        setTimeout(() => {
                            this.registerFormVisible = false
                            this.loading = false
                            this.$message({
                                message: '恭喜你，这是一条成功消息',
                                type: 'success'
                            });
                        }, 2000)
                    } else {
                        return false
                    }
                })
            },
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .register-btn {
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