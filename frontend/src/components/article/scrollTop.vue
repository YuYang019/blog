<template>
    <transition name="move">
        <div class="scrollTop" :class="isShow ? 'hover' : ''" @click="goTop" v-show="isShow">
            <i class="el-icon-caret-top"></i>
        </div>
    </transition>

</template>

<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        mounted() {
            // 函数防抖，等到停止滚动才触发
            this.handleScroll = this.throttle(this.handleScroll, 200)
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            throttle(fn, delay) {
                let timer
                return function(...args) {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        fn.call(this, args)
                    }, delay)
                }
            },
            handleScroll() {
                if (window.scrollY > 200) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            goTop() {
                window.scrollTo(0, 0)
                this.isShow = false
            }
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .scrollTop {
        position: fixed;
        right: 100px;
        bottom: 150px;
        transition: 0.3s;
        opacity: 0.4;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        font-size: 22px;
        background: #20a0ff;
        color: #fff;
        cursor: pointer;

        &.move-enter, &.move-leave-to {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
        }
        &.move-enter-active, &.move-leave-active {
            transition: all .3s
        }
        &.move-enter-to, &.move-leave {
            transform: translate3d(0, 0, 0);
        }
    }

    .hover {
        &:hover {
            opacity: 1;
        }
    }
</style>