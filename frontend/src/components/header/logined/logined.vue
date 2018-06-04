<template>
    <div class="logined-wrapper">
        <span class="name">Hi，{{auth.user.username}}</span>
        <span class="split"></span>
        <options-btn></options-btn>
        <publish-btn></publish-btn>
    </div>
</template>

<script>
    import optionsBtn from './optionsBtn.vue'
    import publishBtn from './publishBtn.vue'
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
                auth: state => state.user
            })
        },
        components: {
            optionsBtn, publishBtn
        }
    }
</script>

<style lang="sass" type="text/scss">
    .logined-wrapper {
        padding-top: 12px;
        &>span {
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