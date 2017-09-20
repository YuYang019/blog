<template>
    <div id="app">
        <div class="header-wrapper">
            <Navbar></Navbar>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Navbar from './components/header/index.vue'
    import { mapState,mapActions } from 'vuex'

    export default {
        components: {
            Navbar
        },
        computed: {
            ...mapState({
                // 相当于获取 this.$store.state.showmsg.message
                // 相比 state => state.showmsg 获取的深了一层
                // 目的在于可以直接 watch
                msg: ({showmsg}) => showmsg.message
            })
        },
        watch: {
            msg: {
                handler: function(val, oldVal) {
                    console.log('show')
                    this.$message({
                        message: val.content,
                        type: val.type,
                        duration: 1500
                    });
                },
                // 深度watch
                deep: true
            }
        },
//        methods: {
//            ...mapActions([
//                'showMsg'
//            ])
//        },
    }
</script>

<style lang="sass" type="text/scss">
    body {
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        background: #F2F2F2;
    }
    /*.header-wrapper {*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*z-index: 9998;*/
    /*}*/
    .content {
        margin-top: 25px;
    }
</style>
