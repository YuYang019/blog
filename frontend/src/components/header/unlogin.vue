<template>
    <div class="wrapper">
        <login-btn></login-btn>
        <span class="split"></span>
        <register-btn></register-btn>
    </div>
</template>

<script>
    import loginBtn from './unlogin/loginBtn.vue'
    import registerBtn from './unlogin/registerBtn.vue'
    export default {
        components: {
            loginBtn, registerBtn
        }
    }
</script>

<style lang="sass" type="text/scss">
    .wrapper {
        padding-top: 15px;
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