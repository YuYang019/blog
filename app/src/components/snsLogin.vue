<template>
  <ul class="snslogin">
    <li>
      <a href="javascript:;" @click="handleClick">
         <i class="icon iconfont el-icon-github"></i>
      </a>
    </li>
    <!-- <li>
      <a href="javascript:;">
        <i class="icon iconfont el-icon-qq"></i>
      </a>
    </li> -->
  </ul>
</template>

<script>
export default {
  methods: {
    handleClick() {
      window.location.href = 'http://127.0.0.1:3000/github/oauth/login'
    }
  }
}
</script>

<style lang="scss">
.snslogin {
  padding-left: 0;
  text-align: center;
  li {
    display: inline-block;
    list-style: none;
    a {
      i {
        font-size: 32px;
      }
      &:hover .el-icon-qq {
        color: #15a7f0;
      }
      &:hover .el-icon-github {
        color: #49be38;
      }
    }
  }
}
</style>
