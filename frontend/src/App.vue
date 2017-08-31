<template>
    <div id="app">
        <div class="header-wrapper">
            <topNav></topNav>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import topNav from './components/header/header.vue'
    import { mapState,mapActions } from 'vuex'

    export default {
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
        components: {
            topNav
        }
    }
</script>

<style lang="sass" type="text/scss">
    body {
        font-family: Helvetica, sans-serif;
        background: #EFF2F7;
    }
</style>
