<template>
    <span>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"><i class="el-icon-setting"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePw">修改密码</el-dropdown-item>
                <el-dropdown-item command="quit" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </span>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {

            }
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
            handleCommand(command) {
                switch (command) {
                    case 'changePw':
                        break;
                    case 'quit':
                        this.logout()
                        this.$router.push('/')
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    span {
        color: #bfcbd9;
        .el-dropdown-link {
            .el-icon-setting {
                font-size: 20px;
            }
        }
    }
</style>