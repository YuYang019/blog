<template>
    <div class="header clearfix">
        <ul class="left-nav">
            <li>
                <router-link to="/">My Blog</router-link>
            </li>
        </ul>
        <div class="right-nav">
            <div class="login-nav" v-if="!(auth.token && auth.user)">
                <unlogin></unlogin>
            </div>
            <div class="user-nav" v-else>
                <logined></logined>
            </div>
        </div>
    </div>
</template>

<script>
import Logined from './logined/logined.vue'
import Unlogin from './unlogin/unlogin.vue'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      // 相当于 user: this.$store.state.user
      // 获取vuex，user模块的state
      auth: state => state.user
    })
  },
  created() {
    // user模块的state包括token和user
    if (this.auth.token) {
      this.getUserInfo()
    }
  },
  methods: {
    ...mapActions([
      'logout',
      'getUserInfo'
    ]),
  },
  components: {
    Logined, Unlogin
  }
}
</script>

<style lang="scss">
.clearfix::after {
  content: " ";
  display: table;
  clear: both;
}

.header {
  background-color: #324157;
  padding: 0 50px;
  .router-link-active {
    color: #58b7ff;
  }
  .left-nav {
    float: left;
    li {
      list-style: none;
      a {
        display: inline-block;
        color: #bfcbd9;
        text-decoration: none;
        &:hover {
          color: #58b7ff;
        }
      }
    }
  }
  .right-nav {
    float: right;
    cursor: default;
  }
}
</style>