<template>
    <div class="prenext">
        <span class="pre" v-if="!!prev._id">
            <router-link :to="{ name: 'article', params: { aid: prev._id } }">上一篇：{{ prev.title }}</router-link>
        </span>
        <span class="next" v-if="!!next._id">
            <router-link :to="{ name: 'article', params: { aid: next._id } }">下一篇：{{ next.title }}</router-link>
        </span>
    </div>
</template>

<script>
export default {
  props: ['next', 'prev']
}
</script>

<style lang="scss" scoped>
.prenext {
  display: flex;
  .pre,
  .next {
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      text-decoration: none;
      color: #555;
      &:hover {
        color: #000;
      }
    }
  }
  .pre {
    text-align: left;
  }
  .next {
    text-align: right;
  }
}
</style>