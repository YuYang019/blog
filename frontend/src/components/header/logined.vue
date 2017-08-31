<template>
    <div class="wrapper">
        <span class="name">{{auth.user.nickname}}</span>
        <span class="split"></span>
        <options-btn></options-btn>
        <publish-btn></publish-btn>
    </div>
</template>

<script>
    import optionsBtn from './logined/optionsBtn.vue'
    import publishBtn from './logined/publishBtn.vue'
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
                auth: state => state.auth
            })
        },
        components: {
            optionsBtn, publishBtn
        }
    }
</script>

<style lang="sass" type="text/scss" scoped>
    .wrapper {
        padding-top: 12px;
        span {
            display: inline-block;
            vertical-align: middle;
            color: #bfcbd9;
            font-size: 14px;
            user-select: none;
        }
        .split {
            margin: 0 20px;
            width: 1px;
            height: 20px;
            background-color: #bfcbd9
        }
    }
</style>