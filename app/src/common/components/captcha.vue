<template>
  <el-row class="captcha-wrapper">
    <el-col :span="13">
      <el-input :value="value" @input="handleInput" auto-complete="off" placeholder="验证码"></el-input>
    </el-col>
    <el-col :span="9" :offset="2">
      <img class="captcha" @click="handleClick" :src="captchaUrl">
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    value: {
      type: String
    }
  },
  created() {
    // 其实这只是触发一个commit, 更新captchaUrl, 具体请求由img标签来进行
    this.getCaptcha()
  },
  computed: {
    ...mapState({
      captchaUrl: ({user}) => user.captchaUrl
    })
  },
  methods: {
    ...mapActions([
      'getCaptcha'
    ]),
    handleClick() {
      this.getCaptcha()
    },
    handleInput(val) {
      // 由父组件来改，子组件不修改数据，只派发改动
      this.$emit('input', val)
    },
  },
}
</script>

<style>
  .captcha {
    height: 38px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
