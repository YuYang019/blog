<template>
    <div class="pagination">
        <span class="pre" @click="goPre" :class="currentPage > 1 ? '' : 'disabled'">上一页</span>
        <ul>
            <li><a href="javascript:;" v-show="currentPage > 3 && num > 5" @click="pre">...</a></li>
            <li v-for="index in items">
                <router-link :to="{ name: 'page', params: { pid: index } }">{{ index }}</router-link>
            </li>
            <li><a href="javascript:;" v-show="currentPage < num - 2 && num > 5" @click="next">...</a></li>
        </ul>
        <span class="next" @click="goNext" :class="currentPage < num ? '' : 'disabled'">下一页</span>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        props: ['total', 'size'],
        data() {
            return {
                currentPage: '',
                items: []
            }
        },
        created() {
            this.currentPage = Number(this.$route.params.pid)
            this.updateItems()
        },
        computed: {
            num: function () {
                return Math.ceil(this.total / this.size)
            }
        },
        watch: {
            '$route': function() {
                // 坑爹，pid获取的是字符串， '2' + 2 这样，结果是22，坑
                this.currentPage = Number(this.$route.params.pid)

                // 触发父级方法 ＝》total改变 ＝》num改变 ＝》触发watch ＝》 更新items
                this.$emit('getList', { currentPage: this.currentPage })
            },
            'num': function() {
                this.updateItems()
            }
        },
        methods: {
            // ...回退5个
            pre() {
                let pid = Number(this.$route.params.pid)
                let curpid = pid - 5
                if (curpid < 1) curpid = 1
                this.$router.push({ name: 'page', params: { pid: curpid } })
            },
            // ...前进5个
            next() {
                let pid = Number(this.$route.params.pid)
                let curpid = pid + 5
                if (curpid > this.num) curpid = this.num
                this.$router.push({ name: 'page', params: { pid: curpid } })
            },
            goPre() {
                let pid = Number(this.$route.params.pid)
                //console.log(pid)
                if (pid <= 1) return
                this.$router.push({ name: 'page', params: { pid: --pid } })
                //this.currentPage = --pid
                //console.log(this.currentPage)
            },
            goNext() {
                let pid = Number(this.$route.params.pid)
                //console.log(pid)
                if (pid >= this.num) return
                this.$router.push({ name: 'page', params: { pid: ++pid } })
                //this.currentPage = ++pid
            },
            updateItems() {
                let cur = this.currentPage
                let num = this.num

                // 小小的优化，当到达前两个或者最后两个时，不需要再改变items了
//                if (this.items.length) {
//                    if (num < 5) return
//                    if (num > 5 && (cur < 3 || cur > num - 2)) return
//                }


                // 生成从1到n的数组
                let array = Array(num).fill('native').map((v, i) => i + 1)

                // 页数大于5
                if (num > 5) {
                    if (cur + 2 >= num) {
                        // 当前页数达到最后5个时
                        this.items = [num - 4, num - 3, num - 2, num - 1, num]
                    } else if (cur - 2 <= 1) {
                        // 当前页数达到前5个时
                        this.items = [1, 2, 3, 4, 5]
                    } else {
                        // 既不在前五个，又不在后5个，则取当前页数的前2个和后2个，组成一个数组
                        this.items = array.slice(cur - 3, cur + 2)
                    }
                } else {
                    // 小于5时
                    this.items = array
                }
            }
        }
    }
</script>

<style  lang="sass" type="text/scss" scoped>
    .pagination {
        display: flex;
        justify-content: space-between;
        user-select: none;
        background: #fff;
        box-shadow: 0 0 2px lightgrey;
        border: 1px solid lightgray;
        ul {
            display: flex;
            margin: 0;
            padding: 0;
            li {
                list-style: none;
                cursor: pointer;
                a {
                    display: block;
                    padding: 15px;
                    color: #555;
                    text-decoration: none;
                    &:hover {
                        background: #e1e1e1;
                    }
                }
                .router-link-active {
                    color: red;
                }
            }
            /*.active {*/
                /*a {*/
                    /*color: red;*/
                /*}*/

            /*}*/
        }
        span {
            padding: 15px;
            color: #555;
            cursor: pointer;
            &:hover {
                background: #e1e1e1;
            }
            &.disabled {
                color: #e4e4e4;
                background: #fff;
                cursor: not-allowed;
            }
        }
    }
</style>