<template>
    <a href="javascript:;" class="like" @click="like">
        <span class="like-content"><i :class="isLike ? 'el-icon-star-on' : 'el-icon-star-off'"></i> 喜欢</span>
        <span class="like-count">{{ likeCount }}</span>
    </a>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isLike: ({ articleDetail }) => articleDetail.item.isLike,
      likeCount: ({ articleDetail }) => articleDetail.item.like_count
    })
  },
  methods: {
    like() {
      this.$emit('like')
    }
  }
}
</script>

<style lang="scss" scoped>
.like {
  display: block;
  position: relative;
  margin-bottom: 30px;
  width: 160px;
  height: 50px;
  line-height: 50px;
  text-decoration: none;
  border: 1px solid #37c700;
  border-radius: 40px;
  color: #37c700;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    background: rgba(0, 221, 17, 0.3);
  }
  .like-content,
  .like-count {
    display: inline-block;
    text-align: center;
    font-size: 18px;
  }
  .like-content {
    position: absolute;
    left: 0;
    width: 70%;
    border-right: 1px solid #37c700;
  }
  .like-count {
    position: absolute;
    right: 0;
    width: 30%;
  }
}
</style>