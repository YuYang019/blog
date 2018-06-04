<template>
    <div class="home">
        <el-row>
            <!--<el-col :span="6">-->
                <!--<Sidebar></Sidebar>-->
            <!--</el-col>-->
            <el-col :span="14" :offset="5">
                <Articles :articleList="articleList"></Articles>
                <Pagination :total="total" size="10" @getList="handleList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Articles from './articles.vue'
import Pagination from './pagination.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Articles, Pagination
  },
  computed: {
    ...mapState({
      options: ({ options }) => options.item,
      isFetching: ({ articleList }) => articleList.isFetching,
      articleList: ({ articleList }) => articleList.items,
      total: ({ articleList }) => articleList.total
    })
  },
  created() {
    console.log('created')
    console.log(this.$route.params.pid)
    this.handleList({ currentPage: this.$route.params.pid })
  },
  methods: {
    ...mapActions([
      'getArticleList',
      'changeOptions'
    ]),
    // options: { currentPage: .. }
    handleList(options) {
      // 将options混入初始options中
      this.changeOptions(options)
      this.getArticleList({ options: this.options })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  .detail-wrapper {
    margin-bottom: 30px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>