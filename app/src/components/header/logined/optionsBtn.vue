<template>
    <span class="options-btn">
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
          this.handleChangePw()
          break
        case 'quit':
          this.logout()
          this.$router.push('/')
          break
        default:
          break
      }
    },
    handleChangePw() { }
  }
}
</script>

<style lang="scss">
.options-btn {
  .el-dropdown-link {
    color: #bfcbd9;
    .el-icon-setting {
      font-size: 20px;
    }
  }
}
</style>