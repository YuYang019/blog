<template>
    <div class="header clearfix">
        <ul class="left-nav">
            <li>
                <router-link to="/">首页</router-link>
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
    import logined from './logined/logined.vue'
    import unlogin from './unlogin/unlogin.vue'
    import { mapState,mapActions } from 'vuex'

    export default {
        computed: {
            ...mapState({
                // 相当于 auth: this.$store.state.auth
                // 获取vuex，auth模块的state
               auth: state => state.auth
            })
        },
        created() {
            //console.log(this.auth)
            //console.log(this.$store.state)
            // auth模块的state包括token和user
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
            logined, unlogin
        }
    }
</script>

<style lang="sass" type="text/scss">
    .clearfix::after {
        content: ' ';
        display: table;
        clear: both;
    }

    .header {
        background-color: #324157;
        padding: 0 50px;
        .router-link-active {
            color: #58B7FF
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
                    color: #58B7FF;
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