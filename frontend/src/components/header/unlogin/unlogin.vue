<template>
    <div class="unlogin-wrapper">
        <login-btn></login-btn>
        <span class="split"></span>
        <register-btn></register-btn>
    </div>
</template>

<script>
    import loginBtn from './loginBtn.vue'
    import registerBtn from './registerBtn.vue'
    export default {
        components: {
            loginBtn, registerBtn
        }
    }
</script>

<style lang="sass" type="text/scss">
    .unlogin-wrapper {
        padding-top: 12px;
        span {
            display: inline-block;
            vertical-align: middle;
            a {
                text-decoration: none;
                color: #bfcbd9;
                font-size: 14px;
            }
        }
        .split {
            margin: 0 20px;
            width: 1px;
            height: 20px;
            background-color: #bfcbd9
        }
    }
</style>